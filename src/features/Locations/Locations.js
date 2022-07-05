import React, { useState, useEffect } from "react";
import { Button, Drawer, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import AddLocationForm from "../forms/AddLocationForm";
import locImage from "../../assets/images/northFace.png";
import Location from "../../models/Locations/Location";
import addLogoImage from "../../assets/images/iconadd.png";
import "./location.scss";
import EditLocationForm from "../forms/EditLocationForm";
import { toast } from "react-toastify";

const LocationIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.5 14.3125H11.5C11.8333 14.3125 12 14.4792 12 14.8125C12 15.1458 11.8333 15.3125 11.5 15.3125H4.5C4.16667 15.3125 4 15.1458 4 14.8125C4 14.4792 4.16667 14.3125 4.5 14.3125Z"
                fill="#676879"
            />
            <path
                d="M12.5 6.8125C12.5 5.61903 12.0259 4.47443 11.182 3.63052C10.3381 2.78661 9.19347 2.3125 8 2.3125C6.80653 2.3125 5.66193 2.78661 4.81802 3.63052C3.97411 4.47443 3.5 5.61903 3.5 6.8125C3.5 8.6585 4.977 11.0645 8 13.9465C11.023 11.0645 12.5 8.6585 12.5 6.8125ZM8 15.3125C4.333 11.9795 2.5 9.1455 2.5 6.8125C2.5 5.35381 3.07946 3.95486 4.11091 2.92341C5.14236 1.89196 6.54131 1.3125 8 1.3125C9.45869 1.3125 10.8576 1.89196 11.8891 2.92341C12.9205 3.95486 13.5 5.35381 13.5 6.8125C13.5 9.1455 11.667 11.9795 8 15.3125Z"
                fill="#676879"
            />
            <path
                d="M8 8.3125C8.39782 8.3125 8.77936 8.15446 9.06066 7.87316C9.34196 7.59186 9.5 7.21032 9.5 6.8125C9.5 6.41468 9.34196 6.03314 9.06066 5.75184C8.77936 5.47054 8.39782 5.3125 8 5.3125C7.60218 5.3125 7.22064 5.47054 6.93934 5.75184C6.65804 6.03314 6.5 6.41468 6.5 6.8125C6.5 7.21032 6.65804 7.59186 6.93934 7.87316C7.22064 8.15446 7.60218 8.3125 8 8.3125ZM8 9.3125C7.33696 9.3125 6.70107 9.04911 6.23223 8.58027C5.76339 8.11143 5.5 7.47554 5.5 6.8125C5.5 6.14946 5.76339 5.51357 6.23223 5.04473C6.70107 4.57589 7.33696 4.3125 8 4.3125C8.66304 4.3125 9.29893 4.57589 9.76777 5.04473C10.2366 5.51357 10.5 6.14946 10.5 6.8125C10.5 7.47554 10.2366 8.11143 9.76777 8.58027C9.29893 9.04911 8.66304 9.3125 8 9.3125Z"
                fill="#676879"
            />
        </svg>
    );
};

const LocalPhoneIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.5044 5.3125H10.5044C10.504 4.9148 10.3458 4.5335 10.0646 4.25228C9.7834 3.97106 9.4021 3.8129 9.00439 3.8125V2.8125C9.66719 2.81329 10.3026 3.07694 10.7713 3.54561C11.24 4.01428 11.5036 4.6497 11.5044 5.3125Z"
                fill="#676879"
            />
            <path
                d="M13.5044 5.3125H12.5044C12.5033 4.38457 12.1342 3.49494 11.4781 2.8388C10.822 2.18265 9.93233 1.81356 9.00439 1.8125V0.8125C10.1975 0.813823 11.3413 1.28835 12.1849 2.13198C13.0285 2.97561 13.5031 4.11943 13.5044 5.3125Z"
                fill="#676879"
            />
            <path
                d="M14.2698 15.3125H14.1717C2.83908 14.6606 1.23001 5.09519 1.00509 2.17596C0.969936 1.71832 1.11795 1.26544 1.41656 0.916957C1.71518 0.56847 2.13995 0.35291 2.59743 0.317693C2.64318 0.314231 2.68913 0.312501 2.73527 0.312501L5.77462 0.312501C6.00563 0.312277 6.23138 0.381448 6.42264 0.511055C6.6139 0.640662 6.76185 0.824733 6.84733 1.03942L7.72395 3.19712C7.80835 3.40685 7.8293 3.63678 7.78419 3.85832C7.73907 4.07987 7.62989 4.28327 7.47019 4.44327L6.24176 5.68365C6.43287 6.7748 6.95482 7.78076 7.73683 8.5651C8.51884 9.34945 9.52308 9.87422 10.6133 10.0683L11.8648 8.82789C12.0272 8.6699 12.2324 8.56322 12.455 8.52116C12.6776 8.47909 12.9076 8.5035 13.1163 8.59135L15.2906 9.4625C15.502 9.5507 15.6823 9.69986 15.8087 9.89096C15.935 10.0821 16.0016 10.3065 16 10.5356V13.5817C16 14.0408 15.8177 14.481 15.4932 14.8056C15.1687 15.1302 14.7287 15.3125 14.2698 15.3125ZM2.73527 1.46635C2.65953 1.46612 2.58449 1.48082 2.51443 1.5096C2.44437 1.53838 2.38067 1.58069 2.32695 1.6341C2.27324 1.68751 2.23057 1.75098 2.20137 1.82089C2.17218 1.8908 2.15704 1.96578 2.15681 2.04154C2.15681 2.05769 2.15739 2.07365 2.15854 2.08942C2.42384 5.50481 4.12518 13.5817 14.2352 14.1587C14.3878 14.1678 14.5379 14.1159 14.6523 14.0145C14.7667 13.913 14.8362 13.7702 14.8454 13.6175L14.8465 13.5817V10.5356L12.6723 9.66442L11.0171 11.3087L10.7402 11.274C5.72271 10.6452 5.04217 5.62596 5.04217 5.57404L5.00757 5.29712L6.64547 3.64135L5.78038 1.46635L2.73527 1.46635Z"
                fill="#676879"
            />
        </svg>
    );
};
const EmailIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.66699 6L8.00033 8.33333L11.3337 6"
                stroke="#676879"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M1.3335 11.3333L1.3335 4.66665C1.3335 4.31302 1.47397 3.97389 1.72402 3.72384C1.97407 3.47379 2.31321 3.33331 2.66683 3.33331L13.3335 3.33331C13.6871 3.33331 14.0263 3.47379 14.2763 3.72384C14.5264 3.97389 14.6668 4.31302 14.6668 4.66665V11.3333C14.6668 11.6869 14.5264 12.0261 14.2763 12.2761C14.0263 12.5262 13.6871 12.6666 13.3335 12.6666H2.66683C2.31321 12.6666 1.97407 12.5262 1.72402 12.2761C1.47397 12.0261 1.3335 11.6869 1.3335 11.3333Z"
                stroke="#676879"
            />
        </svg>
    );
};

export default function Locations() {
    const [formData, setFormData] = useState();
    const [editRecordValues, setEditRecordValues] = useState(null);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const innerWidth = window.innerWidth;
    const gettingDataFromChild = (formDataFromParent) => {
        setFormData(formDataFromParent);
    };
    useEffect(() => {
        Location.GetLocations()
            .then((res) => {
                setLocations(res.results);
                toast.success("Locations Fetched");
            })
            .catch((err) => {
                console.log(err);
            });
    }, [innerWidth, open]);
    console.log("location form data in parent", formData);
    return (
        <>
            <Box
                style={{
                    marginTop: "10px",
                    flexWrap: "wrap",
                }}
            >
                <div className="headcard">
                    <div>
                        <p className="headTitle">
                            Hi {userInfo?.first_name || userInfo?.username},
                            Welcome to PlanSpace.
                        </p>
                        <p className="description">
                            We are glad to have you onbard. Here is your quick
                            start guide to setup the system
                        </p>
                    </div>
                    <div>
                        <Button>Finish Setup</Button>
                    </div>
                </div>
                {locations &&
                    locations?.map((item) => (
                        <Card sx={{ display: "flex", p: 1, m: 1 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: "250px", height: "250px" }}
                                image={locImage}
                                alt="Live from space"
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    mt: 0,
                                    width: "330px",
                                }}
                            >
                                <CardContent sx={{ flex: "1 0 auto" }}>
                                    <CardContent>
                                        <Typography
                                            variant="subtitle5"
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <LocationIcon />{" "}
                                            {item?.address_line1}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Typography
                                            variant="subtitle5"
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <EmailIcon /> {item?.email}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Typography
                                            variant="subtitle5"
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <LocalPhoneIcon /> {item?.phone}
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "4px 8px",
                                            gap: "8px",
                                            width: "190px",
                                            height: "28px",
                                            background: "#31A463",
                                            borderRadius: "16px",
                                            color: "white",
                                        }}
                                    >
                                        Physical Main Location
                                    </Button>
                                </CardContent>
                            </Box>
                            <Box
                                style={{
                                    marginLeft:
                                        innerWidth > 1900 ? "1300px" : "580px",
                                    cursor: "pointer",
                                }}
                            >
                                <EditLocationAltIcon
                                    onClick={() => {
                                        setOpenEditForm(true);
                                        setEditRecordValues(item);
                                    }}
                                    color="disabled"
                                />
                            </Box>
                        </Card>
                    ))}
                <Button
                    style={{
                        width: "250px",
                        height: "207px",
                        color: "gray",
                        border: "none",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        fontWeight: "bold",
                    }}
                    icon={<img src={addLogoImage} />}
                    onClick={handleClickOpen}
                >
                    <Typography style={{ marginTop: "12px" }}>
                        Add New Location
                    </Typography>
                </Button>
            </Box>

            {/* Model html */}
            <Drawer
                title="New Location Name"
                width={innerWidth > 1900 ? 1250 : 900}
                onClose={handleClose}
                visible={open}
                closable={false}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <IconButton
                        edge="start"
                        sx={{ color: "white" }}
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseCircleOutlined />
                    </IconButton>
                }
            >
                <AddLocationForm
                    setOpen={setOpen}
                    sendChildToParent={gettingDataFromChild}
                />
            </Drawer>
            <Drawer
                title="Update Location"
                width={innerWidth > 1900 ? 1250 : 900}
                onClose={handleClose}
                visible={openEditForm}
                closable={false}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <IconButton
                        edge="start"
                        sx={{ color: "white" }}
                        onClick={() => {
                            setOpenEditForm(false);
                            // setEditRecord(null);
                        }}
                        aria-label="close"
                    >
                        <CloseCircleOutlined />
                    </IconButton>
                }
            >
                <EditLocationForm
                    sendChildToParent={gettingDataFromChild}
                    editRecordValues={editRecordValues}
                />
            </Drawer>
        </>
    );
}
