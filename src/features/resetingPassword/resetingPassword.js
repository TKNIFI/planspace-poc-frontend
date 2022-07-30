import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import planLogo from "../../assets/images/plan.svg";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import ResetingPasswordForm from "./resetingPasswordForm";
import ResetingPasswordConfirmation from "./resetingPasswordConfirmation";
import InvalidLink from "../login/invalidLink";
import sliderImage from "../../assets/images/sliderImage.png";
import elipseOuter from "../../assets/images/Ellipse125.png";
import elipseInner from "../../assets/images/Ellipse126.png";
import circleImage1 from "../../assets/images/sliderCircleImage1.png";
import circleImage2 from "../../assets/images/sliderCircleImage2.png";
import circleImage3 from "../../assets/images/sliderCircleImage3.png";
require("dotenv").config();

const SliderContent = () => {
    return (
        <>
            <Box className="container-for-swiper-slide">
                <img src={sliderImage} height="880px" width="100%" />
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
                        sx={{
                            color: "white",
                            fontFamily: "Fira Sans",
                        }}

                    >
                        Amet minim mollit non deserunt ullamco est sit <br />{" "}
                        aliqua dolor do amet sint. Velit officia consequat duis{" "}
                        <br /> enim velit mollit. Exercitation veniam consequat
                        sunt <br /> nostrud amet.
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
export default function ResetingPassword() {
    const [check, setCheck] = useState(false);
    const [checkFormVal, setCheckFormVal] = useState(null);
    const [isValid, setIsValid] = useState(true);
    SwiperCore.use([EffectCoverflow, Pagination]);

    function useQuery() {
        let search = (new URL(document.location)).searchParams;
        // const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const token = query.get("token");
    const uid = query.get("uid");
    
    async function checkToken() {
        let formData = new FormData();
        formData.append("token", token);
        formData.append("uid", uid);
        await axios
            .post(
                `${process.env.REACT_APP_BASE_URL}api/auth/password_reset/validate_token/`,
                formData
            )
            .then((result) => setIsValid(true))
            .catch((error) => setIsValid(false));
    }

    useEffect(() => {
        checkToken();
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
                {/* create account formik form  */}
                {isValid ? (
                    <Grid item xs={8}>
                        {check ? (
                            <ResetingPasswordConfirmation />
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
                                            variant="h4"
                                            sx={{ color: "#003399" }}
                                        >
                                            Reset Password
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ mt: 2, color: "gray" }}
                                        >
                                            Please reset your password below
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 2, p: 1, height: "445px" }}>
                                        <ResetingPasswordForm
                                            uid={uid}
                                            token={token}
                                            onSubmiting={(val) => setCheck(val)}
                                        />
                                    </Box>
                                </Paper>
                            </>
                        )}
                    </Grid>
                ) : (
                    <InvalidLink />
                )}
            </Grid>
        </>
    );
}
