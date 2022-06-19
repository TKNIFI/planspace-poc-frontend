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
import toast, { Toaster } from "react-hot-toast";
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
        console.log("uid", uid);
        await myApi.delete(`api/auth/user/${uid}/`).then((result) => {
            toast.success(result.data.message);
            getUsers();
        });
    }
    
    async function updateUser(is_active, uid) {
        await myApi.put(`api/auth/user/${uid}/`, {is_active: !is_active}).then((result) => {
            toast.success(`User ${is_active? "deactivated": "activated"} successfully`);
            getUsers();
        });
    }

    const columns = [
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
            render: (_, record) => (
                <Checkbox onChange={() => updateUser(record.is_active, record.id)} checked={record.is_active}></Checkbox>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <>
                    {record.first_name ? record.first_name : ""}{" "}
                    {record.last_name ? record.last_name : ""}
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
            render: (record) => {
                return (
                    <>
                        <Space key={record.id} size="middle">
                            <a
                                onClick={() => {
                                    console.log("record", record);
                                    setOpenEditForm(true);
                                    setEditRecord(record);
                                }}
                            >
                                <EditOutlined style={{ color: "gray" }} />
                            </a>
                            {!record.is_logged_in? (
                            <a>
                                {tableRow.length >= 1 ? (
                                    <Popconfirm
                                        title="Sure to delete?"
                                        onConfirm={() =>
                                            handleDelete(record.id)
                                        }
                                    >
                                        <DeleteOutlined
                                            style={{ color: "gray" }}
                                        />
                                    </Popconfirm>
                                ) : null}
                            </a>
                            ): ""}
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
            <Toaster position="top-right" />
            <Box sx={{ flexGrow: 1, display: "inline" }}>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            style={{
                                textTransform: "capitalize",
                                float: "right",
                            }}
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
                    pagination={false}
                    loading={loading}
                />
                <Pagination 
                sx={{marginTop: 2, float: "right"}}
                defaultCurrent={limit} 
                total={count} 
                onChange={(page, pageSize) => getUsers(page, pageSize)}
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
                    formValues={(values) =>
                        setTableRowData([...tableRow, values])
                    }
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
