import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button as Muibtn } from "@mui/material";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import Company from "../../models/company/company";
const Input = styled("input")({
  display: "none",
});

const AddMemberForm = ({ formValues, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      userId: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      // owner: Yup.string().required("owner is required"),
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Name is required"),
      userId: Yup.string().required("user id is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.number()
        .required("Phone number is required")
        .positive()
        .integer(),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      formValues(values);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} style={{ padding: "2%" }}>
        <Box
          sx={{
            "& .MuiTextField-root": { width: "60ch", marginTop: 3 },
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="name"
                label="Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                // autoComplete="current"
              />
              {formik.touched.name && formik.errors.name ? (
                <MuiAlert severity="error" sx={{ width: "70%" }}>
                  <span>{formik.errors.name}</span>
                </MuiAlert>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="userId"
                label="User ID"
                type="text"
                value={formik.values.userId}
                onChange={formik.handleChange}
                // autoComplete="current"
              />
              {formik.touched.userId && formik.errors.userId ? (
                <MuiAlert severity="error" sx={{ width: "70%" }}>
                  <span>{formik.errors.userId}</span>
                </MuiAlert>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                // autoComplete="current"
              />
              {formik.touched.email && formik.errors.email ? (
                <MuiAlert severity="error" sx={{ width: "70%" }}>
                  <span>{formik.errors.email}</span>
                </MuiAlert>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phone"
                label="Phone Number"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                // autoComplete="current"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <MuiAlert severity="error" sx={{ width: "70%" }}>
                  <span>{formik.errors.phone}</span>
                </MuiAlert>
              ) : null}
            </Grid>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  width: "134ch",
                  marginTop: 3,
                  marginLeft: 0.7,
                },
              }}
            >
              <Grid item xs={8}>
                <TextField
                  id="address"
                  label="Address"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  // autoComplete="current"
                />
                {formik.touched.address && formik.errors.address ? (
                  <MuiAlert severity="error" sx={{ width: "70%" }}>
                    <span>{formik.errors.address}</span>
                  </MuiAlert>
                ) : null}
              </Grid>
            </Box>
          </Grid>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                position: "fixed",
                top: "50%",
                left: "50%",
                marginTop: "-100px",
                marginLeft: "-100px",
              },
            }}
          >
            <Stack spacing={2} direction="row" sx={{ marginTop: 10, marginLeft: 50 }}>
              <Muibtn variant="outlined" onClick={() => handleClose(false)}>
                Cancel
              </Muibtn>
              <Muibtn variant="contained" type="submit">
                Submit
              </Muibtn>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddMemberForm;
