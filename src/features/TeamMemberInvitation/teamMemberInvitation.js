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
    const [tableRow, setTableRowData] = useState(data);
    const [editRecord, setEditRecord] = useState(null);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (uid) => {
        const newData = tableRow.filter((item) => item.userId !== uid);
        setTableRowData(newData);
    };

    const columns = [
        {
            title: "Active",
            dataIndex: "Active",
            key: "active",
            render: (_, record) => (
                <Checkbox checked={record.active}></Checkbox>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => <p>{record.name}</p>,
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
                                        onConfirm={() =>
                                            handleDelete(record.userId)
                                        }
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
            await axios
                .get("https://planspace.herokuapp.com/api/auth/user/")
                .then((result) => {
                    setTableRowData(result.response.data.results);
                });
        } catch (error) {
            alert(error.response.data.message);
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
                <Table columns={columns} dataSource={tableRow} />
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
