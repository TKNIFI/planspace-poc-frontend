import React from "react";
import { Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button as Muibtn } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import * as Yup from "yup";
import myApi from '../../network/axios'

const EditMemberForm = ({ editRecordValues, handleClose, callBack }) => {
  const formik = useFormik({
    initialValues: {
      name: editRecordValues?.first_name ? editRecordValues?.first_name : "" + " " + editRecordValues?.last_name ? editRecordValues?.last_name : "",
      userId: editRecordValues?.email,
      email: editRecordValues?.email,
      mobile: editRecordValues?.mobile,
      address: editRecordValues?.address,
    },
    validationSchema: Yup.object({
      // owner: Yup.string().required("owner is required"),
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Name is required"),
      userId: Yup.string().required("user id is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.number()
        .required("Phone number is required")
        .positive()
        .integer(),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        let formData = new FormData()
        let name = values.name.split(" ")
        formData.append("first_name", name[0])
        if (name.length > 1) {
          formData.append("last_name", name[1])
        }
        formData.append("email", values.email)
        formData.append("address", values.address)
        formData.append("mobile", values.mobile)
        await myApi.put(`api/auth/user/${editRecordValues?.id}/`, formData)
        handleClose(false)
        callBack()
      } catch (error) {
        handleClose(true)
        helpers.setErrors({ submit: error.data.message })
        helpers.setSubmitting(false)
      }

    },
  });

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
                onChange={formik.handleChange}
                error={Boolean(
                  formik.touched.name && formik.errors.name
                )}
                helperText={
                  formik.touched.name && formik.errors.name
                }
              // autoComplete="current"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="userId"
                label="User ID"
                type="text"
                value={formik.values.userId}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.touched.userId && formik.errors.userId
                )}
                helperText={
                  formik.touched.userId && formik.errors.userId
                }
              // autoComplete="current"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.touched.email && formik.errors.email
                )}
                helperText={
                  formik.touched.email && formik.errors.email
                }
              // autoComplete="current"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="mobile"
                label="Phone Number"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.touched.mobile && formik.errors.mobile
                )}
                helperText={
                  formik.touched.mobile && formik.errors.mobile
                }
              // autoComplete="current"
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
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.address && formik.errors.address
                  )}
                  helperText={
                    formik.touched.address && formik.errors.address
                  }
                // autoComplete="current"
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

              <Muibtn
                variant="contained"
                type="submit"
              >
                Submit
              </Muibtn>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default EditMemberForm;