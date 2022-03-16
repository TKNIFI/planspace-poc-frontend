import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./layout.module.scss";
import navigations from "./navigations";
import planLogo from "../assets/images/plan.png";

export default function Sider() {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className={styles["logo"]}>
        <span>
          <img
            style={{ width: "112px", height: "28px", borderRadius: "5px" }}
            src={planLogo}
            alt="logo"
          />
        </span>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {navigations.map((navigation, i) => {
          if ((navigation.children?.length ?? 0) > 0) {
            return (
              <SubMenu key={i} icon={navigation.icon} title={navigation.name}>
                {navigation.children.map((subNavigation, j) => (
                  <Menu.Item key={`${i}_${j}`}>
                    <Link to={subNavigation.path}>{subNavigation.name}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={i} icon={navigation.icon}>
                <Link to={navigation.path}>{navigation.name}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Sider>
  );
}
