import React from "react";
import { Box, Paper, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import planLogo from "../../assets/images/plan.svg";
import successCircle from "../../assets/images/checkCircle.png";
const ResetingPasswordConfirmation = () => {
    return (
        <>
            <Paper sx={{ height: "100%", p: 5 }}>
                <Box>
                    <img src={planLogo} height="50px" width="220px" />
                </Box>
                <Box
                    sx={{
                        mt: 3,
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img src={successCircle} height="25%" width="25%" />
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        p: 1,
                        ml: 10,
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ color: "#003399" }}>
                        Password Changed Successfully
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ mt: 2, color: "gray", textAlign: "center" }}
                    >
                        Your password is changed successfully. You can now <br />{" "}
                        login with the new password.
                    </Typography>
                    <Box sx={{ mt: 15, mb: 0 }}>
                        <Link to="/login">
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: 20,
                                    textTransform: "capitalize",
                                    pl: 10,
                                    pr: 10,
                                }}
                            >
                                Login Now
                            </Button>
                        </Link>
                    </Box>
                    <Typography
                variant="span"
                sx={{ mt: 2, color: "gray", fontSize: "18px" }}
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
            </Paper>
        </>
    );
};

export default ResetingPasswordConfirmation;
