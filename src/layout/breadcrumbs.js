import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
export default function Breadcrumbs() {
  const history = useHistory();
  const location = useLocation();
  console.log("history", history);
  console.log("location", location);
  return (
    <Breadcrumb>
        <Breadcrumb.Item><HomeOutlined style={{ fontSize: "16px" }} /></Breadcrumb.Item>
        {location.pathname}
      {/* <Breadcrumb.Item>Company profile</Breadcrumb.Item>
      <Breadcrumb.Item>Company settings</Breadcrumb.Item> */}
    </Breadcrumb>
  );
}
