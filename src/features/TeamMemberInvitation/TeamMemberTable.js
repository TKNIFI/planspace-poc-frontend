import { Button, Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./TeamMemberTable.css";
import { Checkbox } from "antd";
import { TableRow } from "@mui/material";
import { TableRows } from "@mui/icons-material";
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

const TeamMemberTable = ({ tableRow, setOpenEditForm }) => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Edward King 0",
      active: <Checkbox />,
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      active: <Checkbox />,
      address: "London, Park Lane no. 1",
    },
  ]);
  const [count, setCount] = useState(2);

  const [data, setData] = useState([]);

  // console.log("table Row : ", data, TableRow);

  if (tableRow) {
    console.log("table in row otus", tableRow[0]);
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

  const handleEditForm = () => {
    setOpenEditForm(true);
  };

  const handleDelete = (key) => {
    await myApi.delete(`api/auth/user/${uid}/`).then((result) => {
      toast.success(result.data.message);
      getUsers();
    });
  };

  const defaultColumns = [
    {
      title: "Active",
      // dataIndex: "is_active",
      render: (record) => (
        <>
        <Checkbox checked={record.is_active}></Checkbox>
        </>
      )
    },

    {
      title: "Name",
      // dataIndex: "first_name",
      width: "30%",
      editable: false,
      render: (record) => (
        <>
        {record.first_name? record.first_name: "" + " " + record.last_name? record.last_name: ""}
        </>
      ) 
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
              onClick={handleEditForm}
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7189 3.53922L11.9801 0.781641C11.7992 0.60126 11.5543 0.5 11.299 0.5C11.0437 0.5 10.7988 0.60126 10.6178 0.781641L0.90865 10.4939L0.0221836 14.3265C-0.00839653 14.4666 -0.00734822 14.6118 0.0252518 14.7514C0.0578519 14.891 0.12118 15.0216 0.210611 15.1336C0.300041 15.2456 0.413314 15.3361 0.542155 15.3987C0.670996 15.4612 0.81215 15.4941 0.955306 15.4949C1.02201 15.5017 1.08922 15.5017 1.15593 15.4949L5.02372 14.6069L14.7189 4.90398C14.8989 4.72268 15 4.47734 15 4.2216C15 3.96585 14.8989 3.72051 14.7189 3.53922ZM4.55716 13.7656L0.931978 14.5274L1.75779 10.966L9.02215 3.71682L11.8215 6.52114L4.55716 13.7656ZM12.4467 5.84343L9.64734 3.03911L11.271 1.42196L14.0237 4.22627L12.4467 5.84343Z"
                fill="#676879"
              />
            </svg>

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                style={{ width: "23px", height: "19px", marginLeft: "8px" }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 7V11C6.5 11.1326 6.55268 11.2598 6.64645 11.3536C6.74021 11.4473 6.86739 11.5 7 11.5C7.13261 11.5 7.25979 11.4473 7.35355 11.3536C7.44732 11.2598 7.5 11.1326 7.5 11V7C7.5 6.86739 7.44732 6.74021 7.35355 6.64645C7.25979 6.55268 7.13261 6.5 7 6.5C6.86739 6.5 6.74021 6.55268 6.64645 6.64645C6.55268 6.74021 6.5 6.86739 6.5 7ZM9 6.5C9.13261 6.5 9.25979 6.55268 9.35355 6.64645C9.44732 6.74021 9.5 6.86739 9.5 7V11C9.5 11.1326 9.44732 11.2598 9.35355 11.3536C9.25979 11.4473 9.13261 11.5 9 11.5C8.86739 11.5 8.74021 11.4473 8.64645 11.3536C8.55268 11.2598 8.5 11.1326 8.5 11V7C8.5 6.86739 8.55268 6.74021 8.64645 6.64645C8.74021 6.55268 8.86739 6.5 9 6.5ZM10 4H13C13.1326 4 13.2598 4.05268 13.3536 4.14645C13.4473 4.24021 13.5 4.36739 13.5 4.5C13.5 4.63261 13.4473 4.75979 13.3536 4.85355C13.2598 4.94732 13.1326 5 13 5H12.447L11.695 11.776C11.6271 12.3875 11.336 12.9525 10.8775 13.3629C10.419 13.7732 9.8253 14.0001 9.21 14H6.79C6.1747 14.0001 5.58098 13.7732 5.12249 13.3629C4.664 12.9525 4.37293 12.3875 4.305 11.776L3.552 5H3C2.86739 5 2.74021 4.94732 2.64645 4.85355C2.55268 4.75979 2.5 4.63261 2.5 4.5C2.5 4.36739 2.55268 4.24021 2.64645 4.14645C2.74021 4.05268 2.86739 4 3 4H6C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2C8.53043 2 9.03914 2.21071 9.41421 2.58579C9.78929 2.96086 10 3.46957 10 4ZM8 3C7.73478 3 7.48043 3.10536 7.29289 3.29289C7.10536 3.48043 7 3.73478 7 4H9C9 3.73478 8.89464 3.48043 8.70711 3.29289C8.51957 3.10536 8.26522 3 8 3ZM4.559 5L5.299 11.666C5.33985 12.0329 5.51453 12.3718 5.78962 12.6179C6.0647 12.864 6.42088 13.0001 6.79 13H9.21C9.57895 12.9998 9.93488 12.8636 10.2098 12.6175C10.4846 12.3715 10.6592 12.0327 10.7 11.666L11.442 5H4.56H4.559Z"
                  fill="#676879"
                />
              </svg>
            </Popconfirm>
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
        columns={columns}
      />
    </div>
  );
};

export default TeamMemberTable;
