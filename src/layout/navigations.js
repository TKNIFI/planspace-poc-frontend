import React from "react";
import K from "../utilities/constants";
import {
  InsertRowLeftOutlined,
  TeamOutlined,
  ContactsOutlined,
  ShoppingOutlined,
  DesktopOutlined,
} from "@ant-design/icons";

// Template a navigation item
// {
//     name: 'User',
//     path: '/user/list',
//     icon: <ProjectOutlined />,
//     roles: [],
//     children: [], // If item has children, then the path field will be ignored.
// }

const childrenForCompanyProfile = (basePath) => [
  {
    path: `${basePath}/company`,
    name: "Company Settings",
  },
  { path: `${basePath}/locations`, name: "Locations" },
];

const navigations = [
  {
    name: "Company Profile",
    path: "/companyprofile",
    icon: <InsertRowLeftOutlined />,
    roles: [K.Roles.Admin],
    children: childrenForCompanyProfile("/companyprofile"),
  },
  {
    name: "Service Package",
    icon: <ShoppingOutlined />,
    path: "/",
    // children: defaultChildren("/Location"),
  },
  {
    name: "Website integration",
    path: "/",
    icon: <DesktopOutlined />,
  },
  {
    name: "Teams",
    path: "/",
    icon: <TeamOutlined />,
  },
  {
    name: "Contact Us",
    path: "/",
    icon: <ContactsOutlined />,
  },
];

export default navigations;
