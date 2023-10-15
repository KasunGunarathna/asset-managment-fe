import { Vehicle } from "../types/types"; // Import the Vehicle type
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface VehicleState {
  vehicles: Vehicle[];
  vehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  vehicle: null,
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    getVehiclesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getVehiclesSuccess(state, action: PayloadAction<Vehicle[]>) {
      state.loading = false;
      state.vehicles = action.payload;
    },
    getVehicleSuccess(state, action: PayloadAction<Vehicle>) {
      state.loading = false;
      state.vehicle = action.payload;
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
  getVehiclesStart,
  getVehiclesSuccess,
  getVehicleSuccess,
  setSuccess,
  getFailure,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;

export const selectVehicle = (state: RootState) => state.vehicle;
