import React, { useState, useEffect } from "react";
import "./location.scss";
import {
  Form,
  Modal,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Tabs,
  Card,
  Avatar,
} from "antd";
import "./projects.css";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Location from "../../models/Locations/Location";
import { projectStorage } from "../../utilities/storage";
import AddCompanyfrom from "../forms/AddCompanyfrom";
import Companies from "../companies/companies"
const { Option } = Select;
const { TabPane } = Tabs;
const { Meta } = Card;
const { confirm } = Modal;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Locations() {
  const [formValues, setFormValues] = useState({
    zip_code: "00000",
    city: "New York",
    state: "Alaska",
    location_name: "Location Name",
    address1: "Adress 1",
    address2: "Address 2",
    phone: "12345",
    email: "test@gmail.com",
    define_space: "Gardens",
    is_mailingaddress_only: true,
  });
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Locations, setLocations] = useState(null);
  const [file, setFile] = useState(null);
  const [editFormValues, setEditFormValues] = useState(null);
  const plainOptions = ["Resturants", "Gardens", "Beach", "Parks"];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name);
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getLocation = async () => {
    let response = Location.GetLocations();
    console.log(
      "get api ",
      response.then((response) => {
        return response;
      })
    );
    setLocations(response);
    console.log(Locations);
  };
  const showModal = () => {
    setEditFormValues("");
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this location?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        handleCancel();
      },
    });
  };

  const successMsg = () => {
    Modal.success({
      title: "Location added sucessfully",
    });
  };

  const updateMesg = () => {
    Modal.success({
      title: "Location updated successfully",
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);

    form.submit();
    form.resetFields();
  };
  const onFinish = async (values) => {
    console.log(values);
    const storageRef = projectStorage.ref(`Location-${Math.random()}`);
    try {
      storageRef.put(file).on(
        "state_changed",
        (snap) => {},
        (err) => {
          Modal.error({
            title: "Please Select Image",
          });
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          if (editFormValues) {
            Location.DeleteLocation({
              formValues,
              location_image: url,
            }).catch((err) => alert("Please Fill All Fields"));
            console.log(formValues.id);
            updateMesg();
          } else {
            await Location.CreateLocation({
              formValues,
              location_image: url,
            }).catch((err) => alert("Please Fill All Fields"));
            successMsg();
          }
          setFile("");
        }
      );
    } catch (e) {
      Modal.error({
        title: "Please Select Image",
      });
    }
  };
  function callback(key) {
    console.log(key);
  }
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setFile(e.target.files[0]);
    return e && e.fileList;
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function onChange(values) {
    console.log(`checked = ${values}`);
    setFormValues((prev) => {
      return {
        ...prev,
        define_space: values.toString(),
      };
    });
  }

  const handleSelectCityChange = (value) => {
    setFormValues((prev) => {
      return {
        ...prev,
        city: value,
      };
    });
  };

  const handleSelectStateChange = (value) => {
    setFormValues((prev) => {
      return {
        ...prev,
        state: value,
      };
    });
  };

  const handleMail = (value, e) => {
    e.preventDefault();
    if (value) {
      setFormValues((prev) => {
        return {
          ...prev,
          is_mailingaddress_only: true,
        };
      });
    }
    console.log(value, e.target.name);
  };
  const handlePhysical = (value, e) => {
    e.preventDefault();
    if (value) {
      setFormValues((prev) => {
        return {
          ...prev,
          is_physical_main_location: true,
        };
      });
    }
    console.log(value, e.target.name);
  };
  const handleVirtual = (value, e) => {
    e.preventDefault();
    if (value) {
      setFormValues((prev) => {
        return {
          ...prev,
          is_virtual_location: true,
        };
      });
    }
    console.log(value, e.target.name);
  };

  //Call to fetch location by Id

  const handleEdit = (id) => {
    console.log(id);
    Location.getLocationBy(id)
      .get()
      .then((docRef) => {
        setEditFormValues({ id, ...docRef.data() });
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    try {
      Location.DeleteLocation(id).then((res) => {
        if (res.status === 202) {
          Modal.success({
            title: "Deleted Successfully",
          });
        }
      });
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  return (
    <>
      <div
        style={{
          marginLeft: "10px",
          margin: "10px 0px",
        }}
      >
        <Button
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "white",
            color: "#ccc",
            border: "none",
          }}
          type="primary"
          onClick={handleClickOpen}
        >
          {" "}
          <PlusCircleOutlined /> Add new Location
        </Button>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {/* {Locations?.map(({ formValues, location_image, id }) => (
            <Col span={8} style={{ marginBottom: "10px" }} key={id}>
              <div id="card-wrapper">
                <Card
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setEditFormValues("");
                        handleEdit(id);
                      }}
                    />,
                    <DeleteOutlined onClick={() => showDeleteConfirm(id)} />,
                  ]}
                  cover={
                    <div className="image-wrapper">
                      <img
                        className="cover"
                        alt="example"
                        src={location_image}
                      />
                    </div>
                  }
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={formValues?.location_name}
                    description={
                      formValues?.address1
                        ? formValues?.address1
                        : "description"
                    }
                  />
                </Card>
              </div>
            </Col>
          ))} */}
        </Row>
      </div>

      {/* Model html */}
      <Dialog
        fullScreen
        maxWidth="md"
        sx={{ pl:70 }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", width: "100%" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New Business Name
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
        <AddCompanyfrom />
      </Dialog>
      {/* <Modal
                title={editFormValues ? "Update Location" : "New location Name"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {editFormValues ? (
                    <h4 style={{ textAlign: "center" }}>
                        Location Name:{" "}
                        {editFormValues?.formValues?.location_name}
                    </h4>
                ) : null}
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    form={form}
                    onFinish={onFinish}
                    //onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="row" gutter={16}>
                        <Col
                            className="gutter-row input-field-bottom"
                            span={16}
                        >
                            <Form.Item
                                name="location_name"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "Please input your username!",
                                //   },
                                // ]}
                            >
                                <Input
                                    name="location_name"
                                    defaultValue={
                                        editFormValues?.formValues
                                            ?.location_name
                                    }
                                    onChange={handleChange}
                                    placeholder="Location"
                                />
                            </Form.Item>
                            <Form.Item
                                name="address1"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "Please input your Address Line 1!",
                                //   },
                                // ]}
                            >
                                <Input
                                    name="address1"
                                    defaultValue={
                                        editFormValues?.formValues?.address1
                                    }
                                    onChange={handleChange}
                                    placeholder="Address Line 1"
                                />
                            </Form.Item>
                            <Form.Item name="address2">
                                <Input
                                    name="address2"
                                    onChange={handleChange}
                                    placeholder="Address Line 2"
                                    defaultValue={
                                        editFormValues?.formValues?.address2
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row input-bottom" span={8}>
                            <Form.Item
                                name="location_image"
                                label={
                                    editFormValues ? "Uploaded File" : "Upload"
                                }
                                valuePropName="fileList"
                                // getValueFromEvent={normFile}
                            >
                                {editFormValues ? (
                                    <img
                                        style={{
                                            width: "30px",
                                            marginBottom: 5,
                                        }}
                                        src={editFormValues.location_image}
                                        alt={
                                            editFormValues.formValues
                                                .location_name
                                        }
                                    />
                                ) : null}
                                <input
                                    type="file"
                                    onChange={normFile}
                                    accept="*"
                                />
                            </Form.Item>
                        </Col>
                        <Row gutter={[16, 24]}>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    name="city"
                                    // rules={[{ required: true, message: "Please select City!" }]}
                                >
                                    <Select
                                        onChange={handleSelectCityChange}
                                        name="city"
                                        defaultValue={
                                            editFormValues?.formValues?.city
                                        }
                                        placeholder="select City"
                                        style={{ width: "100%" }}
                                    >
                                        <Option value="New York">
                                            New York
                                        </Option>
                                        <Option value="Los Angeles">
                                            Los Angeles
                                        </Option>
                                        <Option value="Chicago">Chicago</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    name="state"
                                    // rules={[{ required: false, message: "Please select State!" }]}
                                >
                                    <Select
                                        onChange={handleSelectStateChange}
                                        name="city"
                                        defaultValue={
                                            editFormValues?.formValues?.state
                                        }
                                        placeholder="select state"
                                        style={{ width: "100%" }}
                                    >
                                        <Option value="Alaska">Alaska</Option>
                                        <Option value="Arkansa">Arkansa</Option>
                                        <Option value="California">
                                            California
                                        </Option>
                                        <Option value="California">
                                            Colorado
                                        </Option>
                                        <Option value="California">
                                            Delaware
                                        </Option>
                                        <Option value="California">
                                            Florida
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    name="ZipCode"
                                    // rules={[
                                    //   {
                                    //     required: false,
                                    //     message: "Please input Zipcode!",
                                    //   },
                                    // ]}
                                >
                                    <Input
                                        name="zip_code"
                                        onChange={handleChange}
                                        defaultValue={
                                            editFormValues?.formValues?.zip_code
                                        }
                                        placeholder="ZipCode"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 24]}>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    label="Mailing Address Only"
                                    valuePropName="checked"
                                >
                                    <Switch
                                        onChange={handleMail}
                                        name="is_mailingaddress_only"
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    label="Physical Main Location"
                                    valuePropName="checked"
                                >
                                    <Switch
                                        onChange={handlePhysical}
                                        name="is_physical_main_location"
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    label="Virtual location "
                                    valuePropName="checked"
                                >
                                    <Switch
                                        onChange={handleVirtual}
                                        name="is_virtual_location"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 24]}>
                            <Col className="gutter-row" span={24}>
                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    <TabPane tab="Contacts" key="1">
                                        <Row gutter={[16, 24]}>
                                            <Col
                                                className="gutter-row"
                                                span={24}
                                            >
                                                <Form.Item
                                                    name="isCopied"
                                                    valuePropName="checked"
                                                >
                                                    <Checkbox>
                                                        copy contacts from
                                                        company profile
                                                    </Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={[16, 24]}>
                                            <Col
                                                className="gutter-row"
                                                span={12}
                                            >
                                                <Form.Item name="phone">
                                                    <Input
                                                        onChange={handleChange}
                                                        defaultValue={
                                                            editFormValues
                                                                ?.formValues
                                                                ?.phone
                                                        }
                                                        name="phone"
                                                        placeholder="Phone Number"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                className="gutter-row"
                                                span={12}
                                            >
                                                <Input
                                                    onChange={handleChange}
                                                    defaultValue={
                                                        editFormValues
                                                            ?.formValues?.email
                                                    }
                                                    name="email"
                                                    placeholder="Email Address"
                                                />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Define Spaces" key="2">
                                        <Row gutter={[16, 24]}>
                                            <Col
                                                className="gutter-row"
                                                span={6}
                                            >
                                                <Checkbox.Group
                                                    options={plainOptions}
                                                    defaultValue={
                                                        editFormValues
                                                            ? editFormValues?.formValues.define_space?.split(
                                                                  ","
                                                              )
                                                            : ["Gardens"]
                                                    }
                                                    onChange={onChange}
                                                />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Modal> */}
    </>
  );
}
