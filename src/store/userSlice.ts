import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { User } from "../types/types";

interface UserState {
  users: User[];
  user: User | null;
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
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
  getUsersStart,
  getUsersSuccess,
  setSuccess,
  getUserSuccess,
  getFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
