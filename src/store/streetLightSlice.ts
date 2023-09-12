import { StreetLight } from "../types/types"; // Import your StreetLight type
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {
  deleteStreetLightsById,
  getStreetLights,
  getStreetLightsById,
  getSearchStreetLights,
  insertStreetLights,
  updateStreetLights,
} from "../api/streetLightApis"; // Adjust the import path for street lights APIs

interface StreetLightsState {
  streetLights: StreetLight[]; // Replace Bridge with StreetLight
  streetLight: StreetLight | null; // Replace Bridge with StreetLight
  loading: boolean;
  error: string | null;
}

const initialState: StreetLightsState = {
  streetLights: [],
  streetLight: null,
  loading: false,
  error: null,
};

const streetLightsSlice = createSlice({
  name: "streetLights", // Change the slice name
  initialState,
  reducers: {
    getStreetLightsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getStreetLightsSuccess(state, action: PayloadAction<StreetLight[]>) { // Replace Bridge with StreetLight
      state.loading = false;
      state.streetLights = action.payload; // Replace Bridge with StreetLight
    },
    getStreetLightSuccess(state, action: PayloadAction<StreetLight>) { // Replace Bridge with StreetLight
      state.loading = false;
      state.streetLight = action.payload; // Replace Bridge with StreetLight
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
  getStreetLightsStart,
  getStreetLightsSuccess,
  getStreetLightSuccess,
  setSuccess,
  getFailure,
} = streetLightsSlice.actions;

export const fetchStreetLights = () => async (dispatch: AppDispatch) => {
  dispatch(getStreetLightsStart());
  try {
    const res = await getStreetLights();
    dispatch(getStreetLightsSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchStreetLights =
  (query: any) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      const res = await getSearchStreetLights(query);
      dispatch(getStreetLightsSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchStreetLightById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getStreetLightsStart());
  try {
    const res = await getStreetLightsById(id);
    dispatch(getStreetLightSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addStreetLight =
  (streetLight: StreetLight | null) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      await insertStreetLights(streetLight);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const editStreetLight =
  (id: any, streetLight: StreetLight | null) => async (dispatch: AppDispatch) => {
    dispatch(getStreetLightsStart());
    try {
      await updateStreetLights(id, streetLight);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeStreetLightById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getStreetLightsStart());
  try {
    await deleteStreetLightsById(id);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export default streetLightsSlice.reducer;

export const selectStreetLights = (state: RootState) => state.streetLights;
