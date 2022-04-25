import React from "react";
import { Box, Button, Badge, Stack } from "@mui/material";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import PremiumPackCard from "./packagesCards/premiumpackCard";

const ButtonStyle = {
  backgroundColor: "#FFFFFF",
  color: "lightslategray",
  p: 2,
  textTransform: "capitalize",
};
const ServicePack = () => {
  return (
    <>
      <Box>
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
      </Box>
      {/* cards */}

      <Box sx={{mt:3,ml:1}}>
        <PremiumPackCard />
      </Box>
    </>
  );
};

export default ServicePack;
