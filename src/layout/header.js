import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Divider, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Select from "@mui/material/Select";
import planLogo from "../assets/images/plan.png";
import "../index.css";

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [location, setLocation] = React.useState("");
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        history.push("/login");
    };

    React.useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setLocation(JSON.parse(userInfo)?.address);
        }
    }, []);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            // sx={{ position: "fixed", ml: 45, mt: 5 }}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{ position: "fixed", ml: 20, mt: 5 }}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications">
                    <Badge badgeContent={10} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
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
                        labelId="select"
                        sx={{
                            color: "black",
                            height: "40px",
                            width: "30%",
                            marginRight: "10px",
                            display: { xs: "flex", md: "flex" },
                        }}
                        label={location}
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
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            sx={{ p: 3 }}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon sx={{ color: "#003399" }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </>
    );
}
