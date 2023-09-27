import {
  deleteDrainagesById,
  getDrainages,
  getDrainagesById,
  getSearchDrainages,
  insertDrainages,
  updateDrainages,
  uploadBulkDrainage,
} from "../api/drainagesApis";
import {
  getDrainageSuccess,
  getDrainagesStart,
  getDrainagesSuccess,
  getFailure,
  setSuccess,
} from "../store/drainageSlice";
import { AppDispatch } from "../store/store";
import { DrainageType, SurfaceCondition } from "../types/enum";
import { Drainage } from "../types/types";

export const fetchDrainages = () => async (dispatch: AppDispatch) => {
  dispatch(getDrainagesStart());
  try {
    const res = await getDrainages();
    dispatch(getDrainagesSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchDrainages =
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getDrainagesStart());
    try {
      const res = await getSearchDrainages(data);
      dispatch(getDrainagesSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchDrainageById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getDrainagesStart());
  try {
    const res = await getDrainagesById(id);
    dispatch(getDrainageSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addDrainage =
  (drainage: Drainage | null) => async (dispatch: AppDispatch) => {
    dispatch(getDrainagesStart());
    try {
      await insertDrainages(drainage);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const editDrainage =
  (id: any, drainage: Drainage | null) => async (dispatch: AppDispatch) => {
    dispatch(getDrainagesStart());
    try {
      await updateDrainages(id, drainage);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeDrainageById =
  (id: any) => async (dispatch: AppDispatch) => {
    dispatch(getDrainagesStart());
    try {
      await deleteDrainagesById(id);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const bulkUploadDrainage =
  (data: any) => async (dispatch: AppDispatch) => {
    dispatch(getDrainagesStart());
    try {
      await uploadBulkDrainage(data);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
      throw error;
    }
  };

export const drainageSummery = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getDrainages();
    const total = res.length;
    const drainageTypeCounts = Object.values(DrainageType).reduce(
      (counts: any, condition: any) => {
        const count = res.filter(
          (data: any) => data.drainage_type === condition,
        ).length;
        counts[condition] = count;
        return counts;
      },
      {},
    );
    const conditionCounts = Object.values(SurfaceCondition).reduce(
      (counts: any, condition: any) => {
        const count = res.filter(
          (data: any) => data.condition === condition,
        ).length;
        counts[condition] = count;
        return counts;
      },
      {},
    );

    return {
      total: total,
      drainageTypeCounts: drainageTypeCounts,
      conditionCounts: conditionCounts,
    };
  } catch (error: any) {
    throw error;
  }
};
