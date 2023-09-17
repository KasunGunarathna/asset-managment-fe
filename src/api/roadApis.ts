import instance from "../interceptors/axiosInterceptor";

export const getRoads = async () => {
  try {
    const response = await instance.get(`/roads`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchRoads = async (query: any) => {
  try {
    const response = await instance.get(`/roads/query/${query}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getRoadsById = async (id: any) => {
  try {
    const response = await instance.get(`/roads/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const insertRoads = async (roadsData: any) => {
  try {
    const response = await instance.post(`/roads`, roadsData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoads = async (id: any, roadsData: any) => {
  try {
    const response = await instance.patch(`/roads/${id}`, roadsData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoadsById = async (id: any) => {
  try {
    const response = await instance.delete(`/roads/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadBulkRoad = async (data: any) => {
  try {
    const response = await instance.post(`/roads/bulk-upload`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
