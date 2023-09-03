import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { getUserByNIC } from "../api/userApis";

interface RowData {
  [key: string]: string | number;
}
interface AuthState {
  loginUser: object;
  token: string | null;
  isAuthenticated: boolean;
  nic: string | null;
  tokenExpiry: number | null;
}

const initialState: AuthState = {
  loginUser: {},
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
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
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

export const { setToken, clearToken, setNic, setLoginUser } = authSlice.actions;

export const fetchLoginUser = (nic:string|null) => async (dispatch: AppDispatch) => {
  try {
    const response = await getUserByNIC(nic); 
    dispatch(setLoginUser(response));
  } catch (error:any) {
    dispatch(clearToken());
  }
};
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
