import instance from "../interceptors/axiosInterceptor";

export const getBridges = async () => {
  try {
    const response = await instance.get(`/bridges`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchBridges = async (query: any) => {
  try {
    const response = await instance.get(`/bridges/query/${query}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getBridgesById = async (id: any) => {
  try {
    const response = await instance.get(`/bridges/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const insertBridges = async (bridgesData: any) => {
  try {
    const response = await instance.post(`/bridges`, bridgesData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateBridges = async (id: any, bridgesData: any) => {
  try {
    const response = await instance.patch(`/bridges/${id}`, bridgesData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBridgesById = async (id: any) => {
  try {
    const response = await instance.delete(`/bridges/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
