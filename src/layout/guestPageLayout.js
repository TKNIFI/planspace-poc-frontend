import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

export default function GuestPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <>
      <Layout
        style={{
          height: "150vh",
          display: "flex",
          flexDirection:"row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            padding: 50,
            minHeight: 280,
            maxWidth: 1700,
          }}
        >
          {children}
        </Content>
      </Layout>
    </>
  );
}
