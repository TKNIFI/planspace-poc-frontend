import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Divider,
  MenuItem,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import planLogo from "../assets/images/plan.png";
import "../index.css";
import { Popover } from "antd";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[400], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[400], 0.25),
  },
  marginRight: theme.spacing(5),
  marginLeft: theme.spacing(5),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 70,
    width: "25%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
  // backgroundColor: alpha(theme.palette.grey[400], 0.15),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "gray",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const history = useHistory();
  const [location, setLocation] = React.useState("");
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/login");
  };

  React.useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log("userInfo", typeof userInfo);
    let info = JSON.parse(userInfo);
    if (info) {
      setLocation(info?.address);
    }
  }, []);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </>
  );

  return (
    <>
      <AppBar
        className="appBar"
        position="static"
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "block" } }}
          >
            <img
              width={"130px"}
              height={"33px"}
              src={planLogo}
              style={{
                borderRadius: "2px",
                padding: "3px",
              }}
              alt="logo"
            />
          </Typography>

          <Search style={{ cursor: "pointer" }}>
            <SearchIconWrapper style={{ marginLeft: "85%" }}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Select
            sx={{
              color: "black",
              height: "40px",
              width: "30%",
              marginRight: "10px",
            }}
            label="a"
            value={location}
            // onChange={handleChange}
          >
            <MenuItem value={location}>{location}</MenuItem>
          </Select>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "40px", marginTop: "15px" }}
            ></Divider>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ p: 3 }}
            >
              <AddCircleIcon variant="outlined" />
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "40px", marginTop: "15px" }}
            ></Divider>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ p: 3 }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "40px", marginTop: "15px" }}
            ></Divider>
            <Popover
              placement="bottomRight"
              content={renderMenu}
              trigger="click"
            >
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                sx={{ p: 3 }}
              >
                <AccountCircle />
              </IconButton>
            </Popover>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Popover
              placement="bottomRight"
              content={renderMenu}
              trigger="click"
            >
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon sx={{ color: "#003399" }} />
              </IconButton>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
