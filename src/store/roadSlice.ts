import { Road } from "../types/types"; // Import your Road type
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

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
    getRoadsSuccess(state, action: PayloadAction<Road[]>) {
      // Replace Bridge with Road
      state.loading = false;
      state.roads = action.payload; // Replace Bridge with Road
    },
    getRoadSuccess(state, action: PayloadAction<Road>) {
      // Replace Bridge with Road
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

export default roadSlice.reducer;

export const selectRoad = (state: RootState) => state.road;
