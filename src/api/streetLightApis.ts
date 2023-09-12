import instance from "../interceptors/axiosInterceptor";

export const getStreetLights = async () => {
  try {
    const response = await instance.get(`/street_lights`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchStreetLights = async (query: any) => {
  try {
    const response = await instance.get(`/street_lights/query/${query}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getStreetLightsById = async (id: any) => {
  try {
    const response = await instance.get(`/street_lights/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const insertStreetLights = async (streetLightsData: any) => {
  try {
    const response = await instance.post(`/street_lights`, streetLightsData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateStreetLights = async (id: any, streetLightsData: any) => {
  try {
    const response = await instance.patch(`/street_lights/${id}`, streetLightsData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStreetLightsById = async (id: any) => {
  try {
    const response = await instance.delete(`/street_lights/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
