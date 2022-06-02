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
import { Typography as Muitypography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddMemberForm from "../forms/addMemberForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditMemberForm from "../forms/editMemberForm";
import {
    Space,
    Table,
    Checkbox,
    Popconfirm,
    Typography,
    Pagination,
} from "antd";
import axios from "axios";
import myApi from "../../network/axios";
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
            alert(result.data.message);
            getUsers();
        });
    }

    const columns = [
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
            render: (_, record) => (
                <Checkbox checked={record.is_active}></Checkbox>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <p>
                    {record.first_name
                        ? record.first_name
                        : "" + " " + record.last_name
                        ? record.last_name
                        : ""}
                </p>
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
                            <Button
                                onClick={() => {
                                    setOpenEditForm(true);
                                    setEditRecord(record);
                                }}
                            >
                                <EditOutlined />
                            </Button>
                            <Button>
                                {tableRow.length >= 1 ? (
                                    <Popconfirm
                                        title="Sure to delete?"
                                        onConfirm={() =>
                                            handleDelete(record.id)
                                        }
                                    >
                                        <a>
                                            <DeleteOutlined />
                                        </a>
                                    </Popconfirm>
                                ) : null}
                            </Button>
                        </Space>
                    </>
                );
            },
        },
    ];

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
            alert(error?.data?.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
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
            <Box sx={{ marginTop: 2 }}>
                <Table
                    columns={columns}
                    dataSource={tableRow}
                    pagination={false}
                    loading={loading}
                />
                <Pagination
                    sx={{ mt: 1 }}
                    defaultCurrent={1}
                    pageSize={limit}
                    total={count}
                    onChange={(page, pageSize) => getUsers(page, pageSize)}
                />
            </Box>
            {/* Model html */}
            <Dialog
                fullScreen
                maxWidth="md"
                sx={{ pl: 70 }}
                open={openAddForm}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <Muitypography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
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
                </AppBar>
                {/* form */}
                <AddMemberForm
                    formValues={(values) =>
                        setTableRowData([...tableRow, values])
                    }
                    callBack={() => getUsers()}
                    handleClose={(close) => setOpenAddForm(close)}
                />
            </Dialog>

            <Dialog
                fullScreen
                maxWidth="md"
                sx={{ pl: 70 }}
                open={openEditForm}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <Muitypography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
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
                </AppBar>
                {/* form */}
                <EditMemberForm
                    editRecordValues={editRecord}
                    formValues={(values) =>
                        setTableRowData([...tableRow, values])
                    }
                    callBack={() => getUsers()}
                    handleClose={(close) => setOpenEditForm(close)}
                />
            </Dialog>
        </>
    );
};
export default TeamInvitation;
