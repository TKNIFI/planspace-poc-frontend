import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Box, IconButton, InputAdornment, TextField, Typography, Alert } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordStrengthBar from 'react-password-strength-bar';
import { generatedPassword } from "../../utilities/generatePassword";
import PasswordChecklist from "react-password-checklist";

// import User from "../../../../models/user/user";
// import { useDispatch } from "react-redux";
require("dotenv").config();

const ResetingPasswordForm = ({ onSubmiting, uid, token }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordScore, setPasswordScore] = useState(0);
    const [loading, setLoading] = useState(false)
    const [showNewPassMeter, setShowNewPassMeter] = useState(false);
    const [generatedPass, setGeneratedPass] = useState("");
    const passwordEnums = ["TOO SHORT", "WEAK", "OK", "GOOD", "STRONG"];
    const passwordColors = ["#dddddd", "#ef4836", "#f6b44d", "#2b90ef", "#25c281"];

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            newpassword: "",
            confirmpassword: "",
        },
        validationSchema: Yup.object({
            newpassword: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                ),
            confirmpassword: Yup.string()
                .required("No password provided.")
                .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
                .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                ),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                let formData = new FormData();
                formData.append("uid", uid);
                formData.append("token", token);
                formData.append("password", values.newpassword);
                formData.append("confirm_password", values.confirmpassword);
                await axios
                    .post(
                        `${process.env.REACT_APP_BASE_URL}api/auth/password_reset/confirm/`,
                        formData
                    )
                    .then((result) => {
                        setLoading(false)
                        toast.success(
                            result?.data?.message
                        );
                        // eslint-disable-next-line no-unused-expressions
                        formik.values.newpassword &&
                            formik.values.confirmpassword
                            ? onSubmiting(true)
                            : null;
                    });
            } catch (error) {
                setLoading(false)
                formik.setErrors({ submit: error.response.data.message });
                helpers.setSubmitting(false);
                onSubmiting(false);
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
                    <div style={{ position: "relative" }}><TextField
                        id="newpassword"
                        label="Enter new password*"
                        placeholder="Enter new password"
                        onFocus={() => setShowNewPassMeter(true)}
                        onBlur={() => formik.values.newpassword ? setShowNewPassMeter(true) : setShowNewPassMeter(false)}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        value={formik.values.newpassword}
                        error={Boolean(
                            formik.touched.newpassword &&
                            formik.errors.newpassword
                        )}
                        helperText={
                            formik.touched.newpassword &&
                            formik.errors.newpassword
                        }
                        onChange={formik.handleChange}
                        autoFocus="true"
                        sx={{ width: "100%" }}
                    />
                        {showNewPassMeter && formik.values.newpassword &&
                            <div style={{ maxWidth: "350px", padding: "40px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", position: "absolute", right: "0%", zIndex: "999", background: "white" }}>
                                <strong>Password Strength </strong><span style={{ color: passwordColors[passwordScore] }}>{passwordEnums[passwordScore]}</span>
                                <PasswordStrengthBar minLength={8} className="passwordMeter" scoreWordStyle={{ display: "none" }} password={formik.values.newpassword} onChangeScore={(score, feedback) => setPasswordScore(score)} />
                                {/* <div style={{display: 'flex', alignItems:'center', marginTop:"10px"}}><span>Atleast 8 character{"(s)"}</span></div>
                        <div style={{display: 'flex', alignItems:'center',marginTop:"10px"}}><span>Atleast 1 numeric character{"(s)"}</span></div>
                        <div style={{display: 'flex', alignItems:'center',marginTop:"10px"}}><span>Atleast 1 upper case character{"(s)"}</span></div>
                        <div style={{display: 'flex', alignItems:'center',marginTop:"10px"}}><span>Not used in past 4 passwords{"(s)"}</span></div> */}
                                <PasswordChecklist
                                    style={{ marginTop: "20px" }}
                                    rtl={true}
                                    rules={["minLength", "specialChar", "number", "capital"]}
                                    minLength={8}
                                    value={formik.values.newpassword}
                                    onChange={(isValid) => {
                                        console.log("isValid", isValid)
                                        formik.setSubmitting(isValid)
                                    }
                                    }
                                    messages={{
                                        minLength: "Atleast 8 character(s).",
                                        specialChar: "Atleast 1 special character(s)",
                                        number: "Atleast 1 numeric character(s)",
                                        capital: "Atleast 1 upper case character(s)"
                                    }}
                                    iconComponents={{
                                        ValidIcon: <CheckCircleOutlinedIcon style={{ marginRight: "5px" }} color="success" />,
                                        InvalidIcon: <CancelOutlinedIcon style={{ marginRight: "5px" }} color="error" />
                                    }}
                                />
                                <LoadingButton style={{ marginTop: "20px" }} onClick={() => {
                                    setShowNewPassMeter(true);
                                    let pass = generatedPassword.shuffle();
                                    setGeneratedPass(pass);
                                }} sx={{ marginTop: "10px", background: "#f5f5f5", border: "1px solid #ccc", color: "#777" }}>
                                    Generate a Strong Password
                                </LoadingButton>
                                {generatedPass &&
                                    <div style={{ width: "100%", display: 'flex', alignItems: 'center', marginTop: "5px", justifyContent: "center" }}>
                                        <span sx={{ border: "1px solid #ccc" }}>{generatedPass}</span><ContentCopy sx={{ cursor: "pointer" }} onClick={() => {
                                            navigator.clipboard
                                                .writeText(generatedPass)
                                                .then(() => {
                                                    toast.success(
                                                        "Password Copied SuccessFully",
                                                        {
                                                            position: "top-right",
                                                            pauseOnHover: true,
                                                            draggable: false,
                                                            progress: undefined,
                                                        }
                                                    );
                                                    setGeneratedPass("")
                                                });
                                        }} />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <TextField
                        id="confirmpassword"
                        label="Confirm new password*"
                        placeholder="Confirm new password"
                        onFocus={() => setShowNewPassMeter(false)}
                        type={showConfirmPassword ? "text" : "password"}
                        value={formik.values.confirmpassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(
                            formik.touched.confirmpassword &&
                            formik.errors.confirmpassword
                        )}
                        helperText={
                            formik.touched.confirmpassword &&
                            formik.errors.confirmpassword
                        }
                        onChange={formik.handleChange}
                        sx={{ width: "100%" }}
                    />
                </Box>
                {formik.errors.submit && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Alert severity="error" style={{ fontSize: 16 }}>
                            {formik.errors.submit}
                        </Alert>
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
                        }}
                        variant={formik.values.newpassword ? "contained" : "outlined"}
                        type="submit"
                        disabled={!formik.isValid}
                        loading={loading}
                    // onClick={checkingFormFields}
                    >
                        Reset Password
                    </LoadingButton>
                </Box>
                <Box sx={{ textAlign: "center" }}>
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

export default ResetingPasswordForm;
