import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
// import User from "../../../../models/user/user";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
require("dotenv").config();

const PasswordUpdateForm = ({ onSubmiting }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    let formData = new FormData();
    formData.append("primary_email_id", values.email);
    await axios
      .post(
        `${process.env.REACT_APP_URL}api/auth/password_reset/request/`,
        formData
      )
      .then((response) => {
        const data = response.data.data;
      })
      .catch((error) => alert(error.message));
    // await dispatch(User.loginCall(formData));
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("must be valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      onFinish(values);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { pb: 2, marginTop: 1 },
          }}
        >
          <TextField
            id="primary_email_id"
            label="Enter Your Email"
            type="email"
            value={formik.values.primary_email_id}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.primary_email_id && formik.errors.primary_email_id ? (
            <MuiAlert severity="error">
              <span>{formik.errors.primary_email_id}</span>
            </MuiAlert>
          ) : null}
        </Box>
        <Box className="container">
          <Button
            sx={{
              mb: 2,
              mt: 3,
              paddingLeft: "70px",
              paddingRight: "70px",
              pt: 2,
              pb: 2,
              textTransform: "capitalize",
            }}
            variant="contained"
            type="submit"
            onClick={() => {
              onSubmiting(true);
            }}
          >
            Send instructions
          </Button>

          <Typography sx={{ mt: 4 }}>
            <Link to="/login">Remembered your password? login here</Link>
          </Typography>
          <Typography sx={{ variant: "body1", color: "gray", mt: 7, mb: 0 }}>
            Do not have an account? <Link to="/register">Signup here</Link>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default PasswordUpdateForm;
