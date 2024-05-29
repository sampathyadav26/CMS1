import { configureStore } from "@reduxjs/toolkit";

import cmsAppReducer from "./reducers";

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: cmsAppReducer,
    preloadedState,
  });
};
