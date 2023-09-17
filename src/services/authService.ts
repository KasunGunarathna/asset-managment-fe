import { login } from "../api/authApis";
import { getUserByNIC } from "../api/userApis";
import {
  clearToken,
  getAuthStart,
  getFailure,
  getLogUserSuccess,
  getLoginSuccess,
} from "../store/authSlice";
import { AppDispatch } from "../store/store";
import { UserCredentials } from "../types/types";
import { setTokenToLocalStorage } from "../utils/utils";

export const fetchLoginUser =
  (nic: string | null) => async (dispatch: AppDispatch) => {
    dispatch(getAuthStart());
    try {
      const response = await getUserByNIC(nic);
      dispatch(getLogUserSuccess(response));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
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
        }),
      );
      sessionStorage.setItem("userNic", loginDetails.nic);
      setTokenToLocalStorage(response.access_token);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
      dispatch(clearToken());
    }
  };
