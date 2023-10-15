import { Road } from "../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface RoadState {
  roads: Road[];
  road: Road | null;
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
  name: "road",
  initialState,
  reducers: {
    getRoadsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRoadsSuccess(state, action: PayloadAction<Road[]>) {
      state.loading = false;
      state.roads = action.payload;
    },
    getRoadSuccess(state, action: PayloadAction<Road>) {
      state.loading = false;
      state.road = action.payload;
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

export default roadSlice.reducer;

export const selectRoad = (state: RootState) => state.road;
