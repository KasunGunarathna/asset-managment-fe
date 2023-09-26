import instance from "../interceptors/axiosInterceptor";

export const getBuildings = async () => {
  try {
    const response = await instance.get(`/buildings`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getBuildingById = async (id: any) => {
  try {
    const response = await instance.get(`/buildings/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchBuildings = async (data: any) => {
  try {
    const response = await instance.get(
      `/buildings/query?search=${data.search}&f1name=${data.f1name}&f1value=${data.f1value}&f2name=${data.f2name}&f2value=${data.f2value}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const insertBuilding = async (buildingData: any) => {
  try {
    console.log(buildingData)
    const response = await instance.post(`/buildings`, buildingData);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateBuilding = async (id: any, buildingData: any) => {
  try {
    const response = await instance.patch(`/buildings/${id}`, buildingData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBuildingById = async (id: any) => {
  try {
    const response = await instance.delete(`/buildings/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadBulkBuilding = async (data: any) => {
  try {
    const response = await instance.post(`/buildings/bulk-upload`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadBuilding = async (id: any, imageData: any) => {
  try {
    const response = await instance.post(
      `/buildings/upload_building_image/${id}`,
      imageData,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getBuilding = async (id: any) => {
  try {
    const response = await instance.get(`/buildings/building_image/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};