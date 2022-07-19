import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import planLogo from "../../assets/images/plan.svg";
import { Typography, Grid, Paper, Box, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import emailimage from "../../assets/images/emailSuccessImage.png";
require("dotenv").config();

const PasswordResetMail = ({ email }) => {
  const [userEmail, setUserEmail] = React.useState(email);

  async function resendEmail() {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/auth/password_reset/request/`,
        { username: userEmail }
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  return (
    <>
      <Grid item xs={8}>
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
            <img src={emailimage} height="25%" width="25%" />
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 1,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              ml: 15,
            }}
          >
            <Typography variant="h4" sx={{ color: "#003399" }}>
              Check your email
            </Typography>
            <Typography
              variant="p"
              sx={{
                mt: 2,
                color: "#696969",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              We have sent the password reset instructions to your <br />{" "}
              registered email id.
            </Typography>
            <Typography
              variant="span"
              sx={{ mt: 5, color: "gray", fontSize: "18px" }}
            >
              Did not receive the mail?{" "}
              <a
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={() => resendEmail()}
              >
                Resend
              </a>
            </Typography>
            <Box sx={{ mt: 20, mb: 0 }}>
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
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default PasswordResetMail;
