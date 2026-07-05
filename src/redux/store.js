import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import portfolioReducer from "./portfolioSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    portfolio: portfolioReducer,
  },
});
