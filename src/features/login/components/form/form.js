import React, { useState } from "react";
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import User from "../../../../models/user/user";
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values.username, values.password);
    await dispatch(User.loginCall(values.username, values.password));
  };
  const formik = useFormik({
    initialValues: {
      emailId: "",
      pasword: "",
    },
    validationSchema: Yup.object({
      emailId: Yup.string()
        .email("must be valid email")
        .required("Email is required"),
      pasword: Yup.string()
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
            id="emailId"
            label="Enter Your EmailId"
            type="email"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.emailId && formik.errors.emailId ? (
            <MuiAlert severity="error">
              <span>{formik.errors.emailId}</span>
            </MuiAlert>
          ) : null}
          <TextField
            id="pasword"
            label="Create password"
            type="password"
            value={formik.values.pasword}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.pasword && formik.errors.pasword ? (
            <MuiAlert severity="error">
              <span>{formik.errors.pasword}</span>
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
