import React from "react";
import { Layout, Menu, Input, Space, Image } from "antd";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes/routes";
import styles from "./layout.module.scss";
import planLogo from "../assets/images/plan.png";
const { Search } = Input;
export default function AppHeader() {
  console.log(styles);
  const { Header } = Layout;
  const location = useLocation();
  return (
    <Header className={styles["site-layout-background"]} style={{ padding: 0 }}>
      <Space>
        <img width={"112px"} height={"33px"} src={planLogo} style={{borderRadius:"2px", marginLeft:"5px"}} alt="logo" />
        <Search placeholder="search..." style={{ width: 300}} />
      </Space>
    </Header>
  );
}
