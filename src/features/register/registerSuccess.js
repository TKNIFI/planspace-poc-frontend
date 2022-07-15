import React from "react";
import { Box, Paper, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import planLogo from "../../assets/images/plan.png";
import successCircle from "../../assets/images/checkCircle.png";
const RegisterSuccess = () => {
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
            <img src={successCircle} height="25%" width="25%" />
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 1,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ color: "#003399" }}>
              Account created successfully!
            </Typography>
            <Typography
              variant="span"
              sx={{ mt: 2, color: "gray", textAlign: "center" }}
            >
              Thank you for registering with us. An email with a confirmation
              link has been sent to your registred email id. Please click on the
              link to confirm your account and start using the system.
            </Typography>
            <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
              Did not receive the mail?{" "}
              <Link
                style={{ textDecoration: "underline", fontWeight: "bolder" }}
              >
                Resend
              </Link>
            </Typography>
            <Box sx={{ mt: 20, mb: 0 }}>
              <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
                Already confirmed? <Link to="/login">Signin here</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default RegisterSuccess;
