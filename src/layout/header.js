import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
// import { ReactComponent as logo } from "../../public/logo.svg";

import "./header.css";
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
} from "@mui/material";

import { Select } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import planLogo from "../assets/images/plan.svg";
import { ReactComponent as BrandIcon } from "./Logo.svg";
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

const { Option, OptGroup } = Select;
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

export default function PrimarySearchAppBar() {
  const history = useHistory();
  const [location, setLocation] = React.useState("");
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/login");
  };

  React.useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
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

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "gray",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(-1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <>
      <AppBar
        className="appBar"
        position="static"
        sx={{ backgroundColor: "white", height: "85px" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "block" } }}
          ></Typography>

          <div className="logo">
            <BrandIcon />
          </div>
          <Search
            style={{
              cursor: "pointer",
              border: "1px solid #C5C7D0",
            }}
          >
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
            defaultValue="TNFE - Pennysylvania"
            style={{
              width: 222,
            }}
            // onChange={handleChange}
          >
            <Option value="TNFE - Pennysylvania">
              {" "}
              <svg
                width="16"
                height="16"
                style={{
                  marginRight: "9px",
                  position: "relative",
                  top: "4px",
                }}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 14H11.5C11.8333 14 12 14.1667 12 14.5C12 14.8333 11.8333 15 11.5 15H4.5C4.16667 15 4 14.8333 4 14.5C4 14.1667 4.16667 14 4.5 14Z"
                  fill="#676879"
                />
                <path
                  d="M12.5 6.5C12.5 5.30653 12.0259 4.16193 11.182 3.31802C10.3381 2.47411 9.19347 2 8 2C6.80653 2 5.66193 2.47411 4.81802 3.31802C3.97411 4.16193 3.5 5.30653 3.5 6.5C3.5 8.346 4.977 10.752 8 13.634C11.023 10.752 12.5 8.346 12.5 6.5ZM8 15C4.333 11.667 2.5 8.833 2.5 6.5C2.5 5.04131 3.07946 3.64236 4.11091 2.61091C5.14236 1.57946 6.54131 1 8 1C9.45869 1 10.8576 1.57946 11.8891 2.61091C12.9205 3.64236 13.5 5.04131 13.5 6.5C13.5 8.833 11.667 11.667 8 15Z"
                  fill="#676879"
                />
                <path
                  d="M8 8C8.39782 8 8.77936 7.84196 9.06066 7.56066C9.34196 7.27936 9.5 6.89782 9.5 6.5C9.5 6.10218 9.34196 5.72064 9.06066 5.43934C8.77936 5.15804 8.39782 5 8 5C7.60218 5 7.22064 5.15804 6.93934 5.43934C6.65804 5.72064 6.5 6.10218 6.5 6.5C6.5 6.89782 6.65804 7.27936 6.93934 7.56066C7.22064 7.84196 7.60218 8 8 8ZM8 9C7.33696 9 6.70107 8.73661 6.23223 8.26777C5.76339 7.79893 5.5 7.16304 5.5 6.5C5.5 5.83696 5.76339 5.20107 6.23223 4.73223C6.70107 4.26339 7.33696 4 8 4C8.66304 4 9.29893 4.26339 9.76777 4.73223C10.2366 5.20107 10.5 5.83696 10.5 6.5C10.5 7.16304 10.2366 7.79893 9.76777 8.26777C9.29893 8.73661 8.66304 9 8 9Z"
                  fill="#676879"
                />
              </svg>
              TNFE - Pennysylvania
            </Option>
          </Select>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                paddingLeft: "13px",
              },
            }}
          >
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "40px", marginTop: "16px" }}
            ></Divider>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ p: 2 }}
            >
              <svg
                width="41"
                height="42"
                viewBox="0 0 41 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="20.241"
                  cy="21.5556"
                  rx="20.241"
                  ry="19.5556"
                  fill="#EAECF2"
                />
                <path
                  d="M21 13.5C21 13.2239 20.7761 13 20.5 13H20C19.7239 13 19.5 13.2239 19.5 13.5V20.5H13C12.7239 20.5 12.5 20.7239 12.5 21V22C12.5 22.2761 12.7239 22.5 13 22.5H19.5V29.5C19.5 29.7761 19.7239 30 20 30H20.5C20.7761 30 21 29.7761 21 29.5V22.5H28C28.2761 22.5 28.5 22.2761 28.5 22V21C28.5 20.7239 28.2761 20.5 28 20.5H21V13.5Z"
                  fill="#003399"
                  stroke="#003399"
                  stroke-linejoin="round"
                />
              </svg>

              {/* <AddCircleIcon variant="outlined" /> */}
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "40px", marginTop: "16px" }}
            ></Divider>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ p: 2 }}
            >
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="20.241"
                  cy="20"
                  rx="20.241"
                  ry="19.5556"
                  fill="#EAECF2"
                />
                <path
                  d="M36.9458 4.84446C36.9458 6.98227 35.1471 8.74446 32.8916 8.74446C30.6362 8.74446 28.8374 6.98227 28.8374 4.84446C28.8374 2.70664 30.6362 0.944458 32.8916 0.944458C35.1471 0.944458 36.9458 2.70664 36.9458 4.84446Z"
                  fill="#D83A52"
                  stroke="#D83A52"
                />
                <path
                  d="M28.5249 25.0832C27.9556 24.5929 27.4572 24.0308 27.0431 23.412C26.591 22.5579 26.32 21.6252 26.2461 20.6686V17.8509C26.25 16.3484 25.6858 14.8961 24.6596 13.7671C23.6334 12.638 22.2158 11.9099 20.6731 11.7195V10.9837C20.6731 10.7817 20.59 10.588 20.4422 10.4453C20.2944 10.3025 20.0939 10.2222 19.8849 10.2222C19.6759 10.2222 19.4754 10.3025 19.3276 10.4453C19.1798 10.588 19.0968 10.7817 19.0968 10.9837V11.7309C17.5679 11.935 16.1674 12.6676 15.1547 13.7928C14.1419 14.9181 13.5856 16.3598 13.5887 17.8509V20.6686C13.5148 21.6252 13.2438 22.5579 12.7917 23.412C12.3849 24.0294 11.8945 24.5914 11.3335 25.0832C11.2706 25.1367 11.2201 25.2025 11.1855 25.2762C11.1509 25.35 11.1329 25.43 11.1328 25.511V26.2867C11.1328 26.438 11.195 26.5831 11.3057 26.69C11.4164 26.797 11.5666 26.8571 11.7232 26.8571H28.1352C28.2918 26.8571 28.442 26.797 28.5527 26.69C28.6634 26.5831 28.7256 26.438 28.7256 26.2867V25.511C28.7255 25.43 28.7075 25.35 28.6729 25.2762C28.6383 25.2025 28.5878 25.1367 28.5249 25.0832ZM12.3608 25.7163C12.91 25.2037 13.3937 24.6292 13.8012 24.0052C14.3707 22.9737 14.703 21.8356 14.7753 20.6686V17.8509C14.7519 17.1825 14.868 16.5163 15.1166 15.8921C15.3652 15.2679 15.7413 14.6984 16.2225 14.2175C16.7036 13.7366 17.28 13.3542 17.9174 13.0931C18.5547 12.8319 19.2399 12.6973 19.9321 12.6973C20.6244 12.6973 21.3096 12.8319 21.9469 13.0931C22.5843 13.3542 23.1607 13.7366 23.6418 14.2175C24.123 14.6984 24.4991 15.2679 24.7477 15.8921C24.9963 16.5163 25.1124 17.1825 25.089 17.8509V20.6686C25.1613 21.8356 25.4936 22.9737 26.0631 24.0052C26.4706 24.6292 26.9543 25.2037 27.5035 25.7163H12.3608Z"
                  fill="#676879"
                />
                <path
                  d="M19.9586 28.7621C20.3305 28.7538 20.6874 28.6188 20.9661 28.3808C21.2449 28.1428 21.4275 27.8172 21.4818 27.4617H18.3765C18.4322 27.8269 18.6234 28.1601 18.9145 28.3993C19.2055 28.6385 19.5766 28.7674 19.9586 28.7621Z"
                  fill="#676879"
                />
              </svg>
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "40px", marginTop: "16px" }}
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
                sx={{ p: 2 }}
              >
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20.4824" cy="20.4453" r="20" fill="#D7DEE4" />
                  <path
                    d="M15.4824 14.4453V25.4453H21.4824V14.4453H15.4824ZM14.9824 13.4453H21.9824C22.115 13.4453 22.2422 13.498 22.336 13.5918C22.4297 13.6855 22.4824 13.8127 22.4824 13.9453V25.9453C22.4824 26.0779 22.4297 26.2051 22.336 26.2989C22.2422 26.3926 22.115 26.4453 21.9824 26.4453H14.9824C14.8498 26.4453 14.7226 26.3926 14.6289 26.2989C14.5351 26.2051 14.4824 26.0779 14.4824 25.9453V13.9453C14.4824 13.8127 14.5351 13.6855 14.6289 13.5918C14.7226 13.498 14.8498 13.4453 14.9824 13.4453Z"
                    fill="#676879"
                  />
                  <path
                    d="M16.4824 16.4453H20.4824V17.4453H16.4824V16.4453ZM16.4824 19.4453H20.4824V20.4453H16.4824V19.4453ZM16.4824 22.4453H20.4824V23.4453H16.4824V22.4453ZM22.4824 20.4453H24.4824V21.4453H22.4824V20.4453ZM22.4824 22.4453H24.4824V23.4453H22.4824V22.4453ZM13.4824 25.4453H27.4824V26.4453H13.4824V25.4453Z"
                    fill="#676879"
                  />
                  <path
                    d="M22.4824 18.4453V25.4453H25.4824V18.4453H22.4824ZM21.9824 17.4453H25.9824C26.115 17.4453 26.2422 17.498 26.336 17.5918C26.4297 17.6855 26.4824 17.8127 26.4824 17.9453V25.9453C26.4824 26.0779 26.4297 26.2051 26.336 26.2989C26.2422 26.3926 26.115 26.4453 25.9824 26.4453H21.9824C21.8498 26.4453 21.7226 26.3926 21.6289 26.2989C21.5351 26.2051 21.4824 26.0779 21.4824 25.9453V17.9453C21.4824 17.8127 21.5351 17.6855 21.6289 17.5918C21.7226 17.498 21.8498 17.4453 21.9824 17.4453Z"
                    fill="#676879"
                  />
                </svg>
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
