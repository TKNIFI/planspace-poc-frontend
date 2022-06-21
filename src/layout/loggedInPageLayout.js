import React from "react";
import { Layout } from "antd";
import AppHeader from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import "antd/dist/antd.css";
import styles from "./layout.module.scss";
import { useHistory } from "react-router-dom";

export default function LoggedInPageLayout({ children }) {
    const { Content } = Layout;
    const history = useHistory();

    React.useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
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
