import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
// import User from "../../../../models/user/user";
// import { useDispatch } from "react-redux";
// import CircularProgress from "@mui/material/CircularProgress";

const ResetingPasswordForm = ({ checkFormValues ,onSubmiting, uid, token }) => {
  const formik = useFormik({
    initialValues: {
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      newpassword: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      confirmpassword: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: async (values) => {
      let formData = new FormData()
      formData.append("uid", uid)
      formData.append("token", token)
      formData.append("password", values.newpassword)
      formData.append("confirm_password", values.confirmpassword)
      await axios.post("https://planspace.herokuapp.com/api/auth/password_reset/confirm/", formData)
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
            id="newpassword"
            label="Enter new password"
            type="password"
            value={formik.values.newpassword}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.newpassword && formik.errors.newpassword ? (
            <MuiAlert severity="error">
              <span>{formik.errors.newpassword}</span>
            </MuiAlert>
          ) : null}
          <TextField
            id="confirmpassword"
            label="Confirm new password"
            type="password"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <MuiAlert severity="error">
              <span>{formik.errors.confirmpassword}</span>
            </MuiAlert>
          ) : null}
        </Box>
        <Box className="container">
          <Button
            sx={{
              fontSize: 20,
              textTransform: "capitalize",
              pl: 10,
              pr: 10,
            }}
            variant="contained"
            type="submit"
            onClick={() => onSubmiting(true)}
          >
            Reset Password
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ResetingPasswordForm;
