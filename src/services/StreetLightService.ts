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
import { LampType, PoleType } from "../types/enum";
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
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      const res = await getSearchStreetLights(data);
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
      throw error;
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

export const streetLightSummery = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getStreetLights();
    const total = res.length;
    const poleTypeCounts = Object.values(PoleType).reduce(
      (counts: any, condition: any) => {
        const count = res.filter(
          (data: any) => data.pole_type === condition,
        ).length;
        counts[condition] = count;
        return counts;
      },
      {},
    );
    const lampTypeCounts = Object.values(LampType).reduce(
      (counts: any, condition: any) => {
        const count = res.filter(
          (data: any) => data.lamp_type === condition,
        ).length;
        counts[condition] = count;
        return counts;
      },
      {},
    );

    return {
      total: total,
      poleTypeCounts: poleTypeCounts,
      lampTypeCounts: lampTypeCounts,
    };
  } catch (error: any) {
    throw error;
  }
};
