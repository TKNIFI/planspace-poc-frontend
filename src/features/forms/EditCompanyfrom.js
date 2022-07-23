import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Paper, Grid } from "@mui/material";
import { Upload, message } from "antd";
import clarityimageline from "../../assets/images/clarity_image-line.png";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./EditCompanyForm.css";
import myApi from "../../network/axios";
import PhoneInput from "../../common/phoneNumber";
import ZipCodeInput from "../../common/zipcodeInput";

const Input = styled("input")({
  display: "none",
});

const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

function EditCompanyfrom({ defaultValues, handleClose, callBack, popUp }) {
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props = {
    name: "file",
    multiple: false,
    customRequest: dummyRequest,

    beforeUpload(file, fileList) {
      console.log("file", file);
      setFile(file);
    },
    onChange(info) {
      const { status } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e);
    },
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: defaultValues?.name ? defaultValues?.name : "",
      address_line1: defaultValues?.address_line1
        ? defaultValues?.address_line1
        : "",
      address_line2: defaultValues?.address_line2
        ? defaultValues?.address_line2
        : "",
      city: defaultValues?.city ? defaultValues?.city : "",
      state: defaultValues?.state ? defaultValues?.state : "",
      zip_code: defaultValues?.zip_code ? defaultValues?.zip_code : "",
      phone: defaultValues?.phone ? defaultValues?.phone : "",
      email: defaultValues?.email ? defaultValues?.email : "",
      logo: defaultValues?.logo ? defaultValues?.logo : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      address_line1: Yup.string().nullable(),
      address_line2: Yup.string().nullable(),
      city: Yup.string().nullable(),
      state: Yup.string().nullable(),
      zip_code: Yup.number().positive().integer().nullable(),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(phoneRegExp, "Phone number is not valid")
        .nullable(),
      email: Yup.string().email("Invalid email").nullable(),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("address_line1", values.address_line1);
        formData.append("address_line2", values.address_line2);
        formData.append("city", values.city);
        formData.append("state", values.state);
        formData.append("zip_code", values.zip_code);
        formData.append("phone", values.phone.replaceAll("-", ""));
        formData.append("email", values.email);
        if (file) {
          formData.append("logo", file ? file : new File([], ""));
        }
        await myApi
          .put(`api/company/${defaultValues?.id}/`, formData)
          .then((result) => {
            setLoading(false);
            handleClose(false);
            callBack();
            popUp(result.response.data.message);
            setFile(null);
          });
      } catch (error) {
        console.log(error.response.data.message);
        formik.setSubmitting(false);
        setLoading(false);
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
          <div>
            <div
              className="fields"
              style={{
                display: "grid",
                height: "331px",
                gridTemplateColumns: "1fr 300px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "370px",
                  flexDirection: "column",
                }}
              >
                <TextField
                  id="name"
                  label="Enter the business name"
                  placeholder="Enter the business name"
                  type="text"
                  required
                  sx={{ width: "auto", margin: "28px 0px 0px 0px" }}
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
                  sx={{ width: "auto", margin: "48px 0px 0px 0px" }}
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
                  sx={{ width: "auto", margin: "48px 0px 0px 0px" }}
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
              </div>

              <div
                className="img-comp"
                style={{ color: "black", marginLeft: "14px" }}
              >
                <Upload {...props} accept=".jpg, .jpeg, .png">
                  <Paper
                    elevation={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      height: window.innerWidth > 1900 ? "268px" : "267px",
                      // width: window.innerWidth > 1900 ? "300px" : "231px",
                      mt: window.innerWidth > 1900 ? "20px" : "27px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "2px dashed #ccc",
                      boxShadow: "none",
                      width: "auto",
                      // height: "38vh",
                    }}
                  >
                    <Typography variant="p">Add Company Logo </Typography>
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
              </div>
            </div>
          </div>
          {/* <div style={{ display: "flex", width: "auto" }}>
                <TextField
                  id="city"
                  label="City"
                  placeholder="City"
                  sx={{ width: "20.8vw", margin: "48px 19px 32px 0px" }}
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
                  sx={{ width: "20.4vw", margin: "48px 19px 32px 0px" }}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  // autoComplete="current"
                />
                {formik.touched.state && formik.errors.state ? (
                  <MuiAlert severity="error" sx={{ width: "25%" }}>
                    <p>{formik.errors.state}</p>
                  </MuiAlert>
                ) : null}
              </div> */}
          {/* </div> */}
          {/* <div
              className="img"
              style={{
                display: "flex",
                height: "fit-content",
                width: "334px",
                position: "relative",
                flexDirection: "column",
                top: "4px",
              }}
            >
              <Upload {...props} accept=".jpg, .jpeg, .png">
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
                    // width: "17vw",
                    // height: "38vh",
                  }}
                >
                  <Typography variant="p">Add Company Logo </Typography>
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
              <ZipCodeInput
                value={formik.values.zip_code}
                onChange={formik.handleChange}
              >
                {() => (
                  <TextField
                    id="zip_code"
                    label="Zip code"
                    required
                    sx={{ marginTop: "94px", width: "17vw" }}
                    placeholder="E.g 20001 (Washington DC)"

                    // type=""
                    // autoComplete="current"
                  />
                )}
              </ZipCodeInput>
              {formik.touched.zip_code && formik.errors.zip_code ? (
                <MuiAlert severity="error" sx={{ width: "25%" }}>
                  <p>{formik.errors.zip_code}</p>
                </MuiAlert>
              ) : null}
            </div> */}
          {/* </div> */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <TextField
              id="city"
              label="City"
              placeholder="City"
              sx={{ width: "auto", margin: "0px 10px 0px 0px" }}
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
              sx={{ width: "auto", margin: "0px 10px 0px 0px" }}
              value={formik.values.state}
              onChange={formik.handleChange}
              // autoComplete="current"
            />
            {formik.touched.state && formik.errors.state ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <p>{formik.errors.state}</p>
              </MuiAlert>
            ) : null}

            <ZipCodeInput
              value={formik.values.zip_code}
              onChange={formik.handleChange}
            >
              {() => (
                <TextField
                  id="zip_code"
                  label="Zip code"
                  required
                  sx={{ width: "auto" }}
                  placeholder="E.g 20001 (Washington DC)"

                  // type=""
                  // autoComplete="current"
                />
              )}
            </ZipCodeInput>
            {formik.touched.zip_code && formik.errors.zip_code ? (
              <MuiAlert severity="error" sx={{ width: "25%" }}>
                <p>{formik.errors.zip_code}</p>
              </MuiAlert>
            ) : null}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              margin: "25px 0px",
            }}
          >
            <PhoneInput
              value={formik.values.phone}
              onChange={formik.handleChange}
            >
              {() => (
                <TextField
                  id="phone"
                  name="phone"
                  label="Enter phone number"
                  required
                  placeholder="E.g 121-532-2545"
                  type="tel"
                  error={Boolean(formik.touched.mobile && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  sx={{ width: "auto", margin: "0px 17px 0px 0px" }}
                />
              )}
            </PhoneInput>
            <TextField
              id="email"
              label="Enter email address"
              placeholder="Enter email address"
              type="email"
              required
              sx={{ width: "auto", margin: "0px 5px" }}
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
            <LoadingButton
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                marginRight: "10px",
                padding: "10px 16px",
                background: "rgba(17, 17, 17, 0.04)",
                border: "1px solid #676879",
                color: "#676879",
              }}
              color="primary"
              onClick={() => handleClose(false)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{ textTransform: "capitalize", padding: "10px 16px" }}
              type="submit"
            >
              Save changes
            </LoadingButton>
          </div>
        </form>
      </ThemeProvider>
    </>
  );
}

export default EditCompanyfrom;
