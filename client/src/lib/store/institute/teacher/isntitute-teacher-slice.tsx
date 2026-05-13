import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteTeacherInitialData } from "./institute-teacher-type";
import { Status } from "@/src/lib/types.ts/types";
import { setStatus } from "../instituteSice";
import { setTeacher } from "../../teacher/teacherSlice";
import { appDispatch } from "../../store";
import { API } from "@/src/lib/http";

const inititalState: IInstituteTeacherInitialData = {
  teacher: {
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
    teacherImage: "",
    course: {
      courseName: "",
      courseDescription: "",
      courseDuration: 0,
      coursePrice: 0,
    },
    teacherExpertise: null,
    teacherSalary: 0,
    teacherJoinDate: "",
  },
  status: Status.LOADING,
};
const instituteTeacherSlice = createSlice({
  name: "instituteTeacher",
  initialState: inititalState,
  reducers: {
    setStatus(
      state: IInstituteTeacherInitialData,
      action: PayloadAction<IInstituteTeacherInitialData["status"]>,
    ) {
      state.status = action.payload;
    },
    setTeacher(
      state: IInstituteTeacherInitialData,
      action: PayloadAction<IInstituteTeacherInitialData["teacher"]>,
    ) {
      state.teacher = action.payload;
    },
  },
});
export const {
  setStatus: setInstituteTeacherStatus,
  setTeacher: setInstituteTeacher,
} = instituteTeacherSlice.actions;
export default instituteTeacherSlice.reducer;

export function createInstituteTeacher(data: IInstituteTeacherInitialData) {
  return async function createInstituteTeacherThunk(dispatch: appDispatch) {
    try {
      const response = await API.post("/institute/teacher", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute teacher:", error);
    }
  };
}

export function fetchInstituteTeacher() {
  return async function fetchInstituteTeacherThunk(dispatch: appDispatch) {
    try {
      const response = await API.get("/institute/teacher");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data > 0 && dispatch(setTeacher(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute teacher:", error);
    }
  };
}

export function deleteInstituteTeacher(id: string) {
  return async function deleteInstituteTeacherThunk(dispatch: appDispatch) {
    try {
      const response = await API.delete(`/institute/teacher/${id}`);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error deleting institute teacher:", error);
    }
  };
}
