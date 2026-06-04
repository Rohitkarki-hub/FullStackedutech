import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICategoryAddData,
  ICategoryData,
  ICategoryInitialData,
} from "./catogeryslice.types";
import { Status } from "@/src/lib/types.ts/types";
import { AppDispatch } from "../../store";
import { APIWITHTOKEN } from "@/src/lib/http/ApiWithToken";

const initialState: ICategoryInitialData = {
  data: [],
  status: Status.LOADING,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {
    setStatus(state: ICategoryInitialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setFetchData(
      state: ICategoryInitialData,
      action: PayloadAction<ICategoryData[]>,
    ) {
      state.data = action.payload;
    },
    setAddData(
      state: ICategoryInitialData,
      action: PayloadAction<ICategoryData>,
    ) {
      state.data.push(action.payload);
    },
    setdeleteCategory(
      state: ICategoryInitialData,
      action: PayloadAction<string>,
    ) {
      const categoryIndex = state.data.findIndex(
        (item) => item.id === action.payload,
      );
      if (categoryIndex !== -1) {
        state.data.splice(categoryIndex, 1);
      }
    },
  },
});

export const { setStatus, setFetchData, setAddData, setdeleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;

export function fetchCategories() {
  return async function fetchCategoryThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await APIWITHTOKEN.get("/institute/category");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data.length > 0 &&
          dispatch(setFetchData(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function addCategory(data: ICategoryAddData) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await APIWITHTOKEN.post("/institute/category", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data && dispatch(setAddData(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function deleteCategory(id: string) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await APIWITHTOKEN.delete(`/institute/category/${id}`);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setdeleteCategory(id));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
