import { Building } from "../types/types"; // Import your Building type
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BuildingsState {
  buildings: Building[]; // Define your Building type
  building: Building | null; // Define your Building type
  loading: boolean;
  error: string | null;
}

const initialState: BuildingsState = {
  buildings: [],
  building: null,
  loading: false,
  error: null,
};

const buildingsSlice = createSlice({
  name: "buildings", // Define the slice name
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