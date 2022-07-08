import React, { useState } from "react";
import {
  Box,
  Button,
  Badge,
  Stack,
  Grid,
  Slide,
  IconButton,
} from "@mui/material";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import AddonsForm from "../servicePackages/forms/adonsform";
import ActiveCard from "./ActiveCard";
const ButtonStyle = {
  backgroundColor: "#FFFFFF",
  color: "lightslategray",
  p: 2,
  textTransform: "capitalize",
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const Addons = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: "inline" }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={8}>
            <Button sx={ButtonStyle}>
              <Stack spacing={4} direction="row">
                <AddTaskRoundedIcon />
                Active
                <Badge badgeContent={8} color="primary" />
              </Stack>
            </Button>
            <Button sx={ButtonStyle}>
              <Stack spacing={4} direction="row">
                <VisibilityOffRoundedIcon />
                Inactive
                <Badge badgeContent={12} color="primary" />
              </Stack>
            </Button>
            <Button sx={ButtonStyle}>
              <Stack spacing={4} direction="row">
                <DriveFileRenameOutlineOutlinedIcon />
                Drafts
                <Badge badgeContent={4} color="primary" />
              </Stack>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              style={{ textTransform: "capitalize", float: "right" }}
              onClick={handleClickOpen}
            >
              <AddIcon /> Add new
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* cards */}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
      </div>

      {/* Model html */}
      <Drawer
        title="New Package Name"
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
        {/* form */}
        <Box>
          <AddonsForm />
        </Box>
      </Drawer>
    </>
  );
};

export default Addons;
