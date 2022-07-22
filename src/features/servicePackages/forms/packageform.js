//import "./packageForm.css";
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

const PackagesForm = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [copyIsChecked, setCopyIsChecked] = useState();
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const { Option, OptGroup } = Select;
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      room: "",
      duration_minutes: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Package Name is required"),
      price: Yup.string().required("Package Price is required"),
      room: Yup.string().required("Room is required"),
      date_time: Yup.string().required("Package date and time is required"),
      duration_minutes: Yup.string().required("Package duration is required"),
    }),
    onSubmit: (values) => {
      const formValues = values;

      console.log("form values => ", values);
      // Location.CreateLocation(formValues);
    },
  });

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  return (
    <>
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
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    formik.setFieldValue("description", data);

                    console.log({ event, editor, data });
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
                accept="image"
                type="file"
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

                  <RoomSelect formik={formik} />
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
                      renderInput={(params) => <TextField {...params} />}
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
            {/* <Grid item xs={12} sx={{ ml: "5px" }}>
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
                  getOptionLabel={(option) => option.title}
                  //defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                  renderInput={(params) => (
                    <TextField {...params} label="Search and add" />
                  )}
                />
              </Box>
            </Grid> */}
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
