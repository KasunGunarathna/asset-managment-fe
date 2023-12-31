import instance from "../interceptors/axiosInterceptor";

export const getRoads = async () => {
  try {
    const response = await instance.get(`/roads`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchRoads = async (data: any) => {
  try {
    const response = await instance.get(
      `/roads/query?search=${data.search}&f1name=${data.f1name}&f1value=${data.f1value}&f2name=${data.f2name}&f2value=${data.f2value}`,
    );
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

export const uploadRoad = async (id: any, imageData: any, photo: any) => {
  try {
    const response = await instance.post(
      `/roads/upload_road_image/${id}?photo=${photo}`,
      imageData,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
