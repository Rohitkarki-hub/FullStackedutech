import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IteacherInitialState } from "./type";

const teacherInitialState: IteacherInitialState = {
  teacherName: "asada",
  teacherPassword: "bsdasdsa",
};

const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState: teacherInitialState,

  reducers: {
    setTeacherName: (state, action: PayloadAction<string>) => {
      state.teacherName = "hehe";
    },
    setTeacherPassword: (state, action) => {
      state.teacherPassword = "haha";
    },
  },
});

const { setTeacherName, setTeacherPassword } = teacherSlice.actions;
export { setTeacherName, setTeacherPassword };

export default teacherSlice.reducer;
