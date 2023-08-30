import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  RootState } from "./store";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  nic: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  nic: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setNic: (state, action) => {
      state.nic = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken ,setNic} = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
