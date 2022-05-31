import React from "react";
import { Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button as Muibtn } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import * as Yup from "yup";
import myApi from "../../network/axios";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const AddMemberForm = ({ editRecordValues, formValues, handleClose }) => {
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
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values, helpers) => {
      await myApi.post("api/auth/user/", values);
    },
  });
  console.log(editRecordValues);
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
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onChange={formik.handleChange}
                autoFocus="true"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="userId"
                label="User ID"
                type="text"
                value={formik.values.userId}
                error={Boolean(formik.touched.userId && formik.errors.userId)}
                helperText={formik.touched.userId && formik.errors.userId}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email"
                type="text"
                value={formik.values.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phone"
                label="Phone Number"
                type="text"
                value={formik.values.phone}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                onChange={formik.handleChange}
           
              />
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
                  error={Boolean(
                    formik.touched.address && formik.errors.address
                  )}
                  helperText={formik.touched.address && formik.errors.address}
                  onChange={formik.handleChange}
                />
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
            <Stack
              spacing={2}
              direction="row"
              sx={{ marginTop: 10, marginLeft: 50 }}
            >
              <Muibtn variant="outlined" onClick={() => handleClose(false)}>
                Cancel
              </Muibtn>
              {formik.values.name &&
              formik.values.userId &&
              formik.values.email &&
              formik.values.phone &&
              formik.errors.address !== "" ? (
                <Muibtn
                  variant="contained"
                  onClick={() => handleClose(false)}
                  type="submit"
                >
                  Submit
                </Muibtn>
              ) : (
                <Muibtn variant="contained" type="submit">
                  Submit
                </Muibtn>
              )}
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddMemberForm;
