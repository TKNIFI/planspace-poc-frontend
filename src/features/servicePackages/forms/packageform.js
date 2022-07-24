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
import "draft-js/dist/Draft.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import clarityimageline from "../../../assets/images/clarity_image-line.png";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Select } from "antd";
import * as Yup from "yup";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PackageAddedModal from "./PackageAddedModal";
import myApi from "../../../network/axios";

const PackagesForm = (prop) => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [addOnList, setaddOnList] = useState([]);

  async function getAddOnData() {
    await myApi
      .get(`${process.env.REACT_APP_BASE_URL}api/company/addon/`)
      .then((response) => {
        console.log("getaddon ", response.data.results);
        setaddOnList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [rooms, setRooms] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      room: "",
      duration_minutes: "",
      addons: [],
      logo: new File([], ""),
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required("Package Name is required"),
    //   price: Yup.string().required("Package Price is required"),
    //   duration_minutes: Yup.string().required("Package duration is required"),
    //   room: Yup.string(),
    //   addons: Yup.array(),
    //   logo: Yup.object(),
    // }),

    validator: () => ({}),
    onSubmit: async (values) => {
      let VarDate = new Date(date);

      let newDate = `${VarDate.getFullYear()}-${VarDate.getMonth()}-${VarDate.getDate()} ${VarDate.getHours()}:${VarDate.getMinutes()}:${VarDate.getSeconds()}`;

      try {
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", parseInt(values.price));
        formData.append("active", cardActive);
        formData.append("description", description);
        if (values.room) {
          formData.append("room", values.room.id);
        }
        formData.append("date_time", newDate);
        let addons = [];
        values.addons.map((addon) => addons.push(addon.id));
        formData.append("addons", JSON.stringify(addons));
        formData.append("duration_minutes", parseInt(values.duration_minutes));
        if (file) {
          formData.append("logo", file ? file : new File([], ""));
        }
        await myApi.post(`api/company/package/`, formData).then((result) => {
          setLoading(false);
          // handleClose(false);
          // callBack();
          console.log("resp => ", result);
          prop.getPackages();
          // popUp(result.response.data.message);
          setFile(null);
        });
      } catch (error) {
        console.log(error.response.data.message);
        formik.setSubmitting(false);
        setLoading(false);
      }
    },
  });
  const [description, setDescription] = useState("");
  const [file, setFile] = React.useState(null);
  const [cardActive, setCardActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const getRooms = async () => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}api/company/room/`;
      await myApi.get(url).then((result) => {
        console.log("rooms=> ", result.data.results);
        setRooms(result.data.results);
      });
    } catch (error) {
      //   setLoading(false);
      // alert(error?.data?.message);
    }
  };

  useEffect(() => {
    setDescription(description);
  }, [description]);

  useEffect(() => {
    getAddOnData();
    getRooms();
  }, []);

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
        // message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.file.originFileObj);
      } else if (status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e);
    },
  };

  return (
    <>
      <PackageAddedModal
        data={`The ${formik.values.name} Added successfully`}
        title={"Add new Package"}
        setModal1Visible={setModal1Visible}
        modal1Visible={modal1Visible}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { width: "50ch" },
          }}
        >
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
                  data=""
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
                    inputFormat={"dd-mmm-yyyy hh:mm"}
                    error={Boolean(formik.touched.price && formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                  <Autocomplete
                    disablePortal
                    id="room"
                    name="room"
                    options={rooms}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      formik.values.room = value;
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    sx={{ width: "-webkit-fill-available" }}
                    renderInput={(params) => (
                      <TextField
                        style={{
                          width: "-webkit-fill-available",
                          background: "#F4F6F9",
                          marginLeft: "-24px",
                        }}
                        {...params}
                        label="Select Room"
                      />
                    )}
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          style={{
                            width: "-webkit-fill-available",
                            background: "#F4F6F9",
                          }}
                          {...props}
                        />
                      )}
                      label="DateTimePicker"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
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
                  id="addons"
                  options={addOnList}
                  onChange={(event, values) => {
                    console.log("value", values);
                    formik.values.addons = values;
                    // setAddOn(values);
                  }}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
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
              onClick={() => {
                setModal1Visible(true);
                setCardActive(false);
              }}
              sx={{ textTransform: "capitalize" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                setModal1Visible(true);
                setCardActive(true);
              }}
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

const top100Films = [1, 2, 3];

export default PackagesForm;
