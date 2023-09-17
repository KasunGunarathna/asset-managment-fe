import instance from "../interceptors/axiosInterceptor";
import { UserCredentials } from "../types/types";

export const login = async (credentials: UserCredentials) => {
  try {
    const response = await instance.post("/auth/login", credentials);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
