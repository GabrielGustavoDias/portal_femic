import axios from 'axios';
// https://femic-dev.herokuapp.com
// https://apiportal.femic.com.br
// http://localhost:3333
// https://3333-ryannnkl-portalfemic-8tern59u3kd.ws-us98.gitpod.io

export const baseUrl = 'https://apiportal.femic.com.br';

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
