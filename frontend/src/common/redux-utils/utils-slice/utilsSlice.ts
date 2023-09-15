import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showInputBar: false,
  showCreateBlog: false,
  showSignInPage: false,
  showSignUpPage: false,
};

const utilsSlice = createSlice({
  name: "utilsSlice",
  initialState,
  reducers: {
    setShowInputBar: (state, action) => {
      state.showInputBar = action.payload;
    },
    setShowCreateBlog: (state, action) => {
      state.showCreateBlog = action.payload;
    },
    setShowSignInPage: (state, action) => {
      state.showSignInPage = action.payload;
    },
    setShowSignUpPage: (state, action) => {
      state.showSignUpPage = action.payload;
    },
  },
});

export const {
  setShowInputBar,
  setShowCreateBlog,
  setShowSignInPage,
  setShowSignUpPage,
} = utilsSlice.actions;
export default utilsSlice.reducer;
