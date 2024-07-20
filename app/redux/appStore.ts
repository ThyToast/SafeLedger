import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./appSlice";

const appStore = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
