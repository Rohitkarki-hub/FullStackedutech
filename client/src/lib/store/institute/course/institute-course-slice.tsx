import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStatus } from "../instituteSice";
import { Status } from "@/src/lib/types.ts/types";
import { API } from "@/src/lib/http";
import { IInstituteCourseInitialData } from "./institute-course-types";

const inititalState: IInstituteCourseInitialData = {
  status: Status.LOADING,
  course: [
    {
      courseName: "",
      courseDescription: "",
      courseDuration: 0,
      coursePrice: 0,
      id: "",
    },
  ],
};

const instituteCourseSlice = createSlice({
  name: "instituteCourse",
  initialState: inititalState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setCourse(state, action: PayloadAction<any>) {
      state.course = action.payload;
    },
    setdeleteCourse(state, action: PayloadAction<string>) {
      const courseIndex = state.course.findIndex(
        (item) => item.id === action.payload,
      );
      if (courseIndex !== -1) {
        state.course.splice(courseIndex, 1);
      }
    },
    setupdateCourse(state, action: PayloadAction<any>) {
      const id = action.payload.id;
      const data = action.payload.data;
      const courseIndex = state.course.findIndex((course) => (course.id = id));
      state.course[courseIndex] = data;
    },
  },
});

export const {
  setStatus: setInstituteCourseStatus,
  setCourse: setInstituteCourse,
  setdeleteCourse: setDeleteInstituteCourse,
  setupdateCourse: setUpdateInstituteCourse,
} = instituteCourseSlice.actions;
export default instituteCourseSlice.reducer;

export function createInstituteCourse(data: any) {
  return async function createInstituteCourseThunk(dispatch: any) {
    try {
      const response = await API.post("/institute/course", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute course:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchInstituteCourses() {
  return async function fetchInstituteCoursesThunk(dispatch: any) {
    try {
      const response = await API.get("/institute/course");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data.length > 0 &&
          dispatch(setCourse(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute courses:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteInstituteCourse(id: string) {
  return async function deleteInstituteCourseThunk(dispatch: any) {
    try {
      const response = await API.delete(`/institute/course/${id}`);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error deleting institute course:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
