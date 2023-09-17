import { Drainage } from "../types/types"; // Import your Drainage type
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {
  deleteDrainagesById,
  getDrainages,
  getDrainagesById,
  getSearchDrainages,
  insertDrainages,
  updateDrainages,
} from "../api/drainagesApis"; // Adjust the import path for drainage APIs

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

export default drainagesSlice.reducer;

export const selectDrainages = (state: RootState) => state.drainages;
