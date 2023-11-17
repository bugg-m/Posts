import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showInputBar: false,
  showCreatePost: false,
  showSignInPage: false,
  showSignUpPage: false,
  showLoader: false,
  isAuthenticated: false,
  user: {},
  postUserProfile: {},
  userFlag: false,
  refreshPostList: false,
  showMenu: false,
  showOptionBar: false,
  showProfilePage: false,
  showCommentBox: false,
};

const utilsSlice = createSlice({
  name: "utilsSlice",
  initialState,
  reducers: {
    setShowInputBar: (state, action) => {
      state.showInputBar = action.payload;
    },
    setShowCreatePost: (state, action) => {
      state.showCreatePost = action.payload;
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
      state.user = action.payload;
    },
    setPostUserProfile: (state, action) => {
      state.postUserProfile = action.payload;
    },
    setRefreshPostList: (state, action) => {
      state.refreshPostList = action.payload;
    },
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setShowOptionBar: (state, action) => {
      state.showOptionBar = action.payload;
    },
    setShowProfilePage: (state, action) => {
      state.showProfilePage = action.payload;
    },
    setShowCommentBox: (state, action) => {
      state.showCommentBox = action.payload;
    },
    setUserFlag: (state, action) => {
      state.userFlag = action.payload;
    },
  },
});

export const {
  setShowInputBar,
  setIsAuthenticated,
  setShowLoader,
  setUser,
  setShowCreatePost,
  setShowSignInPage,
  setShowSignUpPage,
  setRefreshPostList,
  setShowMenu,
  setShowOptionBar,
  setShowProfilePage,
  setShowCommentBox,
  setPostUserProfile,
  setUserFlag,
} = utilsSlice.actions;
export default utilsSlice.reducer;
