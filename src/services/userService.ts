import {
  deleteUserById,
  getSearchUsers,
  getUserById,
  getUsers,
  insertUser,
  updateUser,
} from "../api/userApis";
import { AppDispatch } from "../store/store";
import {
  getFailure,
  getUserSuccess,
  getUsersStart,
  getUsersSuccess,
  setSuccess,
} from "../store/userSlice";
import { User } from "../types/types";

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
