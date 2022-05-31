import React, { useState, useEffect } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Link,
  useLocation,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import planLogo from "../../assets/images/plan.png";
import { Typography } from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import RegisterationForm from "../forms/registerationform";
import RegisterSuccess from "../register/registerSuccess";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Pagination } from "swiper";
import sliderImage from "../../assets/images/sliderImage.png";
import CircularProgress from "@mui/material/CircularProgress";

function Register() {
  const [check, setCheck] = useState();
  const [isValid, setIsValid] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const uid = query.get("uid")
    const token = query.get("token")
    async function checkToken() {
        await axios.get(`https://planspace.herokuapp.com/api/auth/user/invited/?uid=${uid}&token=${token}`)
            .then((result) => {
                console.log("result", result.data.data)
                setIsValid(true)
                setIsLoading(false)
                setUserDetails(result.data.data)
            })
            .catch((error) => {
                setIsValid(false)
                setIsLoading(false)
                alert(error.response.data.message)
            })
    }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Grid container spacing={0} columns={16}>
      {/* carousal  */}
      <Grid item xs={8}>
        <Paper sx={{ height: "100%" }}>
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
      {!isLoading || userDetails ? (
        <Grid item xs={8}>
          {check ? (
            <RegisterSuccess />
          ) : (
            <>
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
                  <RegisterationForm
                    onSubmiting={(val) => {
                      setCheck(val);
                    }}
                    uid={uid}
                    token={token}
                  />
                </Box>
              </Paper>
            </>
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
}

export default Register;
