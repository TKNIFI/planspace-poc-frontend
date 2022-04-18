import React, { useState } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link, useHistory
 } from "react-router-dom";
import * as Yup from "yup";
import User from "../../../../models/user/user";
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

const LoginForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    let formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)
    await axios.post("https://planspace.herokuapp.com/api/auth/login/", formData).then(response => {
      const data = response.data.data
      localStorage.setItem("userInfo", JSON.stringify(data))
      history.push("/companyprofile/company")
    }).catch(error => alert(error.message))
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
            id="email"
            label="Enter Your EmailId"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.email && formik.errors.email ? (
            <MuiAlert severity="error">
              <span>{formik.errors.email}</span>
            </MuiAlert>
          ) : null}
          <TextField
            id="password"
            label="Create password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.password && formik.errors.password ? (
            <MuiAlert severity="error">
              <span>{formik.errors.password}</span>
            </MuiAlert>
          ) : null}
        </Box>
        <Box className="container">
          <Button
            sx={{ mb: 2, paddingLeft: "50px", paddingRight: "50px" }}
            variant="contained"
            type="submit"
          >
            Log in
          </Button>
          <Typography>
            <Link to="">Forgot Username / Password?</Link>
          </Typography>
          <Typography sx={{ variant: "body1", color: "gray", mt: 2 }}>
            Do not have an account? <Link to="/register">Signup here</Link>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
