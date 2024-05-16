import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '3m', target: 11440 }, // subimos a 80% VUs en 3 minutos
        { duration: '3m', target: 11440 }, // nos mantenemos en 80% VUs durante 3 minutos
        { duration: '2m', target: 0 },    // bajamos a 0 VUs en 2 minutos
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<=0.01', // abortamos si los http request fallan mas de un 1%
            abortOnFail: true,
        }],
        http_req_duration: [{
            threshold: 'p(95)<1000',  // abortamos si las peticiones http tienen una duración mayor a 1000ms
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
