import React, { useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
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
import PasswordResetForm from "../forms/passwordResetForm";
import PasswordResetMail from "../login/passwordResetMail";
const SliderContent = () => {
  return (
    <>
      <Box className="container-for-swiper-slide">
        <img src={sliderImage} height="751px" width="100%" />
        <Box className="centered-for-content-swiper-slide">
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Event Planning Made Easy
          </Typography>
        </Box>
        <Box className="centered-for-content-swiper-slide-para">
          <Typography variant="p" sx={{ color: "white", fontWeight: "" }}>
            Amet minim mollit non deserunt ullamco est sit <br /> aliqua dolor
            do amet sint. Velit officia consequat duis <br /> enim velit mollit.
            Exercitation veniam consequat sunt <br /> nostrud amet.
          </Typography>
        </Box>
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
export default function ResetPassword() {
  const [check, setCheck] = useState();
  const [email, setEmail] = useState(null);
  const history = useHistory();

  const getEmail = (email) => {
    setEmail(email);
  };
  SwiperCore.use([EffectCoverflow, Pagination]);

  return (
    <>
      <Grid container spacing={0} columns={16} sx={{ ml: 12 }}>
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
        {/* check required on success */}
        {check && email ? (
          <PasswordResetMail email={email} />
        ) : (
          <Grid item xs={8}>
            <Paper sx={{ height: "100%", p: 5 }}>
              <Box>
                <img src={planLogo} height="50px" width="220px" />
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
              <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                <PasswordResetForm
                  onSubmiting={(val) => {
                    setCheck(val);
                  }}
                  submittedEmail={(email) => {
                    setEmail(email);
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
