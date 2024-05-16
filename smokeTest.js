import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    vus: 5, // Clave para la prueba de humo. Manténgalo en 2, 3, máximo 5 Vus
    duration: '1m', // Esto puede ser más corto o sólo unas pocas iteraciones
};
export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    sleep(1);
};