import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IstudentInitialState } from "./type";

const studentInitialState: IstudentInitialState = {
  data: "",
};
const studentSilice = createSlice({
  name: "studentSlice",
  initialState: studentInitialState,

  reducers: {
    setData(state: IstudentInitialState, action: PayloadAction<string>) {
      state.data = action.payload;
    },
  },
});

const { setData } = studentSilice.actions;
export { setData };
dispatch(setData("hello"));

export default studentSilice.reducer;
