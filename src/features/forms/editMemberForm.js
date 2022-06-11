import React from "react";
import { Grid, Box } from "@mui/material";
import { TextField } from '@mui/material';
import { Button as Muibtn } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import * as Yup from "yup";
import myApi from "../../network/axios";

const EditMemberForm = ({ editRecordValues, handleClose, callBack, popUp }) => {
  console.log("editRecordValues", editRecordValues)
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editRecordValues?.first_name,
      userId: editRecordValues?.id,
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
        setLoading(true);
        let formData = new FormData();
        let name = values.name.split(" ");
        formData.append("first_name", name[0]);
        if (name.length > 1) {
          formData.append("last_name", name[1]);
        }
        formData.append("email", values.email);
        formData.append("address", values.address);
        formData.append("mobile", values.mobile);
        // values.name = "";
        // values.email = "";
        // values.address = "";
        // values.mobile = 0;
        // values.userId = "";

        await myApi
          .put(`api/auth/user/${editRecordValues?.id}/`, formData)
          .then((result) => {
            setLoading(false);
            popUp(result.data.message);
            handleClose(false);
            callBack();
          });
      } catch (error) {
        setLoading(false);
        console.log("err", error);
        helpers.setErrors({ submit: error.response.data.message });
        helpers.setSubmitting(false);
        handleClose(true);
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
                name="name"
                label="Name"
                value={formik.values.name}
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onChange={formik.handleChange}
                autoFocus={true}
                readOnly={true}
                // autoComplete="current"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="userId"
                label="User ID"
                value={formik.values.userId}
                error={Boolean(formik.touched.userId && formik.errors.userId)}
                helperText={formik.touched.userId && formik.errors.userId}
                onChange={formik.handleChange}
                readOnly={true}
                // autoComplete="current"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                label="Email"
                value={formik.values.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                readOnly={true}
                // autoComplete="current"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="mobile"
                label="Phone Number"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                readOnly={true}
                // autoComplete="current"
              />
            </Grid>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  width: "125ch",
                  marginTop: 3,
                  marginLeft: 0.7,
                },
              }}
            >
              <Grid item xs={8}>
                <TextField
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  error={Boolean(
                    formik.touched.address && formik.errors.address
                  )}
                  helperText={formik.touched.address && formik.errors.address}
                  onChange={formik.handleChange}
                  readOnly={true}
                  // autoComplete="current"
                />
              </Grid>
            </Box>
          </Grid>
          {formik.errors.submit && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <MuiAlert severity="error" style={{ fontSize: 16 }}>
                {formik.errors.submit}
              </MuiAlert>
            </Box>
          )}
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
              <Muibtn
                variant="outlined"
                type="reset"
                onClick={() => {
                  handleClose(false);
                  // formik.values.name = "";
                  // formik.values.email = "";
                  // formik.values.address = "";
                  // formik.values.mobile = 0;
                  // formik.values.userId = "";
                }}
              >
                Cancel
              </Muibtn>
              <div>
                <Muibtn variant="contained" type="submit" disabled={loading}>
                  Submit
                </Muibtn>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </div>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default EditMemberForm;
