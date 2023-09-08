import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import bridgeReducer from "./bridgeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    bridge:bridgeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
