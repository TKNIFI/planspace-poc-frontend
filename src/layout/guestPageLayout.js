import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

export default function GuestPageLayout({ children }) {
    const { Content } = Layout;
    return (
        <Layout>
            <Layout>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 50,
                        minHeight: 280,
                        marginLeft: 250,
                        maxWidth: 1700,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
