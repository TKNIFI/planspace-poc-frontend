import React, { useState } from "react";
import { Upload } from "antd";
import {
  Grid,
  Button,
  Box,
  TextField,
  Paper,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import clarityimageline from "../../../assets/images/clarity_image-line.png";
import { useFormik } from "formik";
import * as Yup from "yup";

const PackagesForm = () => {
  const [copyIsChecked, setCopyIsChecked] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      logo_url: "",
      price: "",
      noOfGuests:"",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Location Name is required"),
      logo_url: Yup.mixed().required("location image is required"),
      price: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Package Price is required"),
      noOfGuests: Yup.string().required("No. of Guests required")
    }),
    onSubmit: (values) => {
      const formValues = values;
      Location.CreateLocation(formValues);
      console.log("package values", formValues);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { width: "50ch" },
          }}
        >
          <FormControlLabel
            sx={{}}
            control={<Checkbox checked={copyIsChecked} />}
            label="Copy address & contacts from company profile"
          />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "70ch", marginTop: 3 },
                }}
              >
                <TextField
                  id="name"
                  label="Package Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  // autoComplete="current"
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Upload
                id="logo_url"
                accept="image"
                action={formik.values.logo_url}
                onChange={formik.handleChange}
              >
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "220px",
                    width: "231px",
                    mt: "27px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="p">Add Package Image </Typography>
                  <img src={clarityimageline} />
                  <Typography variant="p" sx={{ fontSize: "10px" }}>
                    Supports , JPG, JPG2000, PNG Less than 2 MB
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Drop your images here or <a>Browse</a>
                  </Typography>
                </Paper>
              </Upload>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  "& .MuiTextField-root": { width: "50ch" },
                  ml: -6,
                }}
              >
                <Stack
                  spacing={5}
                  direction="row"
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    id="price"
                    label="Package Price"
                    type="tel"
                    value={formik.values.price}
                    error={Boolean(formik.touched.price && formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                  <TextField
                    id="email"
                    label="Total No. of Guests"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    // autoComplete="current"
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  "& .MuiTextField-root": { width: "50ch" },
                  ml: -6,
                }}
              >
                <Stack
                  spacing={5}
                  direction="row"
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    id="noOfGuests"
                    label="Date and Time"
                    type="tel"
                    value={formik.values.noOfGuests}
                    error={Boolean(
                      formik.touched.noOfGuests && formik.errors.noOfGuests
                    )}
                    helperText={
                      formik.touched.noOfGuests && formik.errors.noOfGuests
                    }
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                  <TextField
                    id="email"
                    label="Package Duration"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    // autoComplete="current"
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ ml: "5px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Add-On Packages
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>

          <Stack
            spacing={2}
            direction="row"
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                color: "lightgray",
                borderColor: "gray",
              }}
            >
              cancel
            </Button>
            <Button variant="outlined" sx={{ textTransform: "capitalize" }}>
              Save
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: "capitalize" }}
            >
              Save & Activate
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default PackagesForm;
