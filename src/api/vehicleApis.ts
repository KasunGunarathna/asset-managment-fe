import instance from "../interceptors/axiosInterceptor";

export const getVehicles = async (): Promise<any[]> => {
  try {
    const response = await instance.get(`/vehicles`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getVehicleById = async (id: number): Promise<any> => {
  try {
    const response = await instance.get(`/vehicles/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const insertVehicle = async (vehicleData: any): Promise<any> => {
  try {
    const response = await instance.post(`/vehicles`, vehicleData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateVehicle = async (id: number, vehicleData: any): Promise<any> => {
  try {
    const response = await instance.patch(`/vehicles/${id}`, vehicleData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVehicleById = async (id: number): Promise<any> => {
  try {
    const response = await instance.delete(`/vehicles/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchVehicles = async (searchData: any): Promise<any[]> => {
  try {
    const response = await instance.get(
      `/vehicles/query?search=${searchData.search}&f1name=${searchData.f1name}&f1value=${searchData.f1value}&f2name=${searchData.f2name}&f2value=${searchData.f2value}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadBulkVehicle = async (data: any): Promise<any> => {
  try {
    const response = await instance.post(`/vehicles/bulk-upload`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
