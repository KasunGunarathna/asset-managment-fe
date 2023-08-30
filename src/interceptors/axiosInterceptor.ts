import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/utils'; // Replace with your own token retrieval method

axios.interceptors.request.use((config) => {
  console.log("config")
  config.headers['Access-Control-Allow-Origin']='*'
  const token = getTokenFromLocalStorage(); // Retrieve token from local storage or Redux state
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(config)
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    return Promise.reject(error);
  }
);
