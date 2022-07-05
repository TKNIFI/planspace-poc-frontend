import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import planLogo from "../../../assets/images/plan.svg";
import { Link, Typography } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import RegisterationForm from "../../forms/registerationform";
import RegisterSuccess from "./registerSuccess";
// import RegisterSuccess from "../../register/registerSuccess";
import InvalidLink from "../../login/invalidLink";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Pagination } from "swiper";
import sliderImage from "../../../assets/images/sliderImage.png";
import elipseOuter from "../../../assets/images/Ellipse125.png";
import elipseInner from "../../../assets/images/Ellipse126.png";
import circleImage1 from "../../../assets/images/sliderCircleImage1.png";
import circleImage2 from "../../../assets/images/sliderCircleImage2.png";
import circleImage3 from "../../../assets/images/sliderCircleImage3.png";

require("dotenv").config();

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.counter)}`}
        </Typography>
      </Box>
    </Box>
  );
}

const SliderContent = () => {
  return (
    <>
      <Box className="container-for-swiper-slide">
        <img src={sliderImage} height="800px" width="100%" />
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
          <Typography
            variant="p"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            Amet minim mollit non deserunt ullamco est sit <br /> aliqua dolor
            do amet sint. Velit officia consequat duis <br /> enim velit mollit.
            Exercitation veniam consequat sunt <br /> nostrud amet.
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
function Verify() {
  const [isValid, setIsValid] = useState(false);
  const [counter, setCounter] = useState(6);

  const [progress, setProgress] = React.useState(0);
  const history = useHistory();

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const uid = query.get("uid");
  const token = query.get("token");

  const verifyEmail = async () => {
    try {
      let formData = new FormData();
      formData.append("uid", uid);
      formData.append("token", token);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}api/auth/register/activate/`,
          formData
        )
        .then((result) => {
          setIsValid(true);
        });
    } catch (error) {
      setIsValid(false);
    }
  };

  React.useEffect(() => {
    verifyEmail();

    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
      //   setCounter(counter - 1);
    }, 470);
    setTimeout(() => {
      console.log("time out");
      if (isValid) {
        history.push("/login");
      } else {
      }
    }, 5000);
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      setCounter(counter - 1);
    }, 800);
  }, [counter]);

  const styleLoaderWrapper = {
    height: "165px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

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
        <Grid item xs={8}>
          {!isValid ? (
            <Paper sx={{ height: "100%", p: 5 }}>
              <Box>
                <img src={planLogo} height="30px" width="170px" />
              </Box>
              <Box sx={{ mt: 3, p: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#003399",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Invalid or Expired link
                </Typography>
              </Box>
              <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link href="/register">click here to register again </Link>
                </Typography>
              </Box>
            </Paper>
          ) : (
            <>
              <Paper sx={{ height: "100%", p: 5 }}>
                <Box>
                  <img src={planLogo} height="50px" width="220px" />
                </Box>
                <Box sx={{ mt: 3, p: 1 }}>
                  <Typography variant="h5" sx={{ color: "#003399" }}>
                    Welcome To PlanSpace
                  </Typography>
                  <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
                    Your account has been verified successfully
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                  <Typography>
                    You will be redirect to Login Screen.{" "}
                    <Link href="/login"> Click here to Login</Link>
                  </Typography>
                  <div style={styleLoaderWrapper}>
                    <CircularProgressWithLabel
                      variant="determinate"
                      value={progress}
                      counter={counter}
                    />
                  </div>
                </Box>
              </Paper>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Verify;
