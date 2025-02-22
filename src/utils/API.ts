import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aviasales-test-api.kata.academy',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

export default api;