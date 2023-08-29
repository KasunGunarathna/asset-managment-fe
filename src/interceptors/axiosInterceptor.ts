import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/utils'; // Replace with your own token retrieval method

axios.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage(); // Retrieve token from local storage or Redux state
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    return Promise.reject(error);
  }
);
