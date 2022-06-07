import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import "./inviteMemberStyles.css";
import { Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddMemberForm from "../forms/addMemberForm";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { TimelineDot } from '@mui/lab';
import EditMemberForm from "../forms/editMemberForm";
import { Space, Table, Checkbox, Popconfirm, Drawer } from "antd";
import "./inviteMemberStyles.css";
import axios from "axios";
import myApi from "../../network/axios";
import toast, { Toaster } from "react-hot-toast";
let data = [
  {
    id: "12asd",
    is_active: true,
    first_name: "John Brown",
    mobile: "234234234234",
    email: "johnbrow@gmail.com",
    address: "New York No. 1 Lake Park",
  },
  {
    id: "12123",
    is_active: true,
    first_name: "irish men",
    mobile: "234234234234",
    email: "johnbrow@gmail.com",
    address: "New York No. 1 Lake Park",
  },
  {
    id: "122355",
    is_active: true,
    first_name: "blue men",
    mobile: "234234234234",
    email: "johnbrow@gmail.com",
    address: "New York No. 1 Lake Park",
  },
];
const TeamInvitation = () => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableRow, setTableRowData] = useState(data);
  const [editRecord, setEditRecord] = useState(null);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(null);

  const handleClose = () => {
    setOpenAddForm(false);
    // setEditRecord(null);
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
                  setEditRecord(record);
                  setOpenEditForm(true);
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
      <Toaster position="top-right" />
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
      {/* Model to delete html */}
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
        <AddMemberForm
          formValues={(values) => setTableRowData([...tableRow, values])}
          callBack={() => getUsers()}
          handleClose={(close) => setOpenAddForm(close)}
          popUp={(message) => makeAToast(message)}
        />
      </Drawer>
      {/* Model to edit html */}
      <Drawer
        className="ant-drawer-title"
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
        <EditMemberForm
          editRecordValues={editRecord}
          callBack={() => getUsers()}
          handleClose={(close) => {
            setOpenEditForm(close);
            // setEditRecord(null);
          }}
          popUp={(message) => makeAToast(message)}
        />
      </Drawer>
    </>
  );
};
export default TeamInvitation;
