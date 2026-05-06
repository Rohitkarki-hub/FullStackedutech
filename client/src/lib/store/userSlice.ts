import { createSlice } from "@reduxjs/toolkit";
import { SocketAddress } from "net";
import { sendTaskMessage } from "next/dist/build/swc/generated-native";
import { IuserInitialState } from "./type";
import axios from "axios";
import { API } from "../http";

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
      state.name = ;
    },
    setAddress(state, action) {
      state.address = "address";
    },
  },
});

const { setName, setAddress } = userSlice.actions;
export { setName, setAddress };

export default userSlice.reducer;


function registerUser(data) {
  return async function registerUserThunk(){
   try  
   {
    const respone = await axios.post("/user/register");
    if(respone.status === 200){
      return respone.data;
    }
   }
   catch (error) {
    console.log(error);
   }

  }
}

function loginUser() {
  return async function loginUserThunk(){
    const respone = await axios.post("/user/login");
    if(respone.status === 200){
      return respone.data;
    }
  }
}