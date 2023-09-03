import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { getUserByNIC, getUsers } from "../api/userApis";

interface User {
  id: number;
  name: string;
  user_type: string;
  nic: string;
  password: string;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
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
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure } =
  userSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    const response = await getUsers(); 
    dispatch(getUsersSuccess(response));
  } catch (error:any) {
    dispatch(getUsersFailure(error.message));
  }
};
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
