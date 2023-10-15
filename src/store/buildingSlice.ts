import { Building } from "../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BuildingsState {
  buildings: Building[];
  building: Building | null;
  loading: boolean;
  photo: any;
  error: string | null;
}

const initialState: BuildingsState = {
  buildings: [],
  building: null,
  loading: false,
  photo: null,
  error: null,
};

const buildingsSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    getBuildingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getBuildingsSuccess(state, action: PayloadAction<Building[]>) {
      state.loading = false;
      state.buildings = action.payload;
    },
    getBuildingSuccess(state, action: PayloadAction<Building>) {
      state.loading = false;
      state.building = action.payload;
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
  getBuildingsStart,
  getBuildingsSuccess,
  getBuildingSuccess,
  setSuccess,
  getFailure,
} = buildingsSlice.actions;

export default buildingsSlice.reducer;

export const selectBuildings = (state: RootState) => state.buildings;
