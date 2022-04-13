import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Company from "../../models/company/company";
import { projectStorage } from "../../utilities/storage";
import AddCompanyfrom from "../forms/AddCompanyfrom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Companies() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        style={{
          marginLeft: "10px",
          margin: "10px 0px",
        }}
      >
        <Button
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "white",
            color: "#ccc",
            border: "none",
          }}
          type="primary"
          onClick={handleClickOpen}
        >
          {" "}
          <PlusCircleOutlined /> Add new company
        </Button>
      </div>

      {/* Model html */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose(false)}
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
        <AddCompanyfrom/>
      </Dialog>
    </>
  );
}
