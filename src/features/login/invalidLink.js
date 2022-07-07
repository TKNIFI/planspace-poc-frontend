import React from "react";
import "antd/dist/antd.css";
import planLogo from "../../assets/images/plan.svg";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import emailimage from "../../assets/images/invalid_link.jpg";

const InvalidLink = () => {
  return (
    <>
      {/* <Toaster position="top-right" /> */}
      <Grid item xs={8}>
        <Paper
          sx={{
            height: "100%",
            width: "100%",
            p: 5,
          }}
        >
          <Box>
            <img src={planLogo} height="50px" width="220px" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 20,
            }}
          >
            <Box>
              <img src={emailimage} height="70px" width="70px" />
            </Box>
            <Box sx={{ mt: 5 }}>
              <Typography variant="h4" sx={{ color: "#003399" }}>
                Invalid Or Expired Link
              </Typography>
              <Typography
                variant="p"
                sx={{
                  mt: 2,
                  color: "#696969",
                  fontSize: "18px",
                }}
              >
                This link is invalid or expired. Please try again
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 10,
              }}
            >
              <Typography
                variant="span"
                sx={{ color: "gray", fontSize: "18px" }}
              >
                <Link
                  to="/login"
                  style={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  Click here to Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default InvalidLink;
