import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AuthData, User, UserCredentials } from "../types/types";

interface AuthState {
  login: UserCredentials | null;
  logUser: User | null;
  authData: AuthData | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  login: null,
  logUser: null,
  authData: null,
  isAuthenticated:
    localStorage.getItem("isAuthenticated")?.toLowerCase?.() === "true" ||
    false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAuthStart(state) {
      state.loading = true;
      state.error = null;
    },
    getLogUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.logUser = action.payload;
    },
    getFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getLoginSuccess: (state, action: PayloadAction<AuthData>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.authData = action.payload;
    },
    clearToken: (state) => {
      state.isAuthenticated = false;
      state.authData = null;
    },
  },
});

export const {
  getAuthStart,
  clearToken,
  getLogUserSuccess,
  getFailure,
  getLoginSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
