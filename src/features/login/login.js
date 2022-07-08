import React from "react";
import "./login.module.scss";
import "antd/dist/antd.css";
import User from "../../models/user/user";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import planLogo from "../../assets/images/plan.svg";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
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
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "30px",
              fontFamily: "Fira Sans",
            }}
          >
            Event Planning Made Easy
          </Typography>
          <Typography
            variant="p"
            sx={{
              color: "white",
              fontFamily: "Fira Sans",
            }}
          >
            Amet minim mollit non deserunt ullamco est sit <br /> aliqua dolor
            do amet sint. Velit officia consequat duis <br /> enim velit mollit.
            Exercitation veniam consequat sunt <br /> nostrud amet.
          </Typography>
        </Box>
        <Box className="centered-for-content-swiper-slide-para"></Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img style={{ marginBottom: "18px" }} src={elipseOuter} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img src={elipseInner} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img style={{ marginBottom: "120px" }} src={circleImage3} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img style={{ marginBottom: "90px" }} src={circleImage2} />
        </Box>
        <Box className="centered-for-content-swiper-slide-outerEllipse">
          <img src={circleImage1} />
        </Box>
      </Box>
    </>
  );
};
export default function Login() {
  // const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation();

  const onFinish = async (values) => {
    // await dispatch(User.loginCall(values.username, values.password));
    // Logged in.
    // const { from } = location.state || { from: { path: "dashboard" } };
    // history.replace(from);
  };
  SwiperCore.use([EffectCoverflow, Pagination]);

  return (
    <>
      <Grid
        container
        style={{ fontFamily: "Fira Sans" }}
        spacing={0}
        columns={16}
        sx={{ ml: 12 }}
      >
        {/* carousal  */}
        <Grid item xs={6}>
          <Paper>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{
                dynamicBullets: true,
              }}
              className="mySwiper"
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
          <Paper sx={{ p: 5, borderRadius: "0px 4px 4px 0px" }}>
            <Box>
              <img src={planLogo} height="50px" width="220px" />
            </Box>
            <Box sx={{ mt: 7, p: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#003399",
                  fontFamily: "Fira Sans",
                }}
              >
                Welcome To PlanSpace
              </Typography>
              <Typography
                variant="span"
                sx={{
                  mt: 3,
                  color: "gray",
                  fontSize: "18px",
                  fontFamily: "Fira Sans",
                }}
              >
                Login to your account by filling out below details
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 3,
                p: 1,
                height: "445px",
              }}
            >
              <LoginForm />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
