import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import planLogo from "../../../assets/images/plan.svg";
import { Typography } from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import InvitedRegisterForm from "../../forms/InvitedRegisterForm";
import InvalidLink from "../../login/invalidLink";
import sliderImage from "../../../assets/images/sliderImage.png";
import elipseOuter from "../../../assets/images/Ellipse125.png";
import elipseInner from "../../../assets/images/Ellipse126.png";
import circleImage1 from "../../../assets/images/sliderCircleImage1.png";
import circleImage2 from "../../../assets/images/sliderCircleImage2.png";
import circleImage3 from "../../../assets/images/sliderCircleImage3.png";
import CircularProgress from "@mui/material/CircularProgress";
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
                        sx={{
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
function RegisterInvited() {
    const [check, setCheck] = useState();
    const [isValid, setIsValid] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const token = query.get("token");
    async function checkToken() {
        await axios
            .get(
                `${process.env.REACT_APP_BASE_URL}api/auth/user/invited/?token=${token}`
            )
            .then((result) => {
                setIsValid(true);
                setIsLoading(false);
                setUserDetails(result.data.data);
            })
            .catch((error) => {
                setIsValid(false);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        checkToken();
    }, []);
    SwiperCore.use([EffectCoverflow, Pagination]);

    return (
        <>
            {!isLoading ? (
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
                                ""
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
                                                Create your account by filling
                                                out below details
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                mt: 2,
                                                p: 1,
                                                height: "445px",
                                            }}
                                        >
                                            <InvitedRegisterForm
                                                onSubmiting={(val) => {
                                                    setCheck(val);
                                                }}
                                                user={userDetails}
                                                token={token}
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
            ) : (
                <div sx={{ mr: 5, ml: 5, mt: 5, mb: 5 }}>
                    <CircularProgress size={60} />
                </div>
            )}
        </>
    );
}

export default RegisterInvited;
