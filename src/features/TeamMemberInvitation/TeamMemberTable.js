import { Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./TeamMemberTable.css";
import { Checkbox } from "antd";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const TeamMemberTable = ({
    tableRow,
    setOpenEditForm,
    editValues,
    handleDelete,
    updateUser,
    getUsers,
    loading,
}) => {
    const [count, setCount] = useState(2);

    const [data, setData] = useState([]);

    if (tableRow) {
        // setDataSource(tableRow);
    }
    useEffect(() => {
        // setData(tableRow);
        // let obj;
        // for (let i = 0; i < props.tableRow.length(); i++) {
        //   obj = {
        //     key: props.tableRow.id,
        //     name: "Edward King 1",
        //     active: <Checkbox />,
        //     address: "London, Park Lane no. 1",
        //   };
        // }
    }, []);

    const handleEditForm = (record) => {
        setOpenEditForm(true);
        editValues(record);
    };

    // const handleDelete = async (uid) => {
    //   await myApi
    //     .delete(`${process.env.REACT_APP_BASE_URL}api/auth/user/${uid}/`)
    //     .then((result) => {
    //       toast.success(result.data.message);
    //       getUsers();
    //     });
    // };

    const defaultColumns = [
        {
            title: "Active",
            render: (record) => (
                <>
                    <Popconfirm
                        title={`Sure to ${
                            record.is_active ? "Deactivate" : "Activate"
                        }?`}
                        onConfirm={() =>
                            updateUser(record.is_active, record.id)
                        }
                    >
                        <Checkbox
                            disabled={record.is_logged_in ? true : false}
                            checked={record.is_active}
                        ></Checkbox>
                    </Popconfirm>
                </>
            ),
        },

        {
            title: "Name",
            // width: "30%",
            editable: false,
            render: (record) => (
                <>
                    {record.first_name ? record.first_name : ""}{" "}
                    {record.last_name ? record.last_name : ""}
                </>
            ),
        },
        {
            title: "Email",
            width: "40%",
            editable: false,
            render: (record) => (
                <>{record.primary_email_id ? record.primary_email_id : ""} </>
            ),
        },

        {
            title: "Access Location",
            dataIndex: "address",
        },
        {
            title: "Action",
            dataIndex: "operation",
            render: (_, record) =>
                tableRow.length >= 1 ? (
                    <>
                        <svg
                            width="15"
                            height="16"
                            onClick={() => handleEditForm(record)}
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.7189 3.53922L11.9801 0.781641C11.7992 0.60126 11.5543 0.5 11.299 0.5C11.0437 0.5 10.7988 0.60126 10.6178 0.781641L0.90865 10.4939L0.0221836 14.3265C-0.00839653 14.4666 -0.00734822 14.6118 0.0252518 14.7514C0.0578519 14.891 0.12118 15.0216 0.210611 15.1336C0.300041 15.2456 0.413314 15.3361 0.542155 15.3987C0.670996 15.4612 0.81215 15.4941 0.955306 15.4949C1.02201 15.5017 1.08922 15.5017 1.15593 15.4949L5.02372 14.6069L14.7189 4.90398C14.8989 4.72268 15 4.47734 15 4.2216C15 3.96585 14.8989 3.72051 14.7189 3.53922ZM4.55716 13.7656L0.931978 14.5274L1.75779 10.966L9.02215 3.71682L11.8215 6.52114L4.55716 13.7656ZM12.4467 5.84343L9.64734 3.03911L11.271 1.42196L14.0237 4.22627L12.4467 5.84343Z"
                                fill="#676879"
                            />
                        </svg>
                    </>
                ) : null,
        },
    ];
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    return (
        <div>
            <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={tableRow}
                Style={{ fontFamily: "Fira Sans" }}
                columns={columns}
                loading={loading}
                pagination={false}
            />
        </div>
    );
};

export default TeamMemberTable;
