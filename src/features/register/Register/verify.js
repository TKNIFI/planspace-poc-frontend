import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import planLogo from "../../../assets/images/plan.svg";
import { Link, Typography } from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import sliderImage from "../../../assets/images/sliderImage.png";
import elipseOuter from "../../../assets/images/Ellipse125.png";
import elipseInner from "../../../assets/images/Ellipse126.png";
import circleImage1 from "../../../assets/images/sliderCircleImage1.png";
import circleImage2 from "../../../assets/images/sliderCircleImage2.png";
import circleImage3 from "../../../assets/images/sliderCircleImage3.png";
require("dotenv").config();

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
                    <Typography
                        variant="p"
                        sx={{ color: "lightgray", fontWeight: "bold" }}
                    >
                        Amet minim mollit non deserunt ullamco est sit <br />{" "}
                        aliqua dolor do amet sint. Velit officia consequat duis{" "}
                        <br /> enim velit mollit. Exercitation veniam consequat
                        sunt <br /> nostrud amet.
                    </Typography>
                </Box>
                <Box className="centered-for-content-swiper-slide-para"></Box>
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
    const [isValid, setIsValid] = useState(true);
    const [email, setEmail] = useState(true);
    SwiperCore.use([EffectCoverflow, Pagination]);

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
    }, []);

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
                <Grid item xs={8}>
                    {!isValid ? (
                        <Paper sx={{ height: "100%", p: 5 }}>
                            <Box>
                                <img
                                    src={planLogo}
                                    height="30px"
                                    width="170px"
                                />
                            </Box>
                            <Box sx={{ mt: 3, p: 1 }}>
                                <Typography
                                    variant="h5"
                                    sx={{ color: "#003399" }}
                                >
                                    Invalid or Expired link
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                                <Typography>
                                    <Link href="/login">Login</Link>
                                </Typography>
                            </Box>
                        </Paper>
                    ) : (
                        <>
                            <Paper sx={{ height: "100%", p: 5 }}>
                                <Box>
                                    <img
                                        src={planLogo}
                                        height="50px"
                                        width="220px"
                                    />
                                </Box>
                                <Box sx={{ mt: 3, p: 1 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{ color: "#003399" }}
                                    >
                                        Welcome To PlanSpace
                                    </Typography>
                                    <Typography
                                        variant="span"
                                        sx={{ mt: 2, color: "gray" }}
                                    >
                                        Your account has been verified
                                        successfully
                                    </Typography>
                                </Box>
                                <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                                    <Typography>
                                        <Link href="/login">Login</Link>
                                    </Typography>
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
