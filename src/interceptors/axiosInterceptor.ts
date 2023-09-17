import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/utils";
import { useDispatch } from "react-redux";
import { clearToken } from "../store/authSlice";
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
      const dispatch = useDispatch();
      dispatch(clearToken());
    }
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    return Promise.reject(error);
  },
);

export default instance;
