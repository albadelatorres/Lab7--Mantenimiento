import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    vus: 5,
    duration: '1m',
};
export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    sleep(1);
};