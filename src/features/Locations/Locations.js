import React, { useState, useEffect } from "react";
import { Button, Drawer, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { projectStorage } from "../../utilities/storage";
import AddLocationForm from "../forms/AddLocationForm";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import locImage from "../../assets/images/location.jpg";
import Location from "../../models/Locations/Location";
import addLogoImage from "../../assets/images/iconadd.png";
import "./location.scss";
export default function Locations() {
    const [formData, setFormData] = useState();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const gettingDataFromChild = (formDataFromParent) => {
        setFormData(formDataFromParent);
    };
    useEffect(() => {
    }, []);
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
                            Hi Bobin, Welcome to PlanSpace.
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
                {formData ? (
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
                                flexDirection: "column",
                                mt: 0,
                            }}
                        >
                            <CardContent sx={{ flex: "1 0 auto" }}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle5"
                                        color="text.secondary"
                                        component="span"
                                    >
                                        <AddLocationIcon /> {formData?.address1}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography
                                        variant="subtitle5"
                                        color="text.secondary"
                                        component="span"
                                    >
                                        <EmailIcon /> {formData?.email}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography
                                        variant="subtitle5"
                                        color="text.secondary"
                                        component="span"
                                    >
                                        <LocalPhoneIcon /> {formData?.phone}
                                    </Typography>
                                </CardContent>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{
                                        p: "2px",
                                        pl: "5px",
                                        pr: "5px",
                                        ml: "15px",
                                        justifyContent: "flex-start",
                                        borderRadius: "20px",
                                        textTransform: "lowercase",
                                    }}
                                >
                                    Physical Main Location
                                </Button>
                            </CardContent>
                        </Box>
                    </Card>
                ) : null}
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
                width={900}
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
                <AddLocationForm sendChildToParent={gettingDataFromChild} />
            </Drawer>
        </>
    );
}
