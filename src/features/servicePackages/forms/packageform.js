import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Paper,
  Button,
  Switch,
  Stack,
  Typography,
  FormControlLabel,
  IconButton,
  MuiAlert,
  Input,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

const PackagesForm = () => {
  return (
    <>
      <Grid container spacing={2} columnSpacing={10}>
        <Grid item xs={6} md={8}>
          <TextField
            id="bname"
            label="Enter the package name"
            type="text"
            fullWidth
            // value={formik.values.bname}
            // onChange={formik.handleChange}
            // autoComplete="current"
          />
          <br />
          <TextField
            id="bname"
            label="Enter the package name"
            type="text"
            fullWidth
            // value={formik.values.bname}
            // onChange={formik.handleChange}
            // autoComplete="current"
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: "block",
              p: 1,
            }}
          >
            <Box sx={{ alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ ml: 2,alignItems: "center", justifyContent: "center" }} variant="p">
                Add Package Image
              </Typography>
              <label htmlFor="image">
                <Input
                  accept=".png, .jpg, .jpeg"
                  id="image"
                  type="file"
                  value=""
                  style={{ display: "none" }}
                  // value={formik.values.image}
                  // onChange={formik.handleChange}
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
              <Typography sx={{ ml: 2 }} variant="p">
                Supports , JPG, JPG2000, PNG Less than 2 MB
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PackagesForm;
