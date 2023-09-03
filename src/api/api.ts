import { useState } from "react"; // Import useState from React
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
import { setTokenToLocalStorage } from "../utils/utils";
import instance from "../interceptors/axiosInterceptor";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (credentials: { nic: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await instance.post("/auth/login", credentials);

      const token = response.data.data.access_token;
      const expiresIn = response.data.data.expires_in;

      dispatch(setToken({ token, expiresIn }));
      sessionStorage.setItem("userNic", credentials.nic);
      setTokenToLocalStorage(token);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      setError(error as Error); // Cast the error to the Error type
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export const fetchUserDetails = async (nic: string | null) => {
  try {
    const response = await instance.get(`/users/nic/${nic}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await instance.get(`/users`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
