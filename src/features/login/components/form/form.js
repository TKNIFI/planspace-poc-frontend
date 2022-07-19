import React from "react";
import { useFormik } from "formik";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../login.service";

const LoginForm = () => {
    let history = useHistory();
    const [loading, setLoading] = React.useState(false);
    
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .email("must be valid email")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, helpers) => {
            setLoading(true);
            let formData = new FormData();
            formData.append("username", values.username);
            formData.append("password", values.password);
            loginUser(values.username, values.password)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("userInfo", JSON.stringify(res?.data?.data));
                    setLoading(false);
                    history.push("/");
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
                        helpers.setErrors({
                            submit: error.response.data.message,
                        });
                    }
                    setLoading(false);
                    helpers.setStatus({ success: false });
                    helpers.setSubmitting(false);
                });
        },
    });
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
                        id="username"
                        label="Enter Your email *"
                        placeholder="Enter Your email"
                        type="email"
                        value={formik.values.username}
                        error={Boolean(
                            formik.touched.username && formik.errors.username
                        )}
                        helperText={
                            formik.touched.username && formik.errors.username
                        }
                        onChange={formik.handleChange}
                        sx={{ width: "100%", fontFamily: "Fira Sans" }}
                        autoFocus="true"
                    />
                    <TextField
                        id="password"
                        label="Enter Your Password *"
                        placeholder="Enter Your Password"
                        type="password"
                        value={formik.values.password}
                        error={Boolean(
                            formik.touched.password && formik.errors.password
                        )}
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        onChange={formik.handleChange}
                        sx={{ width: "100%", fontFamily: "Fira Sans" }}
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
                    <LoadingButton
                        sx={{
                            mb: 2,
                            mt: 3,
                            paddingLeft: "100px",
                            paddingRight: "100px",
                            paddingTop: "9px",
                            paddingBottom: "9px",
                            textTransform: "none !important",
                            fontFamily: "Fira Sans",
                            background: "#0073EA !important",
                        }}
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        <span style={{ fontSize: "16px" }}>Log In</span>
                    </LoadingButton>
                    <Typography>
                        <a><span
                            onClick={() => history.push("/forgot_password")}
                            // to="/forgot_password"
                            style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                                fontFamily: "Fira Sans",
                            }}
                        >
                            Forgot Username / Password?
                        </span></a>
                    </Typography>
                    <Typography
                        sx={{
                            variant: "body1",
                            color: "gray",
                            mt: 15,
                            fontFamily: "Fira Sans",
                        }}
                    >
                        Do not have an account?{" "}
                        <a><span
                            onClick={() => history.push("/register")}
                            style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                                fontFamily: "Fira Sans",
                            }}
                        >
                            Signup here
                        </span></a>
                    </Typography>
                </Box>
            </form>
        </>
    );
};

export default LoginForm;
