import React, { useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import User from "../../models/user/user";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import planLogo from "../../assets/images/plan.png";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Pagination } from "swiper";
import sliderImage from "../../assets/images/sliderImage.png";
import PasswordResetForm from "../forms/passwordResetForm";
import PasswordResetMail from "../login/passwordResetMail";
export default function ResetPassword() {
  const [check, setCheck] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onFinish = async (values) => {
    await dispatch(User.loginCall(values.username, values.password));

    // Logged in.
    const { from } = location.state || { from: { path: "dashboard" } };
    history.replace(from);
  };

  const handlePasswordReset = async (user) => {
    let formData = new FormData();
    formData.append("access_token", user._token.accessToken);
    await axios
      .post(
        "https://planspace.herokuapp.com/api/auth/password_reset/request//",
        formData
      )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("userInfo", JSON.stringify(data));
        history.push("/companyprofile/company");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Grid container spacing={0} columns={16}>
        {/* carousal  */}
        <Grid item xs={8}>
          <Paper sx={{ height: "100%" }}>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src={sliderImage} height="100%" width="100%" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={sliderImage} height="100%" width="100%" />
              </SwiperSlide>
            </Swiper>
          </Paper>
        </Grid>
        {/* create account formik form  */}
        {/* check required on success */}
        {check ? (
          <PasswordResetMail />
        ) : (
          <Grid item xs={8}>
            <Paper sx={{ height: "100%", p: 5 }}>
              <Box>
                <img src={planLogo} height="30px" width="170px" />
              </Box>
              <Box sx={{ mt: 3, p: 1 }}>
                <Typography variant="h4" sx={{ color: "#003399" }}>
                  Reset Password
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
                  Enter the email associated with your account and we will send
                  an email with instructions to reset your password
                </Typography>
              </Box>
              <Box sx={{ mt: 2, p: 1 }}>
                <PasswordResetForm
                  onSubmiting={(val) => {
                    setCheck(val);
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
}
