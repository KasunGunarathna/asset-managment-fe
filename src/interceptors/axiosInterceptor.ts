import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/utils"; 
const API_BASE_URL = "http://localhost:3000";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle 401 error, for example, by logging out the user.
      // Dispatch an action to clear the user's authentication state.
      // You should replace 'logoutAction' with the actual action to clear the session.
      // Example: dispatch(logoutAction());
    }
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
