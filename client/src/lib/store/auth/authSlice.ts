import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IRegisterData, IUserData } from "./authSliceTypes";
import { Status } from "../../types.ts/types";

import { AppDispatch } from "../store";
import { API } from "../../http/Api";
import { ILogin } from "@/app/auth/login/login.types";

const initialState: IInitialState = {
  user: {
    username: "",
    token: "",
  },
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(
      state: IInitialState,
      action: PayloadAction<IInitialState["user"]>,
    ) {
      state.user = action.payload;
    },
    setStatus(
      state: IInitialState,
      action: PayloadAction<IInitialState["status"]>,
    ) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data: IUserData) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/auth/register", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (e) {
      console.log(e);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function loginUser(data: ILogin) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        dispatch(setUser(response.data.data));
        localStorage.setItem("token", response.data.data.token);
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (e) {
      console.log(e);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
