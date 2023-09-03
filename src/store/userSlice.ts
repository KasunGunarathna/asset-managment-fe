import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface RowData {
  [key: string]: string | number;
}

interface UserState {
  userDetails: object;
  searchQuery: string | "";
  usersDetails: RowData[];
}

const initialState: UserState = {
  userDetails: {},
  searchQuery: "",
  usersDetails: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails= action.payload;
    },
    setUsers: (state, action) => {
      state.usersDetails= action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery= action.payload; 
    },
  },
});

export const { setUserDetails, setUsers, setSearchQuery } = userSlice.actions;

export default userSlice.reducer;

export const selectUser= (state: RootState) => state.user;
