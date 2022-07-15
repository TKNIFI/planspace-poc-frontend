import React, { useState } from "react";
import "./dashboard.css";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { Button, Drawer, Typography } from "antd";
import AddLocationForm from "../forms/AddLocationForm";
import addLogoImage from "../../assets/images/iconadd.png";
import { CloseCircleOutlined } from "@ant-design/icons";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="img"></div>
      <Button
        style={{
          width: "250px",
          height: "207px",
          color: "gray",
          border: "none",
          marginTop: "30px",
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
        <Typography style={{ marginTop: "12px" }}>Add New Venue</Typography>
      </Button>

      <Drawer
        title="New Location Name"
        width={window.innerWidth > 1900 ? 1250 : 900}
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
          //   sendChildToParent={gettingDataFromChild}
        />
      </Drawer>
    </>
  );
};

export default Dashboard;
