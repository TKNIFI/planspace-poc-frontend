import React from "react";
import { Box, Paper, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import planLogo from "../../../assets/images/plan.svg";
import successCircle from "../../../assets/images/checkCircle.png";
import { Button } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
require("dotenv").config();

const RegisterSuccess = ({ email }) => {
  // const [email, setEmail] = React.useState()
  const [loading, setLoading] = React.useState(false);

  const resendEmail = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}api/auth/register/email_resend/`,
          { email: email }
        )
        .then((response) => {
          toast.success(response.data.message);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* <Grid> */}
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
            Thank you for registering with us. An email with a confirmation link
            has been sent to your registred email id. Please click on the link
            to confirm your account and start using the system.
          </Typography>
          <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
            Did not receive the mail?{" "}
            <a
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
              onClick={() => resendEmail()}
            >
              {loading ? (
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
              ) : (
                "Resend"
              )}
            </a>
          </Typography>
          <Box sx={{ mt: 20, mb: 0 }}>
            <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
              Already confirmed?{" "}
              <Link
                to="/login"
                style={{ fontWeight: "bolder", textDecoration: "underline" }}
              >
                Signin here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
      {/* </Grid> */}
    </>
  );
};

export default RegisterSuccess;
