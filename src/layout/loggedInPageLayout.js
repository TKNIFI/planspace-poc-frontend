import React from "react";
import { Layout } from "antd";
import AppHeader from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import "antd/dist/antd.css";
import styles from "./layout.module.scss";
import { useHistory } from "react-router-dom";

import axios from "axios";

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  const history = useHistory();

  const isUserActivated = async (access_token) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}api/auth/verify/`, {
        token: access_token,
      })
      .then((response) => {
        const data = response.data.data;

        console.log("data in axios => ", data.is_active);
        if (!data.is_active) {
          window.localStorage.removeItem("UserInfo");
          history.push("/login");
        }
      })
      .catch((error) => {
        history.push("/login");
      });
  };

  React.useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const obj = JSON.parse(userInfo);
    isUserActivated(obj?.access);
    if (!userInfo) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <AppHeader />
      <Layout className="layout-design">
        <Layout className={styles["site-layout"]}>
          <Sider />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumbs />
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
