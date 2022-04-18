import React from "react";
import "./registerationFrom.css";
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import User from "../../models/user/user";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterationForm = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(
      values
    );
    await dispatch(
      User.registerationCall(
        values.yname,
        values.emailId,
        values.phoneNo,
        values.YourBname,
        values.pasword
      )
    );
  };
  const formik = useFormik({
    initialValues: {
      yname: "",
      emailId: "",
      phoneNo: "",
      YourBname: "",
      pasword: "",
    },
    validationSchema: Yup.object({
      yname: Yup.string().required("Name is required"),
      emailId: Yup.string()
        .email("must be valid email")
        .required("Email is required"),
      phoneNo: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Enter phone number"),
      YourBname: Yup.string().required("Your Business name is required"),
      pasword: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      let a = JSON.stringify(values, null, 2);
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
            id="yname"
            label="Enter Your name"
            type="text"
            value={formik.values.yname}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.yname && formik.errors.yname ? (
            <MuiAlert severity="error">
              <span>{formik.errors.yname}</span>
            </MuiAlert>
          ) : null}
          <Grid container spacing={4}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phoneNo"
                label="Enter Your phone number"
                type="tel"
                value={formik.values.phoneNo}
                onChange={formik.handleChange}
                sx={{ width: "100%" }}
              />
              {formik.touched.phoneNo && formik.errors.phoneNo ? (
                <MuiAlert severity="error">
                  <span>{formik.errors.phoneNo}</span>
                </MuiAlert>
              ) : null}
            </Grid>
          </Grid>
          <TextField
            id="YourBname"
            label="Enter Your Business name"
            type="text"
            value={formik.values.YourBname}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.YourBname && formik.errors.YourBname ? (
            <MuiAlert severity="error">
              <span>{formik.errors.YourBname}</span>
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
            Create Account
          </Button>
          <Typography sx={{ variant: "body1", color: "gray" }}>
            Already have an account? <Link to="/login">Signin here</Link>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default RegisterationForm;