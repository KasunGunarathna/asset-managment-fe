import instance from "../interceptors/axiosInterceptor";

export const getUserByNIC = async (nic: string | null) => {
  try {
    const response = await instance.get(`/users/nic/${nic}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await instance.get(`/users`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: any) => {
  try {
    const response = await instance.get(`/users/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const insertUser = async (userData: any) => {
  try {
    const response = await instance.post(`/users`, userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};



export const updateUser = async (id:any,userData: any) => {
  try {
    const response = await instance.patch(`/users/${id}`, userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};