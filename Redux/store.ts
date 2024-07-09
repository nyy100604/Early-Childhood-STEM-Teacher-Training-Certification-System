import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ShowBlackBgReducer from "./features/showBlackbg/showBlackbgSlice";

const rootReducer = combineReducers({ ShowBlackBgReducer });

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
