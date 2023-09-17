import {
  deleteStreetLightsById,
  getSearchStreetLights,
  getStreetLight,
  getStreetLights,
  getStreetLightsById,
  insertStreetLights,
  updateStreetLights,
  uploadBulkStreetLight,
  uploadStreetLight,
} from "../api/streetLightApis";
import { AppDispatch } from "../store/store";
import {
  getFailure,
  getStreetLightSuccess,
  getStreetLightsStart,
  getStreetLightsSuccess,
  setImageSuccess,
  setSuccess,
} from "../store/streetLightSlice";
import { StreetLight } from "../types/types";

export const fetchStreetLights = () => async (dispatch: AppDispatch) => {
  dispatch(getStreetLightsStart());
  try {
    const res = await getStreetLights();
    dispatch(getStreetLightsSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchStreetLights =
  (query: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      const res = await getSearchStreetLights(query);
      dispatch(getStreetLightsSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchStreetLightById =
  (id: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      const res = await getStreetLightsById(id);
      dispatch(getStreetLightSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const addStreetLight =
  (streetLight: StreetLight | null) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      const res = await insertStreetLights(streetLight);
      dispatch(setSuccess());
      return res;
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const imageUploadStreetLight =
  (id: any, imageData: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      await uploadStreetLight(id, imageData);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const bulkUploadStreetLight =
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      await uploadBulkStreetLight(data);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const imageGetStreetLight =
  (id: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      const res = await getStreetLight(id);
      dispatch(setImageSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };
export const editStreetLight =
  (id: any, streetLight: StreetLight | null) =>
  async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      await updateStreetLights(id, streetLight);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeStreetLightById =
  (id: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      await deleteStreetLightsById(id);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };
