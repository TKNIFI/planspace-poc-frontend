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
import { TimelineDot } from "@mui/lab";
import EditMemberForm from "../forms/editMemberForm";
import { Space, Table, Checkbox, Popconfirm, Drawer, Pagination } from "antd";
import "./inviteMemberStyles.css";
import axios from "axios";
import myApi from "../../network/axios";
import { toast } from "react-toastify";
import TeamMemberTable from "./TeamMemberTable";
require("dotenv").config();

const TeamInvitation = () => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableRow, setTableRowData] = useState();
  const [editRecord, setEditRecord] = useState(null);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(null);
  const handleClose = () => {
    setOpenAddForm(false);
    setEditRecord(null);
    setOpenEditForm(false);
  };
  async function handleDelete(uid) {
    await myApi
      .delete(`${process.env.REACT_APP_BASE_URL}api/auth/user/${uid}/`)
      .then((result) => {
        toast.success(result.data.message);
        getUsers();
      });
  }

  async function updateUser(is_active, uid) {
    await myApi
      .put(`${process.env.REACT_APP_BASE_URL}api/auth/user/${uid}/`, {
        is_active: !is_active,
      })
      .then((result) => {
        toast.success(
          `User ${is_active ? "deactivated" : "activated"} successfully`
        );
        getUsers();
      });
  }

  const makeAToast = (message) => {
    toast.success(message);
  };

  const getUsers = async (page, pageSize) => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}api/auth/user/`;
      if (page) {
        url = `${process.env.REACT_APP_BASE_URL}api/auth/user/?page=${page}`;
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
      {/* <Toaster position="top-right" /> */}
      <Box sx={{ flexGrow: 1, display: "inline" }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="addNewBtn"
              style={{
                textTransform: "capitalize",
                float: "right",
                fontFamily: "Fira Sans",
                fontSize: "15px",
                width: "124px",
                height: "44px",
              }}
              data-testid="addBtn"
              onClick={() => setOpenAddForm(true)}
            >
              Add new <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* table */}

      <TeamMemberTable
        tableRow={tableRow ? tableRow : []}
        handleDelete={handleDelete}
        updateUser={updateUser}
        getUsers={getUsers}
        setOpenEditForm={setOpenEditForm}
        callBack={getUsers}
        editValues={(record) => setEditRecord(record)}
        loading={loading}
      />
      <Pagination
        defaultCurrent={1}
        total={count}
        style={{ marginTop: "51px" }}
        onChange={(page, pageSize) => getUsers(page, pageSize)}
      />
      {/* Model to delete html */}
      <Drawer
        className="ant-drawer-title"
        title="Add User"
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
        title="Edit User"
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
