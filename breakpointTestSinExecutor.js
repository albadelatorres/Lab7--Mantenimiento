import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '10m', target: 100000 }, // Incrementa la carga hasta 100,000 VUs en 10 minutos
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<=0.01',
            abortOnFail: true,
        }]
    }
};

export default function () {
    let response = http.get('http://localhost:8080/medico/1');

    check(response, {
        'Response code was 200': (res) => res.status == 200
    });
}
