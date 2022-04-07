import React from "react";
import { Layout } from "antd";
import AppHeader from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import "antd/dist/antd.css";
import styles from "./layout.module.scss";

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <>
      <AppHeader />
      <Layout style={{ minHeight: "90vh" }}>
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
