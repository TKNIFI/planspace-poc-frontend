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

const AddonsForm = () => {
  const [copyIsChecked, setCopyIsChecked] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Add-On Name is required"),
      price: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Add-On Price is required"),
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
                  label="Add-On Name"
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
                  "& .MuiTextField-root": { width: "108ch" },
                }}
              >
                <TextField
                  id="price"
                  label="Add on Price"
                  type="tel"
                  value={formik.values.price}
                  error={Boolean(formik.touched.price && formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  onChange={formik.handleChange}
                  // autoComplete="current"
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

export default AddonsForm;
