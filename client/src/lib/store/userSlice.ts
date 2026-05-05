import { createSlice } from "@reduxjs/toolkit";
import { SocketAddress } from "net";
import { sendTaskMessage } from "next/dist/build/swc/generated-native";
import { IuserInitialState } from "./type";

const initialUserState: IuserInitialState = {
  name: null,
  address: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    initialUserState,
  },
  reducers: {
    setName(state, action) {
      state.name = "name";
    },
    setAddress(state, action) {
      state.address = "address";
    },
  },
});

const { setName, setAddress } = userSlice.actions;
export { setName, setAddress };

export default userSlice.reducer;
