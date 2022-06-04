import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
} from "@mui/material";
import "./inviteMemberStyles.css";
import { Typography as Muitypography, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddMemberForm from "../forms/addMemberForm";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import EditMemberForm from "../forms/editMemberForm";
import {
  Space,
  Table,
  Checkbox,
  Popconfirm,
  Drawer,
  Typography,
  Pagination,
} from "antd";
import "./inviteMemberStyles.css";
import axios from "axios";
import myApi from "../../network/axios";
import toast, { Toaster } from "react-hot-toast";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const TeamInvitation = () => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableRow, setTableRowData] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(null);

  const handleClose = () => {
    setOpenAddForm(false);
    setOpenEditForm(false);
  };
  async function handleDelete(uid) {
    console.log("uid", uid);
    await myApi.delete(`api/auth/user/${uid}/`).then((result) => {
      toast.success(result.data.message);
      getUsers();
    });
  }

  const columns = [
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (_, record) => <Checkbox checked={record.is_active}></Checkbox>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <>
          {record.first_name
            ? record.first_name
            : "" + " " + record.last_name
            ? record.last_name
            : ""}
        </>
      ),
    },
    // {
    //     title: "Email Address",
    //     dataIndex: "email",
    //     key: "email",
    // },
    {
      title: "Access Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <Space size="middle">
              <a
                onClick={() => {
                  setOpenEditForm(true);
                  setEditRecord(record);
                }}
              >
                <EditOutlined style={{ color: "gray" }} />
              </a>
              <a>
                {tableRow.length >= 1 ? (
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record.id)}
                  >
                    <DeleteOutlined style={{ color: "gray" }} />
                  </Popconfirm>
                ) : null}
              </a>
            </Space>
          </>
        );
      },
    },
  ];

  const makeAToast = (message) => {
    toast(<Alert variant="filled">{message}</Alert>);
  };

  const getUsers = async (page, pageSize) => {
    try {
      let url = "https://planspace.herokuapp.com/api/auth/user/";
      if (page) {
        url = `https://planspace.herokuapp.com/api/auth/user/?page=${page}`;
      }

      setLoading(true);
      await myApi.get(url).then((result) => {
        setTableRowData(result.data.results);
        setCount(result.data.count);
        setLimit(result.data.limit);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      // alert(error?.data?.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <Toaster
    position="top-right"
    />
      <Box sx={{ flexGrow: 1, display: "inline" }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              // sx={{ textTransform: "capitalize", ml: 42 }}
              style={{ float: "right" }}
              onClick={() => setOpenAddForm(true)}
            >
              <AddIcon /> Add new
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* table */}
      <Box sx={{ marginTop: 2, backgroundColor: "white", height: "50%" }}>
        <Table
          className="ant-table ant-table-thead ant-table-tbody"
          bordered={true}
          size="middle"
          ellipsis={true}
          columns={columns}
          dataSource={tableRow}
          pagination={true}
          loading={loading}
        />
      </Box>
      {/* Model html */}
      <Drawer
        className="ant-drawer-title"
        title="Add New Member"
        width={1080}
        onClose={handleClose}
        visible={openAddForm}
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
        {/* <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Muitypography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add New Member
            </Muitypography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar> */}
        {/* form */}
        <AddMemberForm
          formValues={(values) => setTableRowData([...tableRow, values])}
          callBack={() => getUsers()}
          handleClose={(close) => setOpenAddForm(close)}
          popUp={(message) => makeAToast(message)}
        />
      </Drawer>

      <Drawer
        title="Update Member"
        width={1080}
        onClose={handleClose}
        visible={openEditForm}
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
        {/* <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Muitypography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update Member
            </Muitypography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar> */}
        {/* form */}
        <EditMemberForm
          editRecordValues={editRecord}
          callBack={() => getUsers()}
          handleClose={(close) => setOpenEditForm(close)}
          popUp={(message) => makeAToast(message)}
        />
      </Drawer>
    </>
  );
};
export default TeamInvitation;