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
import { Button as Paper, Grid } from "@mui/material";
import { Upload } from "antd";
import clarityimageline from "../../assets/images/clarity_image-line.png";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Company from "../../models/company/company";
import myApi from "../../network/axios";

const Input = styled("input")({
  display: "none",
});

function EditCompanyfrom({ defaultValues, handleClose, callBack, popUp }) {
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
      image: defaultValues?.logo_url,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Name is required"),
      address_line1: Yup.string().nullable(),
      address_line2: Yup.string().nullable(),
      city: Yup.string().nullable(),
      state: Yup.string().nullable(),
      zip_code: Yup.number().positive().integer().nullable(),
      phone: Yup.number().positive().integer().nullable(),
      email: Yup.string().email("Invalid email").nullable(),
    }),

    onSubmit: async (values) => {
      try {
        let formData = values;
        await myApi
          .put(`api/company/${defaultValues?.id}/`, values)
          .then((result) => {
            handleClose(false);
            callBack();
            popUp(result.response.data.message);
          });
      } catch (error) {
        console.log(error.message);
        handleClose(true);
      }
    },
  });

  const name = (
    <p>
      Name<span style={{ color: "red" }}>*</span>
    </p>
  );

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red" },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="fields"
              style={{
                display: "flex",
                height: "370px",
                width: "745px",
                flexDirection: "column",
              }}
            >
              <TextField
                id="name"
                label="Enter the business name"
                placeholder="Enter the business name"
                type="text"
                required
                sx={{ width: "42vw", margin: "32px 0px 0px 0px" }}
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
                placeholder="Address line 1"
                type="text"
                sx={{ width: "42vw", margin: "32px 0px 0px 0px" }}
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
                placeholder="Address line 2"
                sx={{ width: "42vw", margin: "32px 0px 0px 0px" }}
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
              <div style={{ display: "flex", width: "45vw" }}>
                <TextField
                  id="city"
                  label="City"
                  placeholder="City"
                  sx={{ width: "20.8vw", margin: "32px 19px 32px 0px" }}
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
                  placeholder="State"
                  type="text"
                  required
                  sx={{ width: "20.4vw", margin: "32px 19px 32px 0px" }}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  // autoComplete="current"
                />
                {formik.touched.state && formik.errors.state ? (
                  <MuiAlert severity="error" sx={{ width: "25%" }}>
                    <p>{formik.errors.state}</p>
                  </MuiAlert>
                ) : null}
              </div>
            </div>
            <div
              className="img"
              style={{
                display: "flex",
                height: "fit-content",
                width: "334px",
                position: "relative",
                flexDirection: "column",
                top: "16px",
              }}
            >
              {/* <Typography sx={{ ml: 2, flex: 1 }} variant="p">
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
          ) : null} */}

              <Upload
                accept="image"
                action={formik.values.logo_url}
                onChange={formik.handleChange}
                name="logo_url"
              >
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    height: window.innerWidth > 1900 ? "250px" : "220px",
                    width: window.innerWidth > 1900 ? "300px" : "231px",
                    mt: window.innerWidth > 1900 ? "20px" : "27px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "2px dashed #ccc",
                    boxShadow: "none",
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

              <TextField
                id="zip_code"
                label="Zip code"
                placeholder="Zip code"
                required
                sx={{ marginTop: "30px", width: "19vw" }}
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
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <TextField
              id="phone"
              label="Enter phone number"
              placeholder="Enter phone number"
              sx={{ width: "auto", margin: "32px 5px" }}
              type="tel"
              required
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
              placeholder="Enter email address"
              type="email"
              required
              sx={{ width: "auto", margin: "32px 5px" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.email && formik.errors.email ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <p>{formik.errors.email}</p>
              </MuiAlert>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Muibtn
              variant="outlined"
              sx={{ textTransform: "capitalize", margin: "10px" }}
              color="primary"
            >
              Cancel
            </Muibtn>
            <Muibtn
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              type="submit"
            >
              Save changes
            </Muibtn>
          </div>
        </form>
      </ThemeProvider>
    </>
  );
}

export default EditCompanyfrom;
