import { createSlice } from "@reduxjs/toolkit";
import myApi from "../network/axios";
import axios from "axios";

const initialState = {
  details: {}
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.details = action.payload;
    },
    setUserDetails(state, action) {
      state.details = action.payload;
    },
  },
});

export const { reducer } = slice;

export const login = (email, password) => async (dispatch) => {
  //   console.log(email, password, token);

  const { data } = await myApi.post("api/auth/login/", {
    email,
    password
  });
  localStorage.setItem("userInfo", JSON.stringify(data.data));
  dispatch(slice.actions.login(data.data));
};

export const register = (formData) => async (dispatch) => {
  //   console.log(email, password, token);

  const { data } = await axios.post(
    "https://planspace.herokuapp.com/api/auth/register/",
    formData
  );

  dispatch(slice.actions.login(data.data));

  localStorage.setItem("userInfo", JSON.stringify(data.data));
};


export const setUserDetails = (details) => async (dispatch) => {
  //   console.log("dispatching");
};