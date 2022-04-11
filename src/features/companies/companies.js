import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Company from "../../models/company/company";
import { projectStorage } from "../../utilities/storage";
import AddCompanyfrom from "../forms/AddCompanyfrom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Companies() {
  const [formValues, setFormValues] = useState({
    bname: "Business Name",
    owner: "admin@gmail.com",
    address1: "Address line 1",
    address2: "Address line 2",
    city: "City",
    state: "State",
    zipcode: "Zip Code",
    phone: "Mobile",
    email: "Company Email",
    image: "Image Url",
    is_mailingaddress_only: true,
  });
  const [file, setFile] = useState(null);
  const [editFormValues, setEditFormValues] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    console.log(values);
    const storageRef = projectStorage.ref(`Company-${Math.random()}`);
    try {
      storageRef.put(file).on(
        "state_changed",
        (snap) => {},
        (err) => {
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          if (editFormValues) {
            Company.DeleteLocation({
              formValues,
              location_image: url,
            }).catch((err) => alert("Please Fill All Fields",err));
            console.log(formValues.id);
          } else {
            await Company.CreateLocation({
              formValues,
              location_image: url,
            }).catch((err) => alert("Please Fill All Fields",err));
          }
          setFile("");
        }
      );
    } catch (err) {}
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
          <PlusCircleOutlined /> Add new company
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
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
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
        <AddCompanyfrom onSubmit={(values) => onFinish(values)} />
      </Dialog>
    </>
  );
}
