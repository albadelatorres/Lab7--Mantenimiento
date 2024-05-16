import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    scenarios: {
        spike: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 1000,
            maxVUs: 1e7,
            stages: [
                { duration: '1m', target: 4000 }, // spike a 40% de carga
                { duration: '1m', target: 0 }, // bajamos muy rápido a 0
            ],
        }
    }
};

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    sleep(1);
};