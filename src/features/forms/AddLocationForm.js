import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button as Muibtn } from "@mui/material";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import Location from "../../models/Locations/Location";
const Input = styled("input")({
  display: "none",
});
const AddLocationForm = ({ sendChildToParent }) => {
  const [copyIsChecked, setCopyIsChecked] = useState();
  const [copyAddressandContacts, setCopyAddressandContacts] = useState([{}]);
  const formik = useFormik({
    initialValues: {
      Lname: "",
      owner: null,
      mailingAddressOnly: false,
      physicalMainLocation: false,
      virtualLocation: false,
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      phone: "",
      email: "",
      image: "",
    },
    validationSchema: Yup.object({
      // owner: Yup.string().required("owner is required"),
      Lname: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Location Name is required"),
      address1: Yup.string().required("Address is required"),
      address2: Yup.string().required("Address is required"),
      city: Yup.string().required("City name is required"),
      state: Yup.string().required("State name is required"),
      zipcode: Yup.number()
        .required("Zip code is required")
        .positive()
        .integer(),
      phone: Yup.number()
        .required("Phone number is required")
        .positive()
        .integer(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      image: Yup.mixed().required("location image is required"),
    }),
    onSubmit: (values) => {
      const formValues = values;
      Location.CreateLocation(formValues);
      console.log("Locations values", formValues);
      sendChildToParent(formValues);
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
          <FormControlLabel
            sx={{ m: 1 }}
            control={<Checkbox checked={copyIsChecked} />}
            label="Copy address and contacts from company profile"
          />
          <Box>
            <TextField
              id="Lname"
              label="Enter the location name"
              type="text"
              value={formik.values.Lname}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.Lname && formik.errors.Lname ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <span>{formik.errors.Lname}</span>
              </MuiAlert>
            ) : null}
            <TextField
              id="address1"
              label="Address line 1"
              type="text"
              value={formik.values.address1}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.address1 && formik.errors.address1 ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <p>{formik.errors.address1}</p>
              </MuiAlert>
            ) : null}
            <TextField
              id="address2"
              label="Address line 2"
              type="text"
              value={formik.values.address2}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.address2 && formik.errors.address2 ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div>{formik.errors.address2}</div>
              </MuiAlert>
            ) : null}
            <Box
              sx={{
                float: "right",
                borderColor: "lightslategray",
                borderStyle: "dotted",
                padding: "50px",
              }}
            >
              <Typography sx={{ ml: 2, flex: 1 }} variant="p">
                Add Business images
              </Typography>
              <label htmlFor="image">
                <Input
                  accept="image/*"
                  id="image"
                  type="file"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  variant="outlined"
                  sx={{display: "flex", flexWrap: 'wrap'}}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              {formik.values.image}
              {formik.touched.image && formik.errors.image ? (
                <MuiAlert severity="error">
                  <div>{formik.errors.image}</div>
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
                <p>{formik.errors.city}</p>
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
                <p>{formik.errors.state}</p>
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
                <p>{formik.errors.zipcode}</p>
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
              control={
                <Switch
                  id="mailingAddressOnly"
                  checked={formik.values.mailingAddressOnly}
                  onChange={formik.handleChange}
                />
              }
              label="Mailing Address Only"
            />
            <FormControlLabel
              control={
                <Switch
                  id="physicalMainLocation"
                  checked={formik.values.physicalMainLocation}
                  onChange={formik.handleChange}
                />
              }
              label="Physical Main Location"
            />
            <FormControlLabel
              control={
                <Switch
                  id="virtualLocation"
                  checked={formik.values.virtualLocation}
                  onChange={formik.handleChange}
                />
              }
              label="Virtual Location"
            />
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "70ch", marginTop: 3 },
            }}
          >
            <TextField
              id="phone"
              label="Enter phone number"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <p>{formik.errors.phone}</p>
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
                <p>{formik.errors.email}</p>
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
              <Muibtn variant="contained" type="submit">
                Save changes
              </Muibtn>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddLocationForm;
