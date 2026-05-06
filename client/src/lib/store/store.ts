import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import studentSlice from "./studentSlice";
import teacherSlice from "./teacherSlice";

const store = configureStore({
  reducer: {
    userSlice,
    studentSlice,
    teacherSlice,
    // instituteSlice,
  },
});

export default store;
// dispatch ko type ho yo
export type appDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
