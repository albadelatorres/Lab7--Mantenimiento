import http from 'k6/http';
import { check, fail } from 'k6';

export const options = {
    stages: [
        { duration: '3m', target: 1500 }, // subimos a una carga promedio de 1500 VUs en 3 minutos
        { duration: '3m', target: 1500 }, // nos mantenemos en 1500 VUs por 3 minutos
        { duration: '2m', target: 0 },    // bajamos a 0 VUs en 2 minutos
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // definimos el umbral de fallos en 1%
    },
};

export default function () {
    const res = http.get('http://localhost:8080/medico/1');
    check(res, { // comprobamos que el estado de la respuesta es 200
        'status is 200': (r) => r.status === 200,
    });
    if (res.status !== 200) {
        fail(`Fallo: ${res.status}`);
    }
}
