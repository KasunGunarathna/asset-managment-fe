import { StreetLight } from "../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface StreetLightsState {
  streetLights: StreetLight[];
  streetLight: StreetLight | null;
  photo: any;
  loading: boolean;
  error: string | null;
}

const initialState: StreetLightsState = {
  streetLights: [],
  streetLight: null,
  photo: null,
  loading: false,
  error: null,
};

const streetLightsSlice = createSlice({
  name: "streetLights",
  initialState,
  reducers: {
    getStreetLightsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getStreetLightsSuccess(state, action: PayloadAction<StreetLight[]>) {
      state.loading = false;
      state.streetLights = action.payload;
    },
    getStreetLightSuccess(state, action: PayloadAction<StreetLight>) {
      state.loading = false;
      state.streetLight = action.payload;
    },
    getFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    setImageSuccess(state, action: PayloadAction<any>) {
      state.photo = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getStreetLightsStart,
  getStreetLightsSuccess,
  getStreetLightSuccess,
  setImageSuccess,
  setSuccess,
  getFailure,
} = streetLightsSlice.actions;

export default streetLightsSlice.reducer;

export const selectStreetLights = (state: RootState) => state.streetLights;
