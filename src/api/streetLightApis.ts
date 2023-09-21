import instance from "../interceptors/axiosInterceptor";

export const getStreetLights = async () => {
  try {
    const response = await instance.get(`/street_lights`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchStreetLights = async (data: any) => {
  try {
    console.log(data);
    const response = await instance.get(
      `/street_lights/query?search=${data.search}&f1name=${data.f1name}&f1value=${data.f1value}&f2name=${data.f2name}&f2value=${data.f2value}`
    );
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
    const response = await instance.patch(
      `/street_lights/${id}`,
      streetLightsData,
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getStreetLight = async (id: any) => {
  try {
    const response = await instance.get(`/street_lights/light_image/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadStreetLight = async (id: any, imageData: any) => {
  try {
    const response = await instance.post(
      `/street_lights/upload_light_image/${id}`,
      imageData,
    );
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

export const uploadBulkStreetLight = async (data: any) => {
  try {
    const response = await instance.post(`/street_lights/bulk-upload`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
