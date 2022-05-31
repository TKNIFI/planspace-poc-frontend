import React from "react";
import axios from "axios";
import "./registerationFrom.css";
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { green } from '@mui/material/colors';
import User from "../../models/user/user";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import SocialButton from "../login/components/SocialButton";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterationForm = ({ onSubmiting, uid, token }) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            email: "",
            mobile: "",
            company_name: "",
            password: "",
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email("must be valid email")
                .required("Email is required"),
            mobile: Yup.string()
                .matches(phoneRegExp, "Phone number is not valid")
                .required("Enter phone number"),
            company_name: Yup.string().required("Your Business name is required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                ),
        }),
        onSubmit: async (values, helpers) => {
            setLoading(true)
            let formData = new FormData()
            let name = values.first_name.split(" ")
            formData.append("email", values.email)
            formData.append("uid", uid)
            formData.append("token", token)
            formData.append("mobile", values.mobile)
            formData.append("company_name", values.company_name)
            formData.append("password", values.password)
            formData.append("first_name", name[0])
            if (name.length > 1) {
                formData.append("last_name", name[1])
            }
            await axios.post("https://planspace.herokuapp.com/api/auth/register/", formData)
                .then((response) => {
                    const data = response.data.data;
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    onSubmiting(true);
                    history.push("/")
                })
                .catch((error) => {
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
                    helpers.setStatus({ success: false });
                    helpers.setSubmitting(false);
                    setLoading(false)
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
            .post(
                "https://planspace.herokuapp.com/api/auth/login/google/",
                formData
            )
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
                        "& .MuiTextField-root": { pb: 2, marginTop: 1 },
                    }}
                >
                    <TextField
                        id="first_name"
                        label="Enter Your name"
                        type="text"
                        error={Boolean(
                            formik.touched.first_name && formik.errors.first_name
                          )}
                          helperText={
                            formik.touched.first_name && formik.errors.first_name
                          }
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        sx={{ width: "100%" }}
                    />
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                id="email"
                                label="Enter Your Email Address"
                                type="email"
                                error={Boolean(
                                    formik.touched.email && formik.errors.email
                                  )}
                                  helperText={
                                    formik.touched.email && formik.errors.email
                                  }
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                sx={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="mobile"
                                label="Enter Your phone number"
                                type="tel"
                                error={Boolean(
                                    formik.touched.mobile && formik.errors.mobile
                                  )}
                                  helperText={
                                    formik.touched.mobile && formik.errors.mobile
                                  }
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                sx={{ width: "100%" }}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        id="company_name"
                        label="Enter Your Business name"
                        type="text"
                        error={Boolean(
                            formik.touched.company_name && formik.errors.company_name
                          )}
                          helperText={
                            formik.touched.company_name && formik.errors.company_name
                          }
                        value={formik.values.company_name}
                        onChange={formik.handleChange}
                        sx={{ width: "100%" }}
                    />
                    <TextField
                        id="password"
                        label="Create password"
                        type="password"
                        error={Boolean(
                            formik.touched.password && formik.errors.password
                          )}
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
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
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                            sx={{
                                mb: 2,
                                paddingLeft: "50px",
                                paddingRight: "50px",
                            }}
                            variant="contained"
                            type="submit"
                            disabled={loading}
                        >
                            Create Account
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                    <Typography sx={{ variant: "body1", color: "gray" }}>
                        Or login using
                    </Typography>
                    <Box>
                        <SocialButton
                            provider="google"
                            appId="252238412999-q66jdhb3c9ne04sosvuqf6laq08gqkld.apps.googleusercontent.com"
                            onLoginSuccess={handleGoogleLogin}
                            onLoginFailure={handleSocialLoginFailure}
                        >
                            <GoogleIcon fontSize="large" />
                        </SocialButton>
                    </Box>
                    <Typography sx={{ variant: "body1", color: "gray" }}>
                        Already have an account?{" "}
                        <Link to="/login">Signin here</Link>
                    </Typography>
                </Box>
            </form>
        </>
    );
};

export default RegisterationForm;
