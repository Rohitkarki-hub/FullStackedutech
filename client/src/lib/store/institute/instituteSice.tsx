import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../types.ts/types";
import { IInstituteInitialData } from "./instituteSlice.type";

const initialState: IInstituteInitialData = {
  institute: {
    instituteName: "",
    instituteEmail: "",
    institutephoneNumber: "",
    instituteAddress: "",
  },
  status: Status.LOADING,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState: initialState,
  reducers: {
    setInstitute: (
      state: IInstituteInitialData,
      action: PayloadAction<IInstituteInitialData["institute"]>,
    ) => {
      state.institute = action.payload;
    },
    setStatus: (
      state: IInstituteInitialData,
      action: PayloadAction<IInstituteInitialData["status"]>,
    ) => {
      state.status = action.payload;
    },
  },
});

const { setInstitute, setStatus } = instituteSlice.actions;
export { setInstitute, setStatus };
export default instituteSlice.reducer;
