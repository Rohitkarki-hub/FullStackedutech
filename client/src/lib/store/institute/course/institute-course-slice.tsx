import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStatus } from "../instituteSlice";
import { Status } from "@/src/lib/types.ts/types";
import { API } from "@/src/lib/http/Api";
import { IInstituteCourseInitialData } from "./institute-course-types";
import { AppDispatch } from "../../store";

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
    setCourse(
      state,
      action: PayloadAction<IInstituteCourseInitialData["course"]>,
    ) {
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
    setupdateCourse(
      state,
      action: PayloadAction<{
        id: string;
        data: IInstituteCourseInitialData["course"][0];
      }>,
    ) {
      const id = action.payload.id;
      const data = action.payload.data;
      const courseIndex = state.course.findIndex((course) => course.id === id);
      if (courseIndex !== -1) {
        state.course[courseIndex] = data;
      }
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

export function createInstituteCourse(
  data: IInstituteCourseInitialData["course"][0],
) {
  return async function createInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/institute/course", data);
      if (response.status === 201) {
        dispatch(setInstituteCourseStatus(Status.SUCCESS));
      } else {
        dispatch(setInstituteCourseStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute course:", error);
      dispatch(setInstituteCourseStatus(Status.ERROR));
    }
  };
}

export function fetchInstituteCourses(id: string) {
  return async function fetchInstituteCoursesThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get(`/institute/course/${id}`);
      if (response.status === 200) {
        dispatch(setInstituteCourseStatus(Status.SUCCESS));
        response.data.data.length > 0 &&
          dispatch(setInstituteCourse(response.data.data));
      } else {
        dispatch(setInstituteCourseStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute courses:", error);
      dispatch(setInstituteCourseStatus(Status.ERROR));
    }
  };
}

export function deleteInstituteCourse(id: string) {
  return async function deleteInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.delete(`/institute/course/${id}`);
      if (response.status === 200) {
        dispatch(setInstituteCourseStatus(Status.SUCCESS));
        dispatch(setDeleteInstituteCourse(id));
      } else {
        dispatch(setInstituteCourseStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error deleting institute course:", error);
      dispatch(setInstituteCourseStatus(Status.ERROR));
    }
  };
}

export function updateInstituteCourse(
  id: string,
  data: IInstituteCourseInitialData["course"][0],
) {
  return async function updateInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.put(`/institute/course/${id}`, data);
      if (response.status === 200) {
        dispatch(setInstituteCourseStatus(Status.SUCCESS));
        dispatch(setUpdateInstituteCourse({ id, data: response.data.data }));
      } else {
        dispatch(setInstituteCourseStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error updating institute course:", error);
      dispatch(setInstituteCourseStatus(Status.ERROR));
    }
  };
}
