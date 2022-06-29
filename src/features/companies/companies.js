import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { projectStorage } from "../../utilities/storage";
import AddCompanyfrom from "../forms/AddCompanyfrom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button as Muibtn } from "@mui/material";
import compImage from "../../assets/images/company.jpg";
import Company from "../../models/company/company";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Companies() {
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
      <div
        style={{
          marginLeft: "10px",
          margin: "10px 0px",
        }}
      >
        {formData ? (
          <Card sx={{ display: "flex", p: 1, m: 1 }}>
            <CardMedia
              component="img"
              sx={{ width: "250px", height: "250px" }}
              image={compImage}
              alt="company image"
            />
            <Box sx={{ display: "flex", flexDirection: "column", mt: 0 }}>
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
                <Muibtn
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
                </Muibtn>
              </CardContent>
            </Box>
          </Card>
        ) : null}

        <Button
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "white",
            color: "#ccc",
            border: "none",
            marginLeft: "10px",
          }}
          type="primary"
          onClick={handleClickOpen}
        >
          {" "}
          <PlusCircleOutlined /> Add company
        </Button>
      </div>

      {/* Model html */}
      <Dialog
        fullScreen
        maxWidth="md"
        sx={{ pl: 70 }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New Business Name
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AddCompanyfrom sendChildToParent={gettingDataFromChild} />
      </Dialog>
    </>
  );
}
