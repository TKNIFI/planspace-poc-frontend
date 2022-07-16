import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Box, Button, Typography, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { green } from "@mui/material/colors";
import MuiAlert from "@mui/material/Alert";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
require("dotenv").config();

const PasswordResetForm = ({ onSubmiting, submittedEmail }) => {
  const [loading, setLoading] = React.useState(false);
  
  const timer = React.useRef();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .email("must be valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("username", values.username);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}api/auth/password_reset/request/`,
          formData
        )
        .then((response) => {
          setLoading(false);
          onSubmiting(true);
          submittedEmail(values.username);
        })
        .catch((error) => {
          setLoading(false);
          for (const [key, value] of Object.entries(
            error.response.data.message[0]
          )) {
            if (key === "non_field_errors") {
              formik.setErrors({ submit: value[0] });
            }
            formik.setFieldError(key, value[0].replace("username", "email"));
          }
          helpers.setSubmitting(false);
          setLoading(false);
        });
    },
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { pb: 2, marginTop: 1 },
          }}
        >
          <TextField
            id="username"
            label="Enter Your email*"
            placeholder="Enter Your email"
            type="email"
            value={formik.values.username}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
            error={Boolean(
              formik.touched.username && formik.errors.username
            )}
            helperText={
              formik.touched.username && formik.errors.username
            }
            autoFocus={true}
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
          <Box sx={{ m: 1, position: "relative" }}>
            <LoadingButton
              sx={{
                mb: 2,
                mt: 3,
                pl: 13,
                pr: 13,
                pt: 2,
                pb: 2,
                textTransform: "capitalize",
              }}
              variant="contained"
              type="submit"
              loading={loading}
            >
              <span style={{ fontSize: "16px" }}>Send instructions</span>
            </LoadingButton>
          </Box>

          <Typography sx={{ mt: 4 }}>
            <a><span
              onClick={() => history.push("/login")}
              style={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              Remembered your password? Login Here
            </span></a>
          </Typography>
          <Typography sx={{ variant: "body1", color: "gray", mt: 22, mb: 0 }}>
            Do not have an account?{" "}
            <a><span
              onClick={() => history.push("/register")}
              style={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              Signup here
            </span></a>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default PasswordResetForm;
