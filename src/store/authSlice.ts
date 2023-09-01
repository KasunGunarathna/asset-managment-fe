import {
  createSlice,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  nic: string | null;
  tokenExpiry: number | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated:
    localStorage.getItem("isAuthenticated")?.toLowerCase?.() === "true" ||
    false,
  nic: null,
  tokenExpiry: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ token: string; expiresIn: number }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.tokenExpiry = Date.now() / 1000 + action.payload.expiresIn;
    },
    setNic: (state, action) => {
      state.nic = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.tokenExpiry = null;
    },
  },
});

export const { setToken, clearToken, setNic } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
