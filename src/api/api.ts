import { useState } from 'react'; // Import useState from React
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Create a custom hook for login
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null); // Specify the type for the error state

  const login = async (credentials: { nic: string; password: string }) => {
    setLoading(true);
    setError(null); // Clear the error before making the API call
    try {
      const response = await instance.post('/auth/login', credentials);
      console.log(response)
      const token = response.data.data.access_token;
      console.log(token)
      // Handle token or dispatch it to Redux
    } catch (error) {
      setError(error as Error); // Cast the error to the Error type
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};


export const fetchUserDetails = async (nic: string, token: string) => {
  try {
    const response = await instance.get(`/users/nic/${nic}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};