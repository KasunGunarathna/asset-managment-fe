import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/utils'; // Replace with your own token retrieval method
const API_BASE_URL = 'http://localhost:3000';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    return Promise.reject(error);
  }
);

export default instance;
