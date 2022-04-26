import React from "react";
import { Box, Button, Badge, Stack, Grid } from "@mui/material";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import PremiumPackCard from "./packagesCards/premiumpackCard";

const ButtonStyle = {
  backgroundColor: "#FFFFFF",
  color: "lightslategray",
  p: 2,
  textTransform: "capitalize",
};

const Addons = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: "inline" }}>
        <Grid container spacing={2} >
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
            <Button variant="contained" sx={{ textTransform: "capitalize"}}>
              <AddIcon /> Add new
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* cards */}
    </>
  );
};

export default Addons;
