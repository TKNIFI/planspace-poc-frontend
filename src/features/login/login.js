import React from "react";
import axios from 'axios';
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
import SocialButton from "./components/SocialButton";
import sliderImage from "../../assets/images/sliderImage.png";
import LoginForm from "./components/form/form";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onFinish = async (values) => {
    await dispatch(User.loginCall(values.username, values.password));

    // Logged in.
    const { from } = location.state || { from: { path: "dashboard" } };
    history.replace(from);
  };

  const handleFacebookLogin = async (user) => {
    let formData = new FormData()
    formData.append("access_token", user._token.accessToken)
    await axios.post("https://planspace.herokuapp.com/api/auth/login/facebook/", formData).then(response => {
      const data = response.data
      localStorage.setItem("userInfo", JSON.stringify(data))
      history.push("/companyprofile/company")
    }).catch(error => alert(error.message))
  };

  const handleGoogleLogin = async (user) => {
    let formData = new FormData()
    formData.append("access_token", user._token.accessToken)
    await axios.post("https://planspace.herokuapp.com/api/auth/login/google/", formData).then(response => {
      const data = response.data
      localStorage.setItem("userInfo", JSON.stringify(data))
      history.push("/companyprofile/company")
    }).catch(error => alert(error.message))
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
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
        <Grid item xs={8}>
          <Paper sx={{ height: "100%", p: 5 }}>
            <Box>
              <img src={planLogo} height="30px" width="170px" />
            </Box>
            <Box sx={{ mt: 3, p: 1 }}>
              <Typography variant="h5" sx={{ color: "#003399" }}>
                Welcome To PlanSpace
              </Typography>
              <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
                Login to your account by filling out below details
              </Typography>
            </Box>
            <SocialButton
              provider="facebook"
              appId="1042967406622137"
              onLoginSuccess={handleFacebookLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with Facebook
            </SocialButton>
            <SocialButton
              provider="google"
              appId="252238412999-q66jdhb3c9ne04sosvuqf6laq08gqkld.apps.googleusercontent.com"
              onLoginSuccess={handleGoogleLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with Google
            </SocialButton>
            <Box sx={{ mt: 2, p: 1 }}>
              <LoginForm />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
