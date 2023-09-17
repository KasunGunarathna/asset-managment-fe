import { Bridge } from "./../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  bridges: Bridge[];
  bridge: Bridge | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  bridges: [],
  bridge: null,
  loading: false,
  error: null,
};

const bridgeSlice = createSlice({
  name: "bridge",
  initialState,
  reducers: {
    getBridgesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getBridgesSuccess(state, action: PayloadAction<Bridge[]>) {
      state.loading = false;
      state.bridges = action.payload;
    },
    getBridgeSuccess(state, action: PayloadAction<Bridge>) {
      state.loading = false;
      state.bridge = action.payload;
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
  getBridgesStart,
  getBridgesSuccess,
  getBridgeSuccess,
  setSuccess,
  getFailure,
} = bridgeSlice.actions;

export default bridgeSlice.reducer;


export const selectBridge = (state: RootState) => state.bridge;
