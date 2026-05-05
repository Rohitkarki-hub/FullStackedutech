import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IteacherInitialState } from "./type";

const teacherInitialState: IteacherInitialState = {
  TeacherName: "a",
  TeacherPassword: "b",
};

const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState: teacherInitialState,

  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.TeacherName = action.payload;
    },
    setAddress: (state, action) => {
      state.TeacherPassword = "hehe";
    },
  },
});

const { setName, setAddress } = teacherSlice.actions;
export { setName, setAddress };

export default teacherSlice.reducer;
