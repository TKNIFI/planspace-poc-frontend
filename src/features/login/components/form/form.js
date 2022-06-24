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
            username: Yup.string()
                .email("must be valid email")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                let formData = new FormData();
                formData.append("username", values.username);
                formData.append("password", values.password);
                await dispatch(login(values.username, values.password));
                setLoading(false);
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
                setLoading(false);
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
                        id="username"
                        label="Enter Your Email *"
                        placeholder="Enter Your Email"
                        type="email"
                        value={formik.values.username}
                        error={Boolean(
                            formik.touched.username && formik.errors.username
                        )}
                        helperText={
                            formik.touched.username && formik.errors.username
                        }
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
                        error={Boolean(
                            formik.touched.password && formik.errors.password
                        )}
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
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
                            mt: 3,
                            paddingLeft: "80px",
                            paddingRight: "80px",
                            pt: 2,
                            pb: 2,
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
                            style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                            }}
                        >
                            Forgot Username / Password?
                        </Link>
                    </Typography>
                    <Typography
                        sx={{
                            variant: "body1",
                            color: "gray",
                            mt: 15,
                        }}
                    >
                        Do not have an account?{" "}
                        <Link
                            to="/register"
                            style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                            }}
                        >
                            Signup here
                        </Link>
                    </Typography>
                </Box>
            </form>
        </>
    );
};

export default LoginForm;
