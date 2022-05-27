import React from "react";
import "antd/dist/antd.css";
import planLogo from "../../assets/images/plan.png";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import emailimage from "../../assets/images/sendemail.png";
export default function PasswordResetMail() {
  return (
    <>
      <Grid item xs={8}>
        <Paper sx={{ height: "100%", p: 5 }}>
          <Box>
            <img src={planLogo} height="30px" width="170px" />
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
              ml:15
            }}
          >
            <Typography variant="h5" sx={{ color: "#003399" }}>
              Check your email
            </Typography>
            <Typography
              variant="span"
              sx={{ mt: 2, color: "gray", textAlign: "center" }}
            >
              We have sent the password reset instructions to your registered email id
            </Typography>
            <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
              Did not receive the mail? <Link>Resend</Link>
            </Typography>
            <Box sx={{mt: 20, mb: 0}}>
              <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
                Do not have an account? <Link to="/register">Signup here</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}