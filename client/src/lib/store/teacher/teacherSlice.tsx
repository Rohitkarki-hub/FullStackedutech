import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../types.ts/types";
import { ITeacherInitialData } from "./teacher.type";

const initialState: ITeacherInitialData = {
  teacher: {
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
  },
  status: Status.LOADING,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: initialState,
  reducers: {
    setTeacher: (
      state: ITeacherInitialData,
      action: PayloadAction<ITeacherInitialData["teacher"]>,
    ) => {
      state.teacher = action.payload;
    },
    setStatus: (
      state: ITeacherInitialData,
      action: PayloadAction<ITeacherInitialData["status"]>,
    ) => {
      state.status = action.payload;
    },
  },
});

const { setTeacher, setStatus } = teacherSlice.actions;
export { setTeacher, setStatus };
export default teacherSlice.reducer;
