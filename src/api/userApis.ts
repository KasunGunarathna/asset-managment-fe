import instance from "../interceptors/axiosInterceptor";

export const getUserByNIC = async (nic: string | null) => {
    try {
      const response = await instance.get(`/users/nic/${nic}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getUsers= async () => {
    try {
      const response = await instance.get(`/users`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
  