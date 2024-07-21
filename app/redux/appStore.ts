import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./appSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginPersistConfig = {
  key: "login",
  storage: AsyncStorage,
};

const loginPersistReducer = persistReducer(
  loginPersistConfig,
  loginSlice.reducer
);

const appStore = configureStore({
  reducer: {
    login: loginPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const appPersistor = persistStore(appStore);

export default { appStore, appPersistor };
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
