import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useParams,
  BrowserRouter as Router,
  Link,
  useLocation,
} from "react-router-dom";
import "antd/dist/antd.css";
// import User from "../../models/user/user";
// import { useDispatch } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
import planLogo from "../../assets/images/plan.png";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Pagination } from "swiper";
import sliderImage from "../../assets/images/sliderImage.png";
import ResetingPasswordForm from "./resetingPasswordForm";
import ResetingPasswordConfirmation from "./resetingPasswordConfirmation";
import CircularProgress from "@mui/material/CircularProgress";
export default function ResetingPassword() {
  const [check, setCheck] = useState(false);
  const [checkFormVal, setCheckFormVal] = useState(null);
  const [isValid, setIsValid] = useState(true);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const uid = query.get("uid");
  const token = query.get("token");

  async function checkToken() {
    await axios
      .post(
        `https://planspance.herokuapp.com/api/auth/password_reset/validate_token/`,
        { uid: uid, token: token }
      )
      .then((result) => setIsValid(true))
      .catch((error) => setIsValid(false));
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
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
        {!isValid ? (
          <Grid item xs={8}>
            {check ? (
              <ResetingPasswordConfirmation />
            ) : (
              <>
                <Paper sx={{ height: "100%", p: 5 }}>
                  <Box>
                    <img src={planLogo} height="30px" width="170px" />
                  </Box>
                  <Box sx={{ mt: 3, p: 1 }}>
                    <Typography variant="h4" sx={{ color: "#003399" }}>
                      Reset Password
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
                      Please reset your password below
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2, p: 1 }}>
                    <ResetingPasswordForm
                      uid={uid}
                      token={token}
                      checkFormValues={(formval) => setCheckFormVal(formval)}
                      onSubmiting={(val) => setCheck(val)}
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
    </>
  );
}
