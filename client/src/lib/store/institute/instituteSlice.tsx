import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../types.ts/types";
import { IInstituteInitialData } from "./instituteSlice.type";
import { AppDispatch } from "../store";
import { APIWITHTOKEN } from "../../http/ApiWithToken";

const initialState: IInstituteInitialData = {
  institute: {
    instituteName: "",
    instituteEmail: "",
    institutePhone: "",
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

export function createInstitute(data: IInstituteInitialData["institute"]) {
  return async function createInstituteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/institute", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
