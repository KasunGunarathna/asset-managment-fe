import {
  deleteBuildingById,
  getBuildings,
  getBuildingById,
  getSearchBuildings,
  insertBuilding,
  updateBuilding,
  uploadBulkBuilding,
  uploadBuilding,
  getBuilding,
} from "../api/buildingsApis";
import {
  getBuildingSuccess,
  getBuildingsStart,
  getBuildingsSuccess,
  getFailure,
  setSuccess,
} from "../store/buildingSlice";
import { AppDispatch } from "../store/store";
import { setImageSuccess } from "../store/streetLightSlice";
import { Building } from "../types/types";

export const fetchBuildings = () => async (dispatch: AppDispatch) => {
  dispatch(getBuildingsStart());
  try {
    const res = await getBuildings();
    dispatch(getBuildingsSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchBuildings =
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      const res = await getSearchBuildings(data);
      dispatch(getBuildingsSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchBuildingById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getBuildingsStart());
  try {
    const res = await getBuildingById(id);
    dispatch(getBuildingSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addBuilding =
  (building: Building | null) => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      const res = await insertBuilding(building);
      dispatch(setSuccess());
      return res;
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const editBuilding =
  (id: any, building: Building | null) => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      await updateBuilding(id, building);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeBuildingById =
  (id: any) => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      await deleteBuildingById(id);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const bulkUploadBuilding =
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      await uploadBulkBuilding(data);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
      throw error;
    }
  };

export const imageGetBuilding = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getBuildingsStart());
  try {
    const res = await getBuilding(id);
    dispatch(setImageSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const imageUploadBuilding =
  (id: any, imageData: any) => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      await uploadBuilding(id, imageData);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };
