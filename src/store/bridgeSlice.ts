import { Bridge } from "./../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {
  deleteBridgesById,
  getBridges,
  getBridgesById,
  getSearchBridges,
  insertBridges,
  updateBridges,
} from "../api/bridgeApis";

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

export const fetchBridges = () => async (dispatch: AppDispatch) => {
  dispatch(getBridgesStart());
  try {
    const res = await getBridges();
    dispatch(getBridgesSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchBridges =
  (query: any) => async (dispatch: AppDispatch) => {
    dispatch(getBridgesStart());
    try {
      const res = await getSearchBridges(query);
      dispatch(getBridgesSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchBridgeById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getBridgesStart());
  try {
    const res = await getBridgesById(id);
    dispatch(getBridgeSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addBridge =
  (bridge: Bridge | null) => async (dispatch: AppDispatch) => {
    dispatch(getBridgesStart());
    try {
      await insertBridges(bridge);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const editBridge =
  (id: any, bridge: Bridge | null) => async (dispatch: AppDispatch) => {
    dispatch(getBridgesStart());
    try {
      await updateBridges(id, bridge);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeBridgeById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getBridgesStart());
  try {
    await deleteBridgesById(id);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export default bridgeSlice.reducer;

export const selectBridge = (state: RootState) => state.bridge;
