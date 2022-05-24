import React, { useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddMemberForm from "../forms/addMemberForm";
import { Space, Table, Tag, Checkbox } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const columns = [
  {
    title: "Active",
    dataIndex: "Active",
    key: "Active",
    render: (_, record) => <Checkbox checked={record.Active}></Checkbox>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Access Location",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>
          <EditOutlined />
        </Button>
        <Button>
          <DeleteFilled />
        </Button>
      </Space>
    ),
  },
];
let data = [
  {
    userId: "12asd",
    Active: true,
    name: "John Brown",
    address: "New York No. 1 Lake Park",
  },
];

const TeamInvitation = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormvalues] = useState(null);
  const formValuesObject = {
    userId: formValues?.userId,
    Active: false,
    name: formValues?.name,
    address: formValues?.address,
  };
  console.log(formValuesObject);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: "inline" }}>
        <Grid container spacing={2} columnSpacing={69}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={handleClickOpen}
            >
              <AddIcon /> Add new
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* table */}
      <Box sx={{ marginTop: 2 }}>
        <Table columns={columns} dataSource={data} />
      </Box>
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
              Add New Member
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
        {/* form */}
        <AddMemberForm
          formValues={(values) => setFormvalues(values)}
          handleClose={(close) => setOpen(close)}
        />
      </Dialog>
    </>
  );
};
export default TeamInvitation;
