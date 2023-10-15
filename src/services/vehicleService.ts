import {
  deleteVehicleById,
  getVehicles,
  getVehicleById,
  getSearchVehicles,
  insertVehicle,
  updateVehicle,
  uploadBulkVehicle,
} from "../api/vehicleApis"; // Import vehicle-related functions

import {
  getVehicleSuccess,
  getVehiclesStart,
  getVehiclesSuccess,
  setSuccess,
  getFailure,
} from "../store/vehicleSlice"; // Import vehicle-related action creators

import { AppDispatch } from "../store/store";
import { Vehicle } from "../types/types"; // Replace with your vehicle type definition

export const fetchVehicles = () => async (dispatch: AppDispatch) => {
  dispatch(getVehiclesStart());
  try {
    const res = await getVehicles();
    dispatch(getVehiclesSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchVehicles =
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getVehiclesStart());
    try {
      const res = await getSearchVehicles(data);
      dispatch(getVehiclesSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchVehicleById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getVehiclesStart());
  try {
    const res = await getVehicleById(id);
    dispatch(getVehicleSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addVehicle =
  (vehicle: Vehicle | null) => async (dispatch: AppDispatch) => {
    dispatch(getVehiclesStart());
    try {
      await insertVehicle(vehicle);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const editVehicle =
  (id: any, vehicle: Vehicle | null) => async (dispatch: AppDispatch) => {
    dispatch(getVehiclesStart());
    try {
      await updateVehicle(id, vehicle);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeVehicleById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getVehiclesStart());
  try {
    await deleteVehicleById(id);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const bulkUploadVehicle =
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getVehiclesStart());
    try {
      await uploadBulkVehicle(data);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
      throw error;
    }
  };
