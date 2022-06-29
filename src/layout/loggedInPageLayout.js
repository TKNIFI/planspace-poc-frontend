import React from "react";
import { Layout } from "antd";
import AppHeader from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import "antd/dist/antd.css";
import styles from "./layout.module.scss";
import Pusher from "pusher-js";
import { useHistory } from "react-router-dom";

import toast from "react-hot-toast";
import { duration } from "moment";

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  const history = useHistory();

  const checkUserStatus = async () => {
    let userInfo = localStorage.getItem("userInfo")
    if (!userInfo) {
      localStorage.removeItem("userInfo")
      history.push("/login")
    }
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_API_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe("planspace_user");
    channel.bind("update_user", function (user) {
      if (!user.is_active) {
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
          if (userInfo.user_id === user.id) {
            toast.error("Your account has been deactivated by the admin")
            localStorage.removeItem("userInfo")
            history.push("/login")
          }
        }
      }
    });
  };

  React.useEffect(() => {
    checkUserStatus();
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
