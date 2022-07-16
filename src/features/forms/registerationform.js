import React from "react";
import axios from "axios";
import "./registerationFrom.css";
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from '@mui/lab/LoadingButton';
import { green } from "@mui/material/colors";
import User from "../../models/user/user";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import SocialButton from "../login/components/SocialButton";
import gmailLogo from "../../assets/images/gmailLogo.png";
import PhoneInput from "../../common/phoneNumber";

require("dotenv").config();

const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const RegisterationForm = ({ onSubmiting, email }) => {
  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      username: "",
      mobile: "",
      company_name: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Name is required"),
      username: Yup.string()
        .email("must be valid email")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Enter phone number"),
      company_name: Yup.string().required("Your Business name is required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let formData = new FormData();
      let name = values.first_name.split(" ");
      formData.append("username", values.username);
      formData.append("mobile", values.mobile.replaceAll("-", ""));
      formData.append("company_name", values.company_name);
      formData.append("password", values.password);
      formData.append("first_name", name[0]);
      if (name.length > 1) {
        formData.append("last_name", name[1]);
      }
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/auth/register/`, formData)
        .then((response) => {
          setLoading(false)
          onSubmiting(true);
          email(values.username);
        })
        .catch((error) => {
          setLoading(false);
          for (const [key, value] of Object.entries(
            error.response.data.message[0]
          )) {
            formik.setFieldError(key, value[0].replace("username", "email"));
          }
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        });
    },
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleGoogleLogin = async (user) => {
    let formData = new FormData();
    formData.append("access_token", user._token.accessToken);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}api/auth/login/google/`, formData)
      .then((response) => {
        const data = response.data;
        localStorage.setItem("userInfo", JSON.stringify(data));
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": {
              pb: 2,
              marginTop: 1,
              fontFamily: "Fira Sans",
            },
          }}
        >
          <TextField
            id="first_name"
            label="Enter your name*"
            placeholder="Enter your name"
            type="text"
            error={Boolean(
              formik.touched.first_name && formik.errors.first_name
            )}
            helperText={formik.touched.first_name && formik.errors.first_name}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            sx={{ width: "100%", fontFamily: "Fira Sans" }}
            autoFocus={true}
          />
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                id="username"
                label="Enter your email address*"
                placeholder="Enter your email address"
                type="email"
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                helperText={formik.touched.username && formik.errors.username}
                value={formik.values.username}
                onChange={formik.handleChange}
                sx={{ width: "100%", fontFamily: "Fira Sans" }}
              />
            </Grid>
            <Grid item xs={6}>
              <PhoneInput
                value={formik.values.mobile}
                onChange={formik.handleChange}
              >
                {() => (
                  <TextField
                    id="mobile"
                    name="mobile"
                    label="Enter your phone number*"
                    placeholder="E.g 212-456-7890"
                    type="tel"
                    error={Boolean(
                      formik.touched.mobile && formik.errors.mobile
                    )}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    sx={{ width: "100%", fontFamily: "Fira Sans" }}
                  />
                )}
              </PhoneInput>
            </Grid>
          </Grid>
          <TextField
            id="company_name"
            name="company_name"
            label="Enter your Business Name"
            placeholder="Enter your Business Name"
            type="text"
            error={Boolean(
              formik.touched.company_name && formik.errors.company_name
            )}
            helperText={
              formik.touched.company_name && formik.errors.company_name
            }
            value={formik.values.company_name}
            onChange={formik.handleChange}
            sx={{ width: "100%", fontFamily: "Fira Sans" }}
          />
          <TextField
            id="password"
            name="password"
            label="Create Password*"
            placeholder="Create Password"
            type="password"
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            value={formik.values.password}
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
          <Box sx={{ m: 1, position: "relative" }}>
            <LoadingButton
              sx={{
                // mb: 2,
                mt: 1.5,
                paddingLeft: "90px",
                paddingRight: "90px",
                paddingTop: "10px",
                paddingBottom: "10px",
                textTransform: "none !important",
                background: "#0073EA !important",
              }}
              variant="contained"
              type="submit"
              loading={loading}
            >
              <span style={{ fontSize: "16px", fontFamily: "Fira Sans" }}>
                Create account
              </span>
            </LoadingButton>
          </Box>
          <Typography
            sx={{ variant: "body1", color: "gray", fontFamily: "Fira Sans" }}
          >
            Or login using
          </Typography>
          {/* <SocialButton
            provider="google"
            appId={process.env.REACT_APP_GOOGLE_API_KEY}
            onLoginSuccess={handleGoogleLogin}
            onLoginFailure={handleSocialLoginFailure}
          > */}
            <img src={gmailLogo} height="35px" width="35px" />
          {/* </SocialButton> */}
          <Typography
            sx={{ variant: "body1", color: "gray", fontFamily: "Fira Sans" }}
          >
            Already have an account?{" "}
            <a><span
              onClick={() => history.push("/login")}
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
                fontFamily: "Fira Sans",
              }}
            >
              Signin here
            </span></a>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default RegisterationForm;
