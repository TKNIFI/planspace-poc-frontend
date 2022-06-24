import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import planLogo from "../../../assets/images/plan.svg";
import { Typography } from "@mui/material";
import axios from "axios";
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
import CircularProgress from "@mui/material/CircularProgress";

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
                        style={{
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "14px",
                            textAlign: "center",
                            color: "#FFFFFF",
                        }}
                    >
                        Amet minim mollit non deserunt ullamco est sit <br />{" "}
                        aliqua dolor do amet sint. Velit officia consequat duis{" "}
                        <br /> enim velit mollit. Exercitation veniam consequat
                        sunt <br /> nostrud amet.
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
function Register() {
    const [check, setCheck] = useState();
    const [email, setEmail] = useState(true);

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
                    {check ? (
                        <RegisterSuccess email={email} />
                    ) : (
                        <>
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
                                        Welcome To PlanSpace
                                    </Typography>
                                    <Typography
                                        variant="span"
                                        sx={{ mt: 2, color: "gray" }}
                                    >
                                        Create your account by filling out below
                                        details
                                    </Typography>
                                </Box>
                                <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                                    <RegisterationForm
                                        onSubmiting={(val) => {
                                            setCheck(val);
                                        }}
                                        email={(value) => setEmail(value)}
                                    />
                                </Box>
                            </Paper>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default Register;
