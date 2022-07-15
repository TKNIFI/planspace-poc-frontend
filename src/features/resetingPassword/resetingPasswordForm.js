import React,{useState} from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Alert, Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import User from "../../../../models/user/user";
// import { useDispatch } from "react-redux";
require("dotenv").config();
const ResetingPasswordForm = ({ onSubmiting, uid, token }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                .min(8, "Password is too short - should be 8 chars minimum.")
                .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
                .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                ),
        }),
        onSubmit: async (values, helpers) => {
            try {
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
                        console.log(result)
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
                    <TextField
                        id="newpassword"
                        label="Enter new password*"
                        placeholder="Enter new password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment:(
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
                    <TextField
                        id="confirmpassword"
                        label="Confirm new password*"
                        placeholder="Confirm new password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formik.values.confirmpassword}
                        InputProps={{
                            endAdornment:(
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
                <Box className="container">
                    <Button
                        sx={{
                            fontSize: 16,
                            textTransform: "capitalize",
                            pl: 10,
                            pr: 10,
                            py:1
                        }}
                        variant={formik.values.newpassword ? "contained" : "outlined"}
                        type="submit"
                        disabled={formik.values.newpassword ? false : true}
                        // onClick={checkingFormFields}
                    >
                        Reset Password
                    </Button>
                </Box>
                <Box sx={{textAlign: "center"}}>
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
