import {
  deleteRoadsById,
  getRoads,
  getRoadsById,
  getSearchRoads,
  insertRoads,
  updateRoads,
} from "../api/roadApis";
import {
  getFailure,
  getRoadSuccess,
  getRoadsStart,
  getRoadsSuccess,
  setSuccess,
} from "../store/roadSlice";
import { AppDispatch } from "../store/store";
import { Road } from "../types/types";

export const fetchRoads = () => async (dispatch: AppDispatch) => {
  dispatch(getRoadsStart());
  try {
    const res = await getRoads();
    dispatch(getRoadsSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchRoads =
  (query: any) => async (dispatch: AppDispatch) => {
    dispatch(getRoadsStart());
    try {
      const res = await getSearchRoads(query);
      dispatch(getRoadsSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchRoadById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getRoadsStart());
  try {
    const res = await getRoadsById(id);
    dispatch(getRoadSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addRoad = (road: Road | null) => async (dispatch: AppDispatch) => {
  dispatch(getRoadsStart());
  try {
    await insertRoads(road);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const editRoad =
  (id: any, road: Road | null) => async (dispatch: AppDispatch) => {
    dispatch(getRoadsStart());
    try {
      await updateRoads(id, road);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeRoadById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getRoadsStart());
  try {
    await deleteRoadsById(id);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};
