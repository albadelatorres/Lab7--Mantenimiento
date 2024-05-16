import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 5700}, // subimos 40% de carga (40% de 14331 vus max) en 1 minuto
        { duration: '1m', target: 0 },     // bajamos muy rápido a 0 en 1 minuto
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<=0.005', // abortamos si las peticiones fallidas son superiores al 0.5%
            abortOnFail: true,
        }],
    },
};

export default function () {
    const res = http.get('http://localhost:8080/medico/1');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
