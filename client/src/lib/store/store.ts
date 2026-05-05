import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import studentSlice from "./studentSlice";
import teacherSlice from "./teacherSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    student: studentSlice,
    teacher: teacherSlice,
  },
});

export default store;

export type appDispatch = typeof store.dispatch;
