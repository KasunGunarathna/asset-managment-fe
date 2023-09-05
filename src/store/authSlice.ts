import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { getUserByNIC } from "../api/userApis";
import { AuthData, User, UserCredentials } from "../types/types";
import { login } from "../api/authApis";
import { setTokenToLocalStorage } from "../utils/utils";

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

export const fetchLoginUser =
  (nic: string | null) => async (dispatch: AppDispatch) => {
    dispatch(getAuthStart());
    try {
      const response = await getUserByNIC(nic);
      dispatch(getLogUserSuccess(response));
    } catch (error: any) {
      dispatch(
        getFailure(error.response?.data?.message || error.message)
      );
      dispatch(clearToken());
    }
  };

export const userLogin =
  (loginDetails: UserCredentials) => async (dispatch: AppDispatch) => {
    dispatch(getAuthStart());
    try {
      const response = await login(loginDetails);
      dispatch(
        getLoginSuccess({
          access_token: response.access_token,
          expires_in: Date.now() / 1000 + response.expires_in,
        })
      );
      sessionStorage.setItem("userNic", loginDetails.nic);
      setTokenToLocalStorage(response.access_token);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
      dispatch(clearToken());
    }
  };
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
