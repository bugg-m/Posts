import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showInputBar: false,
  showCreateBlog: false,
  showSignInPage: false,
  showSignUpPage: false,
  showLoader: false,
  isAuthenticated: false,
  user: [{}],
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
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user.push(action.payload);
    },
  },
});

export const {
  setShowInputBar,
  setIsAuthenticated,
  setShowLoader,
  setUser,
  setShowCreateBlog,
  setShowSignInPage,
  setShowSignUpPage,
} = utilsSlice.actions;
export default utilsSlice.reducer;
