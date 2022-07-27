import React, { useState } from "react";
import { Upload, message } from "antd";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardContent,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import addLogoImage from "../../assets/images/iconadd.png";
import AddRoomCard from "./AddRoomCard";
import Chip from "@mui/material/Chip";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import PhoneInput from "../../common/phoneNumber";
import { toast } from "react-toastify";
import clarityimageline from "../../assets/images/clarity_image-line.png";

import { useFormik } from "formik";
import * as Yup from "yup";
import Location from "../../models/Locations/Location";
import "./AddLocationForm.css";

const AddRoomForm = ({ handleClose }) => {
  const [image, setImage] = useState();

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
      setImage(file);
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImage(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      base_price: "",
      max_guests: "",
      spaces: [],
      amenities: [],
      ceremony_types: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Room Name is required"),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("base_price", values.base_price);
      formData.append("max_guests", values.max_guests);
      if (image) {
        formData.append("image", image ? image : new File([], ""));
      }
      let data = [];
      data.push(formData);
      localStorage.setItem("rooms", [formData]);
      handleClose();
    },
  });

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
                error={Boolean(
                  formik.touched.base_price && formik.errors.base_price
                )}
                helperText={
                  formik.touched.base_price && formik.errors.base_price
                }
              />
              <TextField
                name="max_guests"
                label="Max. no. of Guests"
                onChange={formik.handleChange}
                value={formik.values.max_guests}
                error={Boolean(
                  formik.touched.max_guests && formik.errors.max_guests
                )}
                helperText={
                  formik.touched.max_guests && formik.errors.max_guests
                }
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
          <Button type="submit" fullWidth>
            Add Room
          </Button>
        </Box>
        <Box>
          <Button fullWidth>Cancel</Button>
        </Box>
      </form>
    </>
  );
};

const AddLocationForm = ({ company, handleClose, popUp }) => {
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [copyIsChecked, setCopyIsChecked] = useState();
  const innerWidth = window.innerWidth;

  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  const leftInputWidth = innerWidth > 1900 ? "98ch" : "70ch";

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
      console.log("Dropped files", e.dataTransfer.files);
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
    validator: () => {},
    onSubmit: (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("address_line1", values.address_line1);
      formData.append("address_line2", values.address_line2);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("zip_code", values.zip_code);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      if (file) {
        formData.append("image", file ? file : new File([], ""));
      }
      Location.CreateLocation(formData)
        .then((result) => {
          console.log("result", result);
          setLoading(false);

          formik.handleReset();
          popUp(result.message);

          handleClose();
        })
        .catch((e) => {
          console.log("E", e.response.data.message);
          setLoading(false);
          formik.setSubmitting(false);
        });
      // sendChildToParent(formValues);
    },
  });

  const handleCheckBox = (event) => {
    setCopyIsChecked(event.target.checked);
    if (event.target.checked && company) {
      formik.values.address_line1 = company.address_line1;
      formik.values.address_line2 = company.address_line2;
      formik.values.city = company.city;
      formik.values.state = company.state;
      formik.values.zip_code = company.zip_code;
      formik.values.phone = company.phone;
      formik.values.email = company.email;
    } else {
      formik.values.address_line1 = "";
      formik.values.address_line2 = "";
      formik.values.city = "";
      formik.values.state = "";
      formik.values.zip_code = "";
      formik.values.phone = "";
      formik.values.email = "";
    }
  };

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
            control={
              <Checkbox onChange={handleCheckBox} checked={copyIsChecked} />
            }
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
                    style={{ width: "-webkit-fill-available" }}
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
                  style={{ width: "-webkit-fill-available" }}
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

                <div style={{ display: "flex" }}>
                  <TextField
                    id="city"
                    label="City*"
                    type="text"
                    value={formik.values.city}
                    error={Boolean(formik.touched.city && formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    onChange={formik.handleChange}
                    sx={{ marginLeft: "20px", width: "-webkit-fill-available" }}
                    // autoComplete="current"
                  />
                  <TextField
                    id="state"
                    label="State*"
                    type="text"
                    style={{ width: "-webkit-fill-available" }}
                    value={formik.values.state}
                    error={Boolean(formik.touched.state && formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                </div>
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
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
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
        {/* <h2 style={{ marginTop: "10px" }}>Add Room(s)</h2>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", mt: 5 }}
        >
          <Card sx={{ maxWidth: 345, p: 1, m: 1, height: "295px" }}>
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
          <div
            className={`add-room-tab ${active1 ? "packages-nav-active" : ""}  `}
            onClick={() => {
              setActive1(true);
              setActive2(false);
              setActive3(false);
            }}
          >
            Define Space{" "}
          </div>
          <div
            className={`add-room-tab ${active2 ? "packages-nav-active" : ""}  `}
            onClick={() => {
              setActive1(false);
              setActive2(true);
              setActive3(false);
            }}
          >
            Define
          </div>
          <div
            className={`add-room-tab ${active1 ? "packages-nav-active" : ""}  `}
            onClick={() => {
              setActive1(false);
              setActive2(false);
              setActive3(true);
            }}
            className="add-room-tab"
          >
            Define
          </div>
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
          <Button variant="outlined" onClick={() => handleClose()}>
            cancel
          </Button>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Save changes
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
};

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
