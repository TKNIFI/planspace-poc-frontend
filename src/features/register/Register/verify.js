import React, { useState } from "react";
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
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import RegisterationForm from "../../forms/registerationform";
import RegisterSuccess from "./registerSuccess";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import InvalidLink from "../../login/invalidLink";
import sliderImage from "../../../assets/images/sliderImage.png";
import elipseOuter from "../../../assets/images/Ellipse125.png";
import elipseInner from "../../../assets/images/Ellipse126.png";
import circleImage1 from "../../../assets/images/sliderCircleImage1.png";
import circleImage2 from "../../../assets/images/sliderCircleImage2.png";
import circleImage3 from "../../../assets/images/sliderCircleImage3.png";
require("dotenv").config();

function CircularProgressWithLabel(props) {
  const history = useHistory();
  return (
    <Box>
      <CountdownCircleTimer
        isPlaying
        duration={5}
        colors={["#2576b8"]}
        colorsTime={[0]}
        onComplete={() => {
          history.push("/login");
        }}
      >
        {({ remainingTime }) => {
          return (
            <Box sx={{ marginLeft: 5 }}>
              <Typography>Redirecting to login page in</Typography>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", marginRight: 2 }}
              >
                {" "}
                {remainingTime}
              </Typography>
              <Typography sx={{ textAlign: "center", marginRight: 2 }}>
                Seconds
              </Typography>
            </Box>
          );
        }}
      </CountdownCircleTimer>
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
  const [isValid, setIsValid] = useState();
  const [counter, setCounter] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        });
    } catch (error) {
      setIsValid(false);
      setIsLoading(false);
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
  SwiperCore.use([EffectCoverflow, Pagination]);

  return (
    <>
      <Grid container spacing={0} columns={16} sx={{ ml: 12 }}>
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
        <Grid item xs={8}>
          <>
            <Paper sx={{ height: "100%", p: 5 }}>
              <Box>
                <img src={planLogo} height="50px" width="220px" />
              </Box>

              <Box sx={{ mt: 3, p: 1 }}>
                <Typography variant="h5" sx={{ color: "#003399" }}>
                  {isLoading ? "Verifying ..." : ""}
                  {isValid ? "Your Account has been Verified Successfully" : ""}
                  {!isLoading && !isValid ? "Token is Invalid or Expired" : ""}
                </Typography>
              </Box>

              {isLoading && (
                <div>
                  <CircularProgress />
                </div>
              )}
              <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                {isValid ? (
                  <>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "25px",
                        marginBottom: 5,
                      }}
                    >
                      <Link href="/login">Click here to Login</Link>
                    </Typography>

                    <div style={styleLoaderWrapper}>
                      {/* <div sx={{ marginBottom: 50 }}>
                        <Typography>
                          You will be redirect to Login Screen.{" "}
                        </Typography>
                      </div> */}
                      <div sx={{ marginTop: "10px" }}>
                        <CircularProgressWithLabel
                          variant="determinate"
                          value={progress}
                          counter={counter}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <Typography>Token is Invalid or Expired. </Typography>
                )}
              </Box>
            </Paper>
          </>
        </Grid>
      </Grid>
    </>
  );
}

export default Verify;
