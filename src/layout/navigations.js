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
    path: `${basePath}/Company Settings`,
    name: "Company Settings",
  },
  { path: `${basePath}/locations`, name: "Locations" },
];

const childrenForServicePackages = (basePath) =>[
  {
    path: `${basePath}/Packages`,
    name: "Packages",
  },
  {
    path: `${basePath}/AddOns`,
    name: "Add-Ons",
  },
]
const navigations = [
  {
    name: "Company Profile",
    path: "/Company Profile",
    icon: <InsertRowLeftOutlined />,
    roles: [K.Roles.Admin],
    children: childrenForCompanyProfile("/Company Profile"),
  },
  {
    name: "Service Package",
    icon: <ShoppingOutlined />,
    path: "/service Package",
    roles: [K.Roles.Admin],
    children: childrenForServicePackages("/service Package"),
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
