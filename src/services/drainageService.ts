import {
  deleteDrainagesById,
  getDrainages,
  getDrainagesById,
  getSearchDrainages,
  insertDrainages,
  updateDrainages,
} from "../api/drainagesApis";
import {
  getDrainageSuccess,
  getDrainagesStart,
  getDrainagesSuccess,
  getFailure,
  setSuccess,
} from "../store/drainageSlice";
import { AppDispatch } from "../store/store";
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
  (query: any) => async (dispatch: AppDispatch) => {
    dispatch(getDrainagesStart());
    try {
      const res = await getSearchDrainages(query);
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
