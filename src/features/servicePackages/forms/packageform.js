//import "./packageForm.css";
import React, { useState, useEffect } from "react";
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
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import RoomSelect from "./RoomSelect";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import clarityimageline from "../../../assets/images/clarity_image-line.png";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Select } from "antd";
import * as Yup from "yup";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PackageAddedModal from "./PackageAddedModal";
import axios from "axios";
import myApi from "../../../network/axios";
const PackagesForm = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [copyIsChecked, setCopyIsChecked] = useState();

  async function sendData(obj) {
    await myApi
      .post(`${process.env.REACT_APP_BASE_URL}api/company/package/`, obj)
      .then((response) => {
        console.log("send data resp ", response);
        // toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response.data.message);
      });
  }

  const defaultValues = {
    name: "",
    price: 0,
    active: false,
    description: "",
    image: "",
    room: "",
    date_time: "",
    addons: [],
    duration_minutes: 0,
  };
  const [submitData, setSubmitData] = useState(defaultValues);
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [addOn, setAddOn] = React.useState([]);
  const { Option, OptGroup } = Select;
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      duration_minutes: "",
      logo_url: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Package Name is required"),
      price: Yup.string().required("Package Price is required"),
      duration_minutes: Yup.string().required("Package duration is required"),
    }),
    onSubmit: (values) => {
      const formValues = values;

      console.log("form values => ", values, date);
      // Location.CreateLocation(formValues);
      console.log("description => ", description);

      setSubmitData({
        name: values.name,
        price: parseInt(values.price),
        active: false,
        description: description,
        image: "",
        room: roomSelected.id,
        date_time: date,
        addons: addOn,
        duration_minutes: parseInt(values.duration_minutes),
      });

      sendData(submitData);
    },
  });
  const [description, setDescription] = useState("");
  const [roomSelected, setRoomSelected] = useState({});

  useEffect(() => {
    setDescription(description);
  }, [description]);

  return (
    <>
      {console.log("add on", addOn)}
      {console.log(" data =>", submitData)}
      <PackageAddedModal
        data={"hello world"}
        title={"package"}
        setModal1Visible={setModal1Visible}
        modal1Visible={modal1Visible}
      />
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
            <Grid item style={{ paddingLeft: "0" }} xs={8}>
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "-webkit-fill-available",
                    marginTop: 3,
                  },
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
                />

                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Hello from CKEditor 5!</p>"
                  style={{ height: "125px" }}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setDescription(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Upload
                id="image"
                accept=".jpg, .jpeg, .png"
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
                    width: "-webkit-fill-available",
                    mt: "27px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="p">Add Package Image </Typography>
                  <img
                    src={clarityimageline}
                    style={{ width: "auto", height: "auto" }}
                  />
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
            <Grid style={{ paddingLeft: "7px" }} item xs={12}>
              <Box
                sx={{
                  "& .MuiTextField-root": { width: "31.5ch" },
                }}
              >
                <Stack
                  spacing={5}
                  direction="row"
                  sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  <TextField
                    id="price"
                    label="Package Price"
                    type="text"
                    style={{ width: "-webkit-fill-available" }}
                    value={formik.values.price}
                    error={Boolean(formik.touched.price && formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                  {/* <TextField
                    id="room"
                    label="Select Room"
                    type="text"
                    style={{
                      width: "-webkit-fill-available",
                      marginLeft: "15px",
                    }}
                    value={formik.values.room}
                    error={Boolean(formik.touched.room && formik.errors.room)}
                    helperText={formik.touched.room && formik.errors.room}
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  /> */}

                  <RoomSelect
                    formik={formik}
                    setRoomSelected={setRoomSelected}
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid style={{ paddingLeft: "7px" }} item xs={12}>
              <Box
                sx={{
                  "& .MuiTextField-root": { width: "50ch" },
                }}
              >
                <Stack
                  spacing={5}
                  direction="row"
                  sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  {/* <TextField
                    id="date_time"
                    label="Date and Time"
                    type="datetime"
                    style={{ width: "-webkit-fill-available" }}
                    value={formik.values.date_time}
                    error={Boolean(
                      formik.touched.date_time && formik.errors.date_time
                    )}
                    helperText={
                      formik.touched.date_time && formik.errors.date_time
                    }
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                  */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Date&Time picker"
                      value={date}
                      onChange={(date) => setDate(date)}
                      renderInput={(params) => (
                        <TextField
                          style={{ width: "auto", background: "#F4F6F9" }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <TextField
                    id="duration_minutes"
                    label="Package Duration"
                    style={{
                      width: "-webkit-fill-available",
                      marginLeft: "15px",
                    }}
                    type="text"
                    value={formik.values.duration_minutes}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.duration_minutes &&
                        formik.errors.duration_minutes
                    )}
                    helperText={
                      formik.touched.duration_minutes &&
                      formik.errors.duration_minutes
                    }
                    // autoComplete="current"
                  />{" "}
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
                  "& .MuiTextField-root": { width: "100%" },
                  ml: "100",
                }}
              >
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={top100Films}
                  onChange={(event, values) => {
                    console.log("values in add on", values);
                    setAddOn(values);
                  }}
                  getOptionLabel={(option) => option.title}
                  //defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ background: "#F4F6F9" }}
                      label="Search and add"
                    />
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
            <Button
              variant="outlined"
              type="submit"
              onClick={() => setModal1Visible(true)}
              sx={{ textTransform: "capitalize" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              // type="submit"
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
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

export default PackagesForm;
