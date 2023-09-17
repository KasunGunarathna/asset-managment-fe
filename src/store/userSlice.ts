import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {
  deleteUserById,
  getSearchUsers,
  getUserById,
  getUsers,
  insertUser,
  updateUser,
} from "../api/userApis";
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

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await getUsers();
    dispatch(getUsersSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchUsers =
  (query: any) => async (dispatch: AppDispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await getSearchUsers(query);
      dispatch(getUsersSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchUserById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await getUserById(id);
    dispatch(getUserSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addUser = (user: User | null) => async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    await insertUser(user);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const editUser =
  (id: any, user: User | null) => async (dispatch: AppDispatch) => {
    dispatch(getUsersStart());
    try {
      await updateUser(id, user);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeUserById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    await deleteUserById(id);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
