import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '3m', target: 7150 }, // subimos al 50% VUs en 3 minutos
        { duration: '3m', target: 7150 }, // nos mantenemos en 50% VUs durante 3 minutos
        { duration: '2m', target: 0 },    // bajamos a 0 VUs en 2 minutos
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<=0.01', // el test se aborta si las peticiones fallidas son superiores al 1%
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

