import { configureStore } from "@reduxjs/toolkit";
import reduxReducer from "./reduxSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    books: reduxReducer,
  },
});
