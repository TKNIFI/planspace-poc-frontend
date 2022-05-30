import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Badge,
    Stack,
    Grid,
    Dialog,
    AppBar,
    Toolbar,
    Slide,
    IconButton,
} from "@mui/material";

import { Typography as Muitypography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddMemberForm from "../forms/addMemberForm";
import { Space, Table, Checkbox, Popconfirm, Typography } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import axios from "axios";
import myApi from '../../network/axios'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
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
    const [tableRow, setTableRowData] = useState([]);
    const [editRecord, setEditRecord] = useState(null);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    async function handleDelete (uid) {
        console.log("uid", uid)
        await myApi.delete(`api/auth/user/${uid}/`).then((result) => {
            alert(result.data.message)
            getUsers()
        })
    };

    const columns = [
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
            render: (_, record) => (
                <Checkbox checked={record.active}></Checkbox>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => <p>{record.first_name ? record.first_name : "" + " " + record.last_name ? record.last_name : ""}</p>,
        },
        {
            title: "Email Address",
            dataIndex: "email",
            key: "email",
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
                            <Button
                                onClick={() => {
                                    handleClickOpen();
                                    setEditRecord(record);
                                }}
                            >
                                <EditOutlined />
                            </Button>
                            <Button>
                                {tableRow.length >= 1 ? (
                                    <Popconfirm
                                        title="Sure to delete?"
                                        onConfirm={() =>handleDelete(record.id)}
                                    >
                                        <a>
                                            <DeleteFilled />
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

    const getUsers = async () => {
        try {
            await myApi
                .get("https://planspace.herokuapp.com/api/auth/user/")
                .then((result) => {
                    console.log("result ", result)
                    setTableRowData(result.data.results)
                });
        } catch (error) {
            alert(error.response?.data?.message);
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
                            sx={{ textTransform: "capitalize", ml: 42 }}
                            onClick={handleClickOpen}
                        >
                            <AddIcon /> Add new
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {/* table */}
            <Box sx={{ marginTop: 2 }}>
                {tableRow ? <Table columns={columns} dataSource={tableRow} /> : "Loading . . . "}
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
                    editRecordValues={editRecord}
                    formValues={(values) =>
                        setTableRowData([...tableRow, values])
                    }
                    handleClose={(close) => setOpen(close)}
                />
            </Dialog>
        </>
    );
};
export default TeamInvitation;
