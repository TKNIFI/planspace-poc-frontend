import { createSlice } from "@reduxjs/toolkit";
import myApi from "../network/axios";
import axios from "axios";
require("dotenv").config();

const initialState = {
  details: {},
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

<<<<<<< HEAD
export const login = (username, password) => async (dispatch) => {
  //   console.log(email, password, token);

  const { data } = await myApi.post("api/auth/login/", {
    username,
=======
export const login = (primary_email_id, password) => async (dispatch) => {
  //   console.log(email, password, token);

  const { data } = await myApi.post("api/auth/login/", {
    primary_email_id,
>>>>>>> 24071d49ed7ac7a1994b380ae48e99ad0d796f1a
    password,
  });
  localStorage.setItem("userInfo", JSON.stringify(data.data));
  dispatch(slice.actions.login(data.data));
};

export const register = (formData) => async (dispatch) => {
  //   console.log(email, password, token);

  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_URL}api/auth/register/`,
    formData
  );

  dispatch(slice.actions.login(data.data));

  localStorage.setItem("userInfo", JSON.stringify(data.data));
};

export const setUserDetails = (details) => async (dispatch) => {
  //   console.log("dispatching");
};
