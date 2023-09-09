import { Road } from "../types/types"; // Import your Road type
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {
  deleteRoadsById,
  getRoads,
  getRoadsById,
  getSearchRoads,
  insertRoads,
  updateRoads,
} from "../api/roadApis"; // Adjust the import path for road APIs

interface RoadState {
  roads: Road[]; // Replace Bridge with Road
  road: Road | null; // Replace Bridge with Road
  loading: boolean;
  error: string | null;
}

const initialState: RoadState = {
  roads: [],
  road: null,
  loading: false,
  error: null,
};

const roadSlice = createSlice({
  name: "road", // Change the slice name
  initialState,
  reducers: {
    getRoadsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRoadsSuccess(state, action: PayloadAction<Road[]>) { // Replace Bridge with Road
      state.loading = false;
      state.roads = action.payload; // Replace Bridge with Road
    },
    getRoadSuccess(state, action: PayloadAction<Road>) { // Replace Bridge with Road
      state.loading = false;
      state.road = action.payload; // Replace Bridge with Road
    },
    getFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSuccess(state) {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getRoadsStart,
  getRoadsSuccess,
  getRoadSuccess,
  setSuccess,
  getFailure,
} = roadSlice.actions;

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

export const addRoad =
  (road: Road | null) => async (dispatch: AppDispatch) => {
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

export default roadSlice.reducer;

export const selectRoad = (state: RootState) => state.road;
