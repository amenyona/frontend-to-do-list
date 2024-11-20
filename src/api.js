import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Nécessaire pour les cookies avec Breeze
});

export default API;
