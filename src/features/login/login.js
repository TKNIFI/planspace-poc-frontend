import React from "react";
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
import SocialButton from "./components/SocialButton";
import sliderImage from "../../assets/images/sliderImage.png";
import elipseOuter from "../../assets/images/Ellipse125.png";
import elipseInner from "../../assets/images/Ellipse126.png";
import circleImage1 from "../../assets/images/sliderCircleImage1.png";
import circleImage2 from "../../assets/images/sliderCircleImage2.png";
import circleImage3 from "../../assets/images/sliderCircleImage3.png";
import LoginForm from "./components/form/form";
const SliderContent = () => {
  return (
    <>
      <Box className="container-for-swiper-slide">
        <img src={sliderImage} height="740px" width="100%" />
        <Box className="centered-for-content-swiper-slide">
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
          >
            Event Planning Made Easy
          </Typography>
        </Box>
        <Box className="centered-for-content-swiper-slide-para">
          <Typography
            variant="p"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            Amet minim mollit non deserunt ullamco est sit <br /> aliqua dolor
            do amet sint. Velit officia consequat duis <br /> enim velit
            mollit. Exercitation veniam consequat sunt <br /> nostrud amet.
          </Typography>
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img src={elipseOuter} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img src={elipseInner} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img src={circleImage1} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img src={circleImage2} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img src={circleImage3} />
        </Box>
      </Box>
    </>
  );
};
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

  // const handleFacebookLogin = async (user) => {
  //   let formData = new FormData()
  //   formData.append("access_token", user._token.accessToken)
  //   await axios.post("https://planspace.herokuapp.com/api/auth/login/facebook/", formData).then(response => {
  //     const data = response.data
  //     localStorage.setItem("userInfo", JSON.stringify(data))
  //     history.push("/companyprofile/company")
  //   }).catch(error => alert(error.message))
  // };

  // const handleGoogleLogin = async (user) => {
  //   let formData = new FormData()
  //   formData.append("access_token", user._token.accessToken)
  //   await axios.post("https://planspace.herokuapp.com/api/auth/login/google/", formData).then(response => {
  //     const data = response.data
  //     localStorage.setItem("userInfo", JSON.stringify(data))
  //     history.push("/companyprofile/company")
  //   }).catch(error => alert(error.message))
  // };

  // const handleSocialLoginFailure = (err) => {
  //   console.error(err);
  // };
  
  return (
    <>
      <Grid container spacing={0} columns={16} sx={{ ml: 12 }}>
        {/* carousal  */}
        <Grid item xs={6}>
          <Paper>
            <Swiper
              centeredSlides
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
            >
              <SwiperSlide>
                <SliderContent />
              </SwiperSlide>
              <SwiperSlide>
                <SliderContent />
              </SwiperSlide>
            </Swiper>
          </Paper>
        </Grid>
        {/* create account formik form  */}
        <Grid item xs={8}>
          <Paper sx={{ p: 5 }}>
            <Box>
              <img src={planLogo} height="50px" width="220px" />
            </Box>
            <Box sx={{ mt: 7, p: 1 }}>
              <Typography variant="h4" sx={{ color: "#003399" }}>
                Welcome To PlanSpace
              </Typography>
              <Typography
                variant="span"
                sx={{ mt: 3, color: "gray", fontSize: "18px" }}
              >
                Login to your account by filling out below details
              </Typography>
            </Box>
            {/* <SocialButton
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
            </SocialButton> */}
            <Box sx={{ mt: 3, p: 1, height:"445px" }}>
              <LoginForm />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
