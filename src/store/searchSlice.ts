import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery:"",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    cleanSearchQuery: (state) => {
      state.searchQuery="";
    },
  },
});

export const { setSearchQuery, cleanSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
