import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IRegisterData } from "./authSliceTypes";
import { Status } from "../../types.ts/types";

import { appDispatch } from "../store";
import { API } from "../../http";
import { ILogin } from "@/app/auth/login/login.types";

const initialState: IInitialState = {
  user: {
    username: "",
    password: "",
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

export function registerUser(data: IRegisterData) {
  return async function registerUserThunk(dispatch: appDispatch) {
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
  return async function loginUserThunk(dispatch: appDispatch) {
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
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
