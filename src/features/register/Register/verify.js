import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import planLogo from "../../../assets/images/plan.png";
import { Link, Typography } from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import RegisterationForm from "../../forms/registerationform";
import RegisterSuccess from "./registerSuccess"
// import RegisterSuccess from "../../register/registerSuccess";
import InvalidLink from "../../login/invalidLink"
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
                        sx={{ color: "lightgray", fontWeight: "bold" }}
                    >
                        Amet minim mollit non deserunt ullamco est sit <br />{" "}
                        aliqua dolor do amet sint. Velit officia consequat duis{" "}
                        <br /> enim velit mollit. Exercitation veniam consequat
                        sunt <br /> nostrud amet.
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
    const [email, setEmail] = useState(true);

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const uid = query.get("uid");
    const token = query.get("token");

    const verifyEmail = async () => {
        try {
            await axios.get(`https://planspace.herokuapp.com/api/auth/user/invited/?uid=${uid}&token=${token}/`)
            setIsValid(true)
        } catch (error) {
            setIsValid(false)
        }
    }

    React.useEffect(() => {
        verifyEmail()
    }, [])

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
                        <InvalidLink/>
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
                                        Your account has been verified successfully
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
