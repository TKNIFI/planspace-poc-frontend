import React from "react";
import Box from "@mui/material/Box";
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
const Input = styled("input")({
  display: "none",
});

function AddCompanyfrom() {
  const formik = useFormik({
    initialValues: {
      name: "",
      addressOne: "",
      addressTwo: "",
      city: "",
      state: "",
      zipcode: null,
      phnumber: "",
      email: "",
      imgfile: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(15, "Must be 15 characters or less").required("Name is required"),
      addressOne: Yup.string().required("Address is required"),
      addressTwo: Yup.string().required("Address is required"),
      city: Yup.string().required("City name is required"),
      state: Yup.string().required("State name is required"),
      zipcode: Yup.number().required("Zip code is required").positive().integer(),
      phnumber: Yup.number().required("Phone number is required").positive().integer(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      imgfile: Yup.mixed().nullable().required("Company image is required"),
    }),
    onSubmit: (values) => {
      let a = JSON.stringify(values, null, 2);
      console.log(a);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch", marginTop: 3 },
          }}
        >
          <Box>
            <TextField
              id="name"
              label="Enter the business name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.name && formik.errors.name ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              </MuiAlert>
            ) : null}
            <TextField
              id="addressOne"
              label="Address line 1"
              type="text"
              value={formik.values.addressOne}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.addressOne && formik.errors.addressOne ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.addressOne}</div>
              </MuiAlert>
            ) : null}
            <TextField
              id="addressTwo"
              label="Address line 2"
              type="text"
              value={formik.values.addressTwo}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.addressTwo && formik.errors.addressTwo ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.addressTwo}</div>
              </MuiAlert>
            ) : null}
            <Box
              sx={{ float: "right", borderStyle: "dotted", padding: "70px" }}
            >
              <Typography sx={{ ml: 2, flex: 1 }} variant="p">
                Add Business images
              </Typography>
              <label htmlFor="imgfile">
                <Input
                  accept="image/*"
                  id="imgfile"
                  type="file"
                  value={formik.values.imgfile}
                  onChange={formik.handleChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  variant="outlined"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              {formik.touched.imgfile && formik.errors.imgfile ? (
              <MuiAlert severity="error">
                <div style={{ color: "red" }}>{formik.errors.imgfile}</div>
              </MuiAlert>
            ) : null}
            </Box>
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { width: "25ch" },
            }}
          >
            <TextField
              id="city"
              label="City"
              type="text"
              value={formik.values.city}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.city && formik.errors.city ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.city}</div>
              </MuiAlert>
            ) : null}
            <TextField
              id="state"
              label="State"
              type="text"
              value={formik.values.state}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.state && formik.errors.state ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.state}</div>
              </MuiAlert>
            ) : null}
            <TextField
              id="zipcode"
              label="Zip code"
              type="number"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.zipcode && formik.errors.zipcode ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.zipcode}</div>
              </MuiAlert>
            ) : null}
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { width: "25ch" },
              marginLeft: 1,
            }}
          >
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Mailing Address Only"
            />
            <FormControlLabel
              control={<Switch />}
              label="Physical Main Location"
            />
            <FormControlLabel control={<Switch />} label="Virtual Location" />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Add as a venue"
            />
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "70ch", marginTop: 3 },
            }}
          >
            <TextField
              id="phnumber"
              label="Enter phone number"
              type="tel"
              value={formik.values.phnumber}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.phnumber && formik.errors.phnumber ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.phnumber}</div>
              </MuiAlert>
            ) : null}
            <TextField
              id="email"
              label="Enter email address"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.email && formik.errors.email ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              </MuiAlert>
            ) : null}
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              sx={{ float: "right", marginRight: 2 }}
            >
              <Muibtn variant="outlined">Cancel</Muibtn>
              <Muibtn variant="contained" type="submit">
                Save changes
              </Muibtn>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default AddCompanyfrom;
