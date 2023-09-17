import { Drainage } from "../types/types"; // Import your Drainage type
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface DrainagesState {
  drainages: Drainage[]; // Replace Bridge with Drainage
  drainage: Drainage | null; // Replace Bridge with Drainage
  loading: boolean;
  error: string | null;
}

const initialState: DrainagesState = {
  drainages: [],
  drainage: null,
  loading: false,
  error: null,
};

const drainagesSlice = createSlice({
  name: "drainages", // Change the slice name
  initialState,
  reducers: {
    getDrainagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDrainagesSuccess(state, action: PayloadAction<Drainage[]>) {
      // Replace Bridge with Drainage
      state.loading = false;
      state.drainages = action.payload; // Replace Bridge with Drainage
    },
    getDrainageSuccess(state, action: PayloadAction<Drainage>) {
      // Replace Bridge with Drainage
      state.loading = false;
      state.drainage = action.payload; // Replace Bridge with Drainage
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
  getDrainagesStart,
  getDrainagesSuccess,
  getDrainageSuccess,
  setSuccess,
  getFailure,
} = drainagesSlice.actions;

export default drainagesSlice.reducer;

export const selectDrainages = (state: RootState) => state.drainages;
