import { Drainage } from "../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface DrainagesState {
  drainages: Drainage[];
  drainage: Drainage | null;
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
  name: "drainages",
  initialState,
  reducers: {
    getDrainagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDrainagesSuccess(state, action: PayloadAction<Drainage[]>) {
      state.loading = false;
      state.drainages = action.payload;
    },
    getDrainageSuccess(state, action: PayloadAction<Drainage>) {
      state.loading = false;
      state.drainage = action.payload;
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
