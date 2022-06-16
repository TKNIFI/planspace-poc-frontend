import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import User from "../../../../models/user/user";
import { login } from "../../../../slices/user";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values) => {
    // await dispatch(User.loginCall(formData));
  };
  const formik = useFormik({
    initialValues: {
      primary_email_id: "",
      password: "",
    },
    validationSchema: Yup.object({
      primary_email_id: Yup.string()
        .email("must be valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true)
        let formData = new FormData();
        formData.append("primary_email_id", values.primary_email_id);
        formData.append("password", values.password);
        await dispatch(login(values.primary_email_id, values.password));
        setLoading(false)
        history.push("/");
      } catch (error) {
        if (typeof error.response.data.message === Object) {
          for (const [key, value] of Object.entries(
            error.response.data.message
          )) {
            formik.setFieldError(key, value[0]);

            formik.setFieldTouched(key, true);
          }
        } else if (error.response.data.message.non_field_errors) {
          error.response.data.message.errors.map((error) =>
            helpers.setErrors({ submit: error })
          );
        } else {
          helpers.setErrors({ submit: error.response.data.message });
        }
        setLoading(false)
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
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
            label="Enter Your Email *"
            placeholder="Enter Your Email"
            type="email"
            value={formik.values.primary_email_id}
            error={Boolean(formik.touched.primary_email_id && formik.errors.primary_email_id)}
            helperText={formik.touched.primary_email_id && formik.errors.primary_email_id}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
            autoFocus="true"
          />
          <TextField
            id="password"
            label="Enter Your Password *"
            placeholder="Enter Your Password"
            type="password"
            value={formik.values.password}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
        </Box>
        {formik.errors.submit && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <MuiAlert severity="error" style={{ fontSize: 16 }}>
              {formik.errors.submit}
            </MuiAlert>
          </Box>
        )}
        <Box className="container">
          <Button
            sx={{
              mb: 2,
              paddingLeft: "50px",
              paddingRight: "50px",
              textTransform: "capitalize",
            }}
            variant="contained"
            type="submit"
            disabled={loading}
          >
            Log in
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
          <Typography>
            <Link
              to="/forgot_password"
              style={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              Forgot Username / Password?
            </Link>
          </Typography>
          <Typography
            sx={{ variant: "body1", color: "gray", mt: 15, }}
          >
            Do not have an account?{" "}
            <Link to="/register" style={{ textDecoration: "underline", fontWeight: "bold" }}>
              Signup here
            </Link>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
