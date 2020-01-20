import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.106:3333' 
    // porta 3333 é a ultilizada para rodar o backend da aplicação
})

export default api;