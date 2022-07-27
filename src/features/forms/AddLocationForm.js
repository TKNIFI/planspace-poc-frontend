import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { Button, Drawer, Skeleton, Space } from "antd";
import { styled } from "@mui/material/styles";
import { Paper, Grid } from "@mui/material";
import { Upload, message } from "antd";
import clarityimageline from "../../assets/images/clarity_image-line.png";
import MuiAlert from "@mui/material/Alert";
import { Card } from "@mui/material";
import AddRoomCard from "./AddRoomCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import addLogoImage from "../../assets/images/iconadd.png";

import {
  Badge,
  Stack,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
} from "@mui/material";
import "./AddLocationForm.css";
import myApi from "../../network/axios";
import PhoneInput from "../../common/phoneNumber";
import ZipCodeInput from "../../common/zipcodeInput";

const Input = styled("input")({
  display: "none",
});

const ButtonStyle = {
  backgroundColor: "#FFFFFF",
  color: "lightslategray",
  p: 2,
  textTransform: "capitalize",
};
const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

function AddLocationForm({ defaultValues, handleClose, callBack, popUp }) {
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
                  label="Enter the Location Name"
                  placeholder="Enter the Location name"
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
                  label="Address line "
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
                        label="City"
                        placeholder="E.g 121-532-2545"
                        type="text"
                        error={Boolean(
                          formik.touched.mobile && formik.errors.phone
                        )}
                        helperText={formik.touched.phone && formik.errors.phone}
                        sx={{ width: "auto", margin: "0px 17px 0px 0px" }}
                      />
                    )}
                  </PhoneInput>
                  <TextField
                    id="email"
                    label="State"
                    placeholder="state"
                    type="text"
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
              label="Zip Code"
              placeholder="Zip code"
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
              label="Enter Phone Number"
              placeholder="Enter Phone Number"
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
                  label="Enter Email Address"
                  sx={{ width: "auto" }}
                  placeholder="E.g 20001 (Washington DC)"
                  type="email"
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

          <div className="heading">Add Room(s)</div>

          <div className="rooms">
            <div style={{ display: "flex", width: "236px" }}>
              <Button
                style={{
                  height: "230px",
                  color: "gray",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "214px",
                  justifyContent: "center",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
                icon={<img src={addLogoImage} />}
                // onClick={handleClickOpen}
              >
                <Typography style={{ marginTop: "12px" }}>Add Room</Typography>
              </Button>
            </div>

            <AddRoomCard />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: " 1fr 200px" }}>
            <div>
              {" "}
              <TextField
                id="name"
                label="Room Name"
                placeholder="Room Name"
                type="text"
                required
                sx={{
                  width: "-webkit-fill-available",
                  margin: "28px 9px 0px 0px",
                }}
                value={formik.values.name}
                onChange={formik.handleChange}
                // autoComplete="current"
              />
              {formik.touched.name && formik.errors.name ? (
                <MuiAlert severity="error" sx={{ width: "25%" }}>
                  <p>{formik.errors.name}</p>
                </MuiAlert>
              ) : null}
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
                      label="Base Price"
                      placeholder="E.g 121-532-2545"
                      type="tel"
                      error={Boolean(
                        formik.touched.mobile && formik.errors.phone
                      )}
                      helperText={formik.touched.phone && formik.errors.phone}
                      sx={{ width: "auto", margin: "0px 17px 0px 0px" }}
                    />
                  )}
                </PhoneInput>
                <TextField
                  id="email"
                  label="Number of Guests"
                  placeholder="Enter email address"
                  type="text"
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
            </div>
            <div>
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
                    height: "150px",
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

          <div style={{ display: "flex", gap: "3px" }}>
            <div className="add-room-tab packages-nav-active">
              Define Space{" "}
            </div>
            <div className="add-room-tab">Define</div>
            <div className="add-room-tab">Define</div>
          </div>

          <div className="tab-div">
            <p>Describe what kind of space you are offering </p>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              defaultValue={[top100Films[13]]}
              filterSelectedOptions
              style={{ width: "-webkit-fill-available" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "-webkit-fill-available" }}
                  label="filterSelectedOptions"
                  placeholder="Favorites"
                />
              )}
            />
          </div>

          <button className="add-room-btn-room">Add Room</button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
export default AddLocationForm;
