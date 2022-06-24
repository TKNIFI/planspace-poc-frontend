import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import navigations from "./navigations";
import "./sider.css";

export default function Sider() {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <Sider
        collapsible
        width={300}
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ backgroundColor: "#003399" }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          defaultOpenKeys={["0"]}
          mode="inline"
          style={{ backgroundColor: "#003498" }}
        >
          {navigations.map((navigation, i) => {
            if ((navigation.children?.length ?? 0) > 0) {
              return (
                <SubMenu key={i} icon={navigation.icon} title={navigation.name}>
                  {navigation.children.map((subNavigation, j) => {
                    return (
                      <>
                        <Menu.Item
                          key={`${i}_${j}`}
                          style={{ paddingLeft: "48px", margin: "-1%" }}
                        >
                          <Link to={subNavigation.path}>
                            {subNavigation.name}
                          </Link>
                        </Menu.Item>
                      </>
                    );
                  })}
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
    </>
  );
}
