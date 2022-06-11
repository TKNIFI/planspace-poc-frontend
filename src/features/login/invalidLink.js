import React from "react";
import "antd/dist/antd.css";
import axios from "axios"
import planLogo from "../../assets/images/plan.png";
import { Typography, Grid, Paper, Box, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast"
import emailimage from "../../assets/images/invalid_link.jpg";

const InvalidLink = () => {

  return (
    <>
    <Toaster 
    position="top-right"
    />
      {/* <Grid item xs={8}> */}
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
              ml: 15,
            }}
          >
            <Typography variant="h4" sx={{ color: "#003399" }}>
              Invalid Or Expired Link
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
              This link is invalid or expired. Please try again
            </Typography>
            {/* <Typography
              variant="span"
              sx={{ mt: 5, color: "gray", fontSize: "18px" }}
            >
              Did not receive the mail?{" "}
              <Button style={{ textDecoration: "underline", fontWeight: "bold" }} onClick={() => resendEmail()}>
                Resend
              </Button>
            </Typography> */}
            <Box sx={{ mt: 20, mb: 0 }}>
              <Typography
                variant="span"
                sx={{ mt: 2, color: "gray", fontSize: "18px" }}
              >
                <Link
                  to="/login"
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      {/* </Grid> */}
    </>
  );
}

export default InvalidLink;