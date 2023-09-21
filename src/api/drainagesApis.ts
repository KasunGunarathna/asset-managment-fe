import instance from "../interceptors/axiosInterceptor";

export const getDrainages = async () => {
  try {
    const response = await instance.get(`/drainages`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchDrainages = async (data: any) => {
  try {
    console.log(data);
    const response = await instance.get(
      `/drainages/query?search=${data.search}&f1name=${data.f1name}&f1value=${data.f1value}&f2name=${data.f2name}&f2value=${data.f2value}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDrainagesById = async (id: any) => {
  try {
    const response = await instance.get(`/drainages/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const insertDrainages = async (drainageData: any) => {
  try {
    const response = await instance.post(`/drainages`, drainageData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateDrainages = async (id: any, drainageData: any) => {
  try {
    const response = await instance.patch(`/drainages/${id}`, drainageData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDrainagesById = async (id: any) => {
  try {
    const response = await instance.delete(`/drainages/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadBulkDrainage = async (data: any) => {
  try {
    const response = await instance.post(`/drainages/bulk-upload`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
