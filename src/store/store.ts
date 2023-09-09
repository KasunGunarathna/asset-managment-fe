import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import bridgeReducer from "./bridgeSlice";
import roadReducer from "./roadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    bridge:bridgeReducer,
    road:roadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
