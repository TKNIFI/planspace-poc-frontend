import React, { useState } from "react";
import { Upload, message } from "antd";
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Button, Paper, Grid, Box, Card, CardActions, CardHeader, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import clarityimageline from "../../assets/images/clarity_image-line.png";
import addLogoImage from "../../assets/images/iconadd.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import Location from "../../models/Locations/Location";


const AddRoomForm = ({ handleClose }) => {
  const [image, setImage] = useState()

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  const props = {
    name: 'file',
    multiple: false,
    customRequest: dummyRequest,

    beforeUpload(file, fileList) {
      setImage(file)
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImage(info.file.originFileObj)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      base_price: "",
      max_guests: "",
      spaces: [],
      amenities: [],
      ceremony_types: []
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Room Name is required")
    }),
    onSubmit: (values) => {
      let formData = new FormData()
      formData.append("name", values.name)
      formData.append("base_price", values.base_price)
      formData.append("max_guests", values.max_guests)
      if (image) {
        formData.append("image", image ? image : new File([], ""))
      }
      let data = []
      data.push(formData)
      localStorage.setItem("rooms", [formData])
      handleClose()
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  marginTop: 3,
                },
              }}
            >
              <div>
                <TextField
                  name="name"
                  label="Room Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
              <TextField
                name="base_price"
                label="Base Price"
                onChange={formik.handleChange}
                value={formik.values.base_price}
                error={Boolean(formik.touched.base_price && formik.errors.base_price)}
                helperText={formik.touched.base_price && formik.errors.base_price}
              />
              <TextField
                name="max_guests"
                label="Max. no. of Guests"
                onChange={formik.handleChange}
                value={formik.values.max_guests}
                error={Boolean(formik.touched.max_guests && formik.errors.max_guests)}
                helperText={formik.touched.max_guests && formik.errors.max_guests}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Upload {...props}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
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
          </Grid>
        </Grid>
        <Box>
          <Button type="submit" fullWidth>Add Room</Button>
        </Box>
        <Box>
          <Button fullWidth>Cancel</Button>
        </Box>
      </form>
    </>
  )
}


const AddLocationForm = ({ company, handleClose, popUp }) => {
  const [openAddRoom, setOpenAddRoom] = useState(false)
  const [copyIsChecked, setCopyIsChecked] = useState();
  const innerWidth = window.innerWidth;
  const leftInputWidth = innerWidth > 1900 ? "98ch" : "70ch";

  const [file, setFile] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  const props = {
    name: 'file',
    multiple: false,
    customRequest: dummyRequest,

    beforeUpload(file, fileList) {
      setFile(file)
    },
    onChange(info) {
      const { status } = info.file;

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.file.originFileObj)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
      email: "",
      logo: "",
    },
    validationSchema: Yup.object({
      // owner: Yup.string().required("owner is required"),
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Location Name is required"),
      address_line1: Yup.string().required("Address is required"),
      address_line2: Yup.string().required("Address is required"),
      city: Yup.string().required("City name is required"),
      state: Yup.string().required("State name is required"),
      zip_code: Yup.number()
        .required("Zip code is required")
        .positive()
        .integer(),
      phone: Yup.number()
        .required("Phone number is required")
        .positive()
        .integer(),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      setLoading(true)
      let formData = new FormData();
      formData.append("name", values.name)
      formData.append("address_line1", values.address_line1)
      formData.append("address_line2", values.address_line2)
      formData.append("city", values.city)
      formData.append("state", values.state)
      formData.append("zip_code", values.zip_code)
      formData.append("phone", values.phone)
      formData.append("email", values.email)
      if (file) {
        formData.append("image", file ? file : new File([], ""))
      }
      Location.CreateLocation(formData)
        .then((result) => {
          console.log("result", result)
          setLoading(false)
          popUp(result.message)
          handleClose();
        })
        .catch((e) => {
          console.log("E", e.response.data.message)
          setLoading(false)
          formik.setSubmitting(false)
        });
      // sendChildToParent(formValues);
    },
  });

  const handleCheckBox = (event) => {
    setCopyIsChecked(event.target.checked)
    if (event.target.checked && company) {
      formik.values.address_line1 = company.address_line1
      formik.values.address_line2 = company.address_line2
      formik.values.city = company.city
      formik.values.state = company.state
      formik.values.zip_code = company.zip_code
      formik.values.phone = company.phone
      formik.values.email = company.email
    } else {
      formik.values.address_line1 = ""
      formik.values.address_line2 = ""
      formik.values.city = ""
      formik.values.state = ""
      formik.values.zip_code = ""
      formik.values.phone = ""
      formik.values.email = ""
    }
  }

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
            control={<Checkbox onChange={handleCheckBox} checked={copyIsChecked} />}
            label="Copy address & contacts from company profile"
          />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: leftInputWidth,
                    marginTop: 3,
                  },
                }}
              >
                <div>
                  <TextField
                    id="name"
                    name="name"
                    label="Enter the location name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  // autoComplete="current"
                  />
                </div>

                <TextField
                  id="address_line1"
                  name="address_line1"
                  label="Address line"
                  type="text"
                  value={formik.values.address_line1}
                  error={Boolean(
                    formik.touched.address_line1 && formik.errors.address_line1
                  )}
                  helperText={
                    formik.touched.address_line1 && formik.errors.address_line1
                  }
                  onChange={formik.handleChange}
                // autoComplete="current"
                />
                <Grid item xs={12}>
                  <Box
                    sx={{
                      "& .MuiTextField-root": { width: "50ch" },
                    }}
                  >
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TextField
                        id="city"
                        label="City*"
                        type="text"
                        value={formik.values.city}
                        error={Boolean(formik.touched.city && formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        onChange={formik.handleChange}
                        sx={{ marginLeft: "20px" }}
                      // autoComplete="current"
                      />
                      <TextField
                        id="state"
                        label="State*"
                        type="text"
                        value={formik.values.state}
                        error={Boolean(formik.touched.state && formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                        onChange={formik.handleChange}
                      // autoComplete="current"
                      />
                    </Stack>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Upload {...props}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    height: innerWidth > 1900 ? "250px" : "220px",
                    width: innerWidth > 1900 ? "300px" : "231px",
                    mt: innerWidth > 1900 ? "20px" : "27px",
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
            </Grid>
            <br />
            <Grid item xs={12}>
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    width: innerWidth > 1900 ? "45ch" : "30ch",
                  },
                }}
              >
                <Stack
                  spacing={7}
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
                    id="zip_code"
                    label="Zip code*"
                    type="number"
                    value={formik.values.zip_code}
                    error={Boolean(
                      formik.touched.zip_code && formik.errors.zip_code
                    )}
                    helperText={
                      formik.touched.zip_code && formik.errors.zip_code
                    }
                    onChange={formik.handleChange}
                  // autoComplete="current"
                  />
                  <TextField
                    id="phone"
                    label="Enter phone number"
                    type="tel"
                    value={formik.values.phone}
                    error={Boolean(
                      formik.touched.phone && formik.errors.phone
                    )}
                    helperText={
                      formik.touched.phone && formik.errors.phone
                    }
                    onChange={formik.handleChange}
                    sx={{ marginLeft: "20px" }}
                  // autoComplete="current"
                  />
                  <TextField
                    id="email"
                    label="Enter email address"
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
          </Grid>
        </Box>
        {/* <h2 style={{marginTop: "10px"}}>Add Room(s)</h2> */}
          {/* <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', mt: 5 }}> */}
            {/* <Card
              sx={{ maxWidth: 345, p: 1, m: 1, height: "295px" }}
            >
              <Button
                style={{
                  height: "300px",
                  color: "gray",
                  border: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  marginLeft: "100px",
                }}
                icon={<img src={addLogoImage} />}
                onClick={() => setOpenAddRoom(true)}
              >
                <Typography style={{ marginTop: "12px" }}>Add Room</Typography>
              </Button>
            </Card> */}
            {/* {locations.map((location) => (
              <Card
                sx={{ maxWidth: 345, p: 1, m: 1, height: "300px", border: "3px solid #66a4e5", borderRadius: "5px" }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={location.image ? location.image : LocationImage}
                  src={location.image ? location.image : LocationImage}
                />
                <CardContent>
                  <h2 variant="h2" style={{ color: "#003399", marginBottom: 0 }}><strong>{location.name}</strong></h2>
                  <Typography variant="body" color="text.secondary">
                    {location.address_line1} {location.address_line2} {location.zip_code.zip_code}
                  </Typography>
                  <Box style={{ marginTop: "10px" }}>
                    {location.rooms.map((room) => (
                      <Button
                        onClick={() => console.log()}
                        style={{ border: "3px solid #66a4e5", borderRadius: "5px" }}
                      > {room.name} </Button>
                    ))}
                  </Box>
                </CardContent>
                <CardActions disableSpacing>
                </CardActions>
              </Card>
            ))} */}
          {/* </Box> */}
         {/* {openAddRoom ? <AddRoomForm /> : ""} */}
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
          <Button variant="outlined" onClick={() => handleClose()}>cancel</Button>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Save changes
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
};

export default AddLocationForm;
