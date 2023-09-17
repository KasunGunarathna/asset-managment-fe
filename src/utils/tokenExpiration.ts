import { clearToken } from "../store/authSlice";
import { AppDispatch } from "../store/store";
let timeoutId: NodeJS.Timeout | null = null;

export const setTokenExpiration = (
  tokenExpiry: number,
  dispatch: AppDispatch,
) => {
  clearTimeout(timeoutId!);

  //const currentTime = Date.now();
  const timeUntilExpiration = tokenExpiry;
  timeoutId = setTimeout(() => {
    dispatch(clearToken());
  }, timeUntilExpiration);
};
