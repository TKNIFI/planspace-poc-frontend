import React, { useEffect } from "react";
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
import Company from "../../models/company/company";
import myApi from "../../network/axios"

const Input = styled("input")({
  display: "none",
});

function EditCompanyfrom({defaultValues, handleClose, callBack, popUp}) {
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: defaultValues?.name,
      address_line1: defaultValues?.address_line1,
      address_line2: defaultValues?.address_line2,
      city: defaultValues?.city,
      state: defaultValues?.state,
      zip_code: defaultValues?.zip_code,
      phone: defaultValues?.phone,
      email: defaultValues?.email,
      image: defaultValues?.logo_url
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Name is required"),
      address_line1: Yup.string().nullable(),
      address_line2: Yup.string().nullable(),
      city: Yup.string().nullable(),
      state: Yup.string().nullable(),
      zip_code: Yup.number()
        .positive()
        .integer().nullable(),
      phone: Yup.number()
        .positive()
        .integer().nullable(),
      email: Yup.string().email("Invalid email").nullable(),
    }),

    onSubmit: async (values) => {
      try {
        let formData = values;
        await myApi.put(`api/company/${defaultValues?.id}/`, values).then((result) => {
          handleClose(false);
          callBack();
          popUp(result.response.data.message);
        })
      } catch (error) {
        console.log(error.message)
        handleClose(true);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch", marginTop: 3 },
            maxWidth: "md",
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
                <p>{formik.errors.name}</p>
              </MuiAlert>
            ) : null}
            <TextField
              id="address_line1"
              label="Address line 1"
              type="text"
              value={formik.values.address_line1}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.address_line1 && formik.errors.address_line1 ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <p>{formik.errors.address_line1}</p>
              </MuiAlert>
            ) : null}
            <TextField
              id="address_line2"
              label="Address line 2"
              type="text"
              value={formik.values.address_line2}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.address_line2 && formik.errors.address_line2 ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <div>{formik.errors.address_line2}</div>
              </MuiAlert>
            ) : null}
            <Box
              sx={{
                float: "right",
                borderColor: "lightslategray",
                borderStyle: "solid",
                padding: "50px",
              }}
            >
              <Typography sx={{ ml: 2, flex: 1 }} variant="p">
                Add Business images
              </Typography>
              <label htmlFor="image">
                <Input
                  accept=".png, .jpg, .jpeg"
                  id="image"
                  type="file"
                  value={formik.values.logo_url}
                  onChange={formik.handleChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  variant="outlined"
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              {formik.values.logo_url}
              {formik.touched.logo_url && formik.errors.logo_url ? (
                <MuiAlert severity="error">
                  <div>{formik.errors.logo_url}</div>
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
              id="zip_code"
              label="Zip code"
              type="number"
              value={formik.values.zip_code}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.zip_code && formik.errors.zip_code ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <p>{formik.errors.zip_code}</p>
              </MuiAlert>
            ) : null}
          </Box>
          {/* <Box
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
            <FormControlLabel
              control={
                <Switch
                  id="AddAsAVenue"
                  checked={formik.values.AddAsAVenue}
                  onChange={formik.handleChange}
                />
              }
              label="Add as a venue"
            />
          </Box> */}
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
}

export default EditCompanyfrom;
