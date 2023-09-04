import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { getUsers, insertUser } from "../api/userApis";
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
    getUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSuccess(state) {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure, setSuccess } =
  userSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await getUsers();
    dispatch(getUsersSuccess(res));
  } catch (error: any) {
    dispatch(getUsersFailure(error.response?.data?.message || error.message));
  }
};

export const addUser = (user: User | null) => async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    await insertUser(user);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getUsersFailure(error.response?.data?.message || error.message));
  }
};

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
