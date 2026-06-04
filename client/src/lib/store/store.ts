import { configureStore } from "@reduxjs/toolkit";
import authslice from "./auth/authSlice";
import teacherSlice from "./teacher/teacherSlice";
import instituteSlice from "./institute/instituteSlice";
import instituteTeacherSlice from "./institute/teacher/isntitute-teacher-slice";
import courseSlice from "./institute/course/institute-course-slice";
import categorySlice from "./institute/category/categorySlice";
const store = configureStore({
  reducer: {
    auth: authslice,
    teacher: teacherSlice,
    institute: instituteSlice,
    instituteTeacher: instituteTeacherSlice,
    course: courseSlice,
    category: categorySlice,
  },
});

export default store;
// dispatch ko type ho yo
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
