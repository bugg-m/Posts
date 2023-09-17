import { configureStore } from "@reduxjs/toolkit";
import utilsReducer from "../utils-slice/utilsSlice";

const utilsStore = configureStore({
  reducer: utilsReducer,
});

export default utilsStore;
