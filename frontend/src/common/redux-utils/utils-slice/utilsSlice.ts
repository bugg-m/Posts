import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showInputBar: false,
  showCreateBlog: false,
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
  },
});

export const { setShowInputBar, setShowCreateBlog } = utilsSlice.actions;
export default utilsSlice.reducer;
