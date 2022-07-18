//import "./packageForm.css";
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
  Autocomplete,
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
          {/* <FormControlLabel
            sx={{}}
            control={<Checkbox checked={copyIsChecked} />}
            label="Copy address & contacts from company profile"
          /> */}
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
                  required
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  // autoComplete="current"
                />

                <TextField
                  id="textarea"
                  label="Multiline Placeholder"
                  required
                  multiline
                  rows={4}
                  sx={{
                    backgroundColor: "#F4F6F9",
                  }}
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
                  <img src={clarityimageline} style={{width: "auto" , height: "auto"}}/>
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
                  "& .MuiTextField-root": { width: "31.5ch" },
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
                    required
                    type="text"
                    value={formik.values.price}
                    error={Boolean(formik.touched.price && formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                  <TextField
                    id="adults"
                    label="No. of Guests(Adults)"
                    required
                    type="text"
                    //value={formik.values.email}
                    onChange={formik.handleChange}
                    // error={Boolean(formik.touched.email && formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                    // autoComplete="current"
                  />
                  <TextField
                    id="kids"
                    label="No. of Guests(Kids)"
                    required
                    type="text"
                    onChange={formik.handleChange}
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
                    required
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
                    required
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
            <Grid item xs={12}>
              <Box
                sx={{
                  "& .MuiTextField-root": { width: "96%" },
                  ml: "100",
                }}
              >
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  //defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                  renderInput={(params) => (
                    <TextField {...params} label="Search and add" />
                  )}
                />
              </Box>

            </Grid>
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

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];


export default PackagesForm;
