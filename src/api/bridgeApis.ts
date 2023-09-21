import instance from "../interceptors/axiosInterceptor";

export const getBridges = async () => {
  try {
    const response = await instance.get(`/bridges`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchBridges = async (data: any) => {
  try {
    console.log(data);
    const response = await instance.get(
      `/bridges/query?search=${data.search}&f1name=${data.f1name}&f1value=${data.f1value}&f2name=${data.f2name}&f2value=${data.f2value}`
    );
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

export const uploadBulkBridge = async (data: any) => {
  try {
    const response = await instance.post(`/bridges/bulk-upload`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
