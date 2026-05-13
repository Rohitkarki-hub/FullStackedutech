import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;
// dispatch ko type ho yo
export type appDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
