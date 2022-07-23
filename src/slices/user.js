import { createSlice } from "@reduxjs/toolkit";
import Create from "react-redux"
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
        saveRoom(state, action) {
            state.rooms = action.payload;
        },
    },
});

export const { reducer } = slice;

export const login = (username, password) => async (dispatch) => {

    const { data } = await myApi.post("api/auth/login/", {
        username,
        password,
    });
    localStorage.setItem("userInfo", JSON.stringify(data.data));
    dispatch(slice.actions.login(data.data));
};

export const saveRoom = (room) => async (dispatch) => {
    dispatch(slice.actions.saveRoom(room))
}

export const register = (formData) => async (dispatch) => {

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
