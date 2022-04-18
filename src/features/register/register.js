import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import planLogo from "../../assets/images/plan.png";
import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import RegisterationForm from "../forms/registerationform";
import RegisterSuccess from "../register/registerSuccess";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Pagination } from "swiper";
import sliderImage from "../../assets/images/sliderImage.png";
function Register() {
  return (
    <Grid container spacing={0} columns={16}>
      {/* carousal  */}
      <Grid item xs={8}>
        <Paper sx={{height: "100%"}}>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={sliderImage} height="100%" width="100%" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={sliderImage} height="100%" width="100%" />
            </SwiperSlide>
          </Swiper>
        </Paper>
      </Grid>
      {/* create account formik form  */}
      {/* <RegisterSuccess/> */}
      <Grid item xs={8}>
        <Paper sx={{ height: "100%", p: 5 }}>
          <Box>
            <img src={planLogo} height="30px" width="170px" />
          </Box>
          <Box sx={{ mt: 3, p: 1 }}>
            <Typography variant="h5" sx={{ color: "#003399" }}>
              Welcome To PlanSpace
            </Typography>
            <Typography variant="span" sx={{ mt: 2, color: "gray" }}>
              Create your account by filling out below details
            </Typography>
          </Box>
          <Box sx={{ mt: 2, p: 1 }}>
            <RegisterationForm />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;
