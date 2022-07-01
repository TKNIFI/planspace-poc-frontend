import React, { useState } from "react";
import { Upload } from "antd";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button as Muibtn, Paper, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toast, { Toaster } from "react-hot-toast";
import clarityimageline from "../../assets/images/clarity_image-line.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import Location from "../../models/Locations/Location";

const AddLocationForm = ({ sendChildToParent, setOpen }) => {
    const [copyIsChecked, setCopyIsChecked] = useState();
    const [copyAddressandContacts, setCopyAddressandContacts] = useState([{}]);
    const innerWidth = window.innerWidth;
    const leftInputWidth = innerWidth > 1900 ? "98ch" : "70ch";
    const formik = useFormik({
        initialValues: {
            name: "",
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            zip_code: "",
            phone_id: "",
            email: "",
            logo_url: "",
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
            phone_id: Yup.number()
                .required("Phone number is required")
                .positive()
                .integer(),
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            // logo_url: Yup.mixed().required("location image is required"),
        }),
        onSubmit: (values) => {
            const formValues = values;
            Location.CreateLocation(formValues)
                .then(() => {
                    toast.success("Locations Created");
                    setOpen(false);
                })
                .catch((e) => {
                    setOpen(false);
                    alert(e);
                });
            console.log("Locations values", formValues);
            sendChildToParent(formValues);
        },
    });
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-xxx",
            percent: 50,
            name: "image.png",
            status: "uploading",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-5",
            name: "image.png",
            status: "error",
        },
    ]);

    return (
        <>
            <Toaster position="top-right" />

            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        "& .MuiTextField-root": { width: "50ch" },
                    }}
                >
                    <FormControlLabel
                        sx={{}}
                        control={<Checkbox checked={copyIsChecked} />}
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
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Enter the location name"
                                    type="text"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        formik.touched.name &&
                                            formik.errors.name
                                    )}
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                    // autoComplete="current"
                                />
                                <TextField
                                    id="address_line1"
                                    name="address_line1"
                                    label="Address line 1"
                                    type="text"
                                    value={formik.values.address_line1}
                                    error={Boolean(
                                        formik.touched.address_line1 &&
                                            formik.errors.address_line1
                                    )}
                                    helperText={
                                        formik.touched.address_line1 &&
                                        formik.errors.address_line1
                                    }
                                    onChange={formik.handleChange}
                                    // autoComplete="current"
                                />
                                <TextField
                                    id="address_line2"
                                    name="address_line2"
                                    label="Address line 2"
                                    type="text"
                                    value={formik.values.address_line2}
                                    error={Boolean(
                                        formik.touched.address_line2 &&
                                            formik.errors.address_line2
                                    )}
                                    helperText={
                                        formik.touched.address_line2 &&
                                        formik.errors.address_line2
                                    }
                                    onChange={formik.handleChange}
                                    // autoComplete="current"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Upload
                                accept="image"
                                action={formik.values.logo_url}
                                onChange={formik.handleChange}
                                name="logo_url"
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height:
                                            innerWidth > 1900
                                                ? "250px"
                                                : "220px",
                                        width:
                                            innerWidth > 1900
                                                ? "300px"
                                                : "231px",
                                        mt: innerWidth > 1900 ? "20px" : "27px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        border: "2px dashed #ccc",
                                        boxShadow: "none",
                                    }}
                                >
                                    <Typography variant="p">
                                        Add Package Image{" "}
                                    </Typography>
                                    <img src={clarityimageline} />
                                    <Typography
                                        variant="p"
                                        sx={{ fontSize: "10px" }}
                                    >
                                        Supports , JPG, JPG2000, PNG Less than 2
                                        MB
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
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": {
                                        width:
                                            innerWidth > 1900 ? "45ch" : "30ch",
                                    },
                                    ml: -6,
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
                                        id="city"
                                        label="City*"
                                        type="text"
                                        value={formik.values.city}
                                        error={Boolean(
                                            formik.touched.city &&
                                                formik.errors.city
                                        )}
                                        helperText={
                                            formik.touched.city &&
                                            formik.errors.city
                                        }
                                        onChange={formik.handleChange}
                                        // autoComplete="current"
                                    />
                                    <TextField
                                        id="state"
                                        label="State*"
                                        type="text"
                                        value={formik.values.state}
                                        error={Boolean(
                                            formik.touched.state &&
                                                formik.errors.state
                                        )}
                                        helperText={
                                            formik.touched.state &&
                                            formik.errors.state
                                        }
                                        onChange={formik.handleChange}
                                        // autoComplete="current"
                                    />
                                    <TextField
                                        id="zip_code"
                                        label="Zip code*"
                                        type="number"
                                        value={formik.values.zip_code}
                                        error={Boolean(
                                            formik.touched.zip_code &&
                                                formik.errors.zip_code
                                        )}
                                        helperText={
                                            formik.touched.zip_code &&
                                            formik.errors.zip_code
                                        }
                                        onChange={formik.handleChange}
                                        // autoComplete="current"
                                    />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { width: "50ch" },
                                    ml: -6,
                                }}
                            >
                                <Stack
                                    spacing={5}
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
                                        id="phone_id"
                                        label="Enter phone number"
                                        type="tel"
                                        value={formik.values.phone_id}
                                        error={Boolean(
                                            formik.touched.phone_id &&
                                                formik.errors.phone_id
                                        )}
                                        helperText={
                                            formik.touched.phone_id &&
                                            formik.errors.phone_id
                                        }
                                        onChange={formik.handleChange}
                                        // autoComplete="current"
                                    />
                                    <TextField
                                        id="email"
                                        label="Enter email address"
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={Boolean(
                                            formik.touched.email &&
                                                formik.errors.email
                                        )}
                                        helperText={
                                            formik.touched.email &&
                                            formik.errors.email
                                        }
                                        // autoComplete="current"
                                    />
                                </Stack>
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
                        <Muibtn variant="outlined">cancel</Muibtn>
                        <Muibtn variant="contained" type="submit">
                            Save changes
                        </Muibtn>
                    </Stack>
                </Box>
            </form>
        </>
    );
};

export default AddLocationForm;
