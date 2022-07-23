import React, { useState, useEffect } from "react";
import "./DeactivateModal.css";
import { ReactComponent as closeIcon } from "./Close-icon.svg";

import {
  Box,
  Button,
  Badge,
  Stack,
  Grid,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  IconButton,
} from "@mui/material";
import myApi from "../../network/axios";
import CloseIcon from "@mui/icons-material/Close";
import "./servicePackages.css";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import PremiumPackCard from "./packagesCards/premiumpackCard";
import PackagesForm from "./forms/packageform";
import { Drawer } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
const ButtonStyle = {
  backgroundColor: "#FFFFFF",
  color: "lightslategray",
  p: 2,
  textTransform: "capitalize",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const ServicePack = () => {
  // const [file, setFile] = React.useState(null);
  // const props = {
  //   name: "file",
  //   multiple: false,
  //   customRequest: dummyRequest,

  //   beforeUpload(file, fileList) {
  //     console.log("file", file);
  //     setFile(file);
  //   },
  //   onChange(info) {
  //     const { status } = info.file;

  //     if (status === "done") {
  //       // message.success(`${info.file.name} file uploaded successfully.`);
  //       setFile(info.file.originFileObj);
  //     } else if (status === "error") {
  //       // message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },

  //   onDrop(e) {
  //     console.log("Dropped files", e);
  //   },
  // };
  const [open, setOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState(true);
  const [inActiveBtn, setInActiveBtn] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getPackages = async () => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}api/company/package/`;

      //   setLoading(true);
      await myApi.get(url).then((result) => {
        console.log("packages=> ", result);
        // setRooms(result.data.results);
      });
    } catch (error) {
      //   setLoading(false);
      // alert(error?.data?.message);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const [modal1Visible, setModal1Visible] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1, display: "inline" }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={8}>
            <Button
              className={`${activeBtn ? "packages-nav-active" : ""}`}
              onClick={() => {
                setActiveBtn(true);
                setInActiveBtn(false);
              }}
              sx={ButtonStyle}
            >
              <Stack spacing={4} direction="row">
                <AddTaskRoundedIcon />
                Active
                <Badge badgeContent={8} color="primary" />
              </Stack>
            </Button>
            <Button
              sx={ButtonStyle}
              className={`${inActiveBtn ? "packages-nav-active" : ""}`}
              onClick={() => {
                setActiveBtn(false);
                setInActiveBtn(true);
              }}
            >
              <Stack spacing={4} direction="row">
                <VisibilityOffRoundedIcon />
                Inactive
                <Badge badgeContent={12} color="primary" />
              </Stack>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                padding: "13px 19px",
                marginLeft: "18px",
                fontSize: "15px",
                float: "right",
              }}
              onClick={handleClickOpen}
            >
              Add new <AddIcon />
            </Button>
            <Button
              variant="outlined"
              style={{
                textTransform: "capitalize",
                padding: "13px 19px",
                fontSize: "15px",
                float: "right",
              }}
            >
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                style={{ marginRight: "7px" }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1856 23.25H8V11.8982L0.125 2.52319V0.75H21.5V2.51306L14 11.8881V19.4356L10.1856 23.25ZM9.5 21.75H9.56436L12.5 18.8144V11.3619L19.7895 2.25H1.85469L9.5 11.3518V21.75Z"
                  fill="#0073EA"
                />
              </svg>
              Filter
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* cards */}

      <Modal
        title="Deactivate Package"
        style={{
          top: 20,
        }}
        visible={modal1Visible}
        footer={null}
        closeIcon={
          <>
            <svg
              width="26"
              height="26"
              style={{ marginTop: "13px" }}
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.67969 8.67969L17.3197 17.3197M17.3197 8.67969L8.67969 17.3197L17.3197 8.67969Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </>
        }
        onOk={() => setModal1Visible(false)}
        onCancel={() => setModal1Visible(false)}
      >
        <p style={{ textAlign: "center" }}>
          You are about to Deactivate the package . Are you sure?
        </p>
        <div
          style={{
            height: "67px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              padding: "8px 10px",
              marginLeft: "18px",
              border: "1px solid #676879",
              fontSize: "15px",
              background: "rgba(17, 17, 17, 0.04)",
              color: "black",
            }}
            onClick={handleClickOpen}
          >
            No, Go Back
          </Button>

          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              padding: "8px 10px",
              marginLeft: "18px",
              fontSize: "15px",
              float: "right",
            }}
            onClick={handleClickOpen}
          >
            Yes, I am sure. Deactivate
          </Button>
        </div>
      </Modal>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <Box sx={{ mt: 3 }}>
          <PremiumPackCard
            pkgName={"pkg name"}
            pkgDes={"pkg desc"}
            pkgDuration={"12"}
            pkgDate={"date"}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <PremiumPackCard />
        </Box>
        <Box sx={{ mt: 3 }}>
          <PremiumPackCard />
        </Box>
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
          <PackagesForm />
        </Box>
      </Drawer>
    </>
  );
};

export default ServicePack;
