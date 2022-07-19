import React from "react";
import K from "../utilities/constants";
import {
  InsertRowLeftOutlined,
  TeamOutlined,
  RetweetOutlined,
  DesktopOutlined,
  TableOutlined,
  BookOutlined,
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
  // {
  //   path: `${basePath}/Company Settings`,
  //   name: "Company Settings",
  // },
  { path: `${basePath}/locations`, name: "Venues" },
  {
    path: `${basePath}/packages`,
    name: "Packages",
  },
  {
    path: `${basePath}/addons`,
    name: "Add-Ons",
  },
  {
    path: `${basePath}/team`,
    name: "Team",
  },
];

// const childrenForServicePackages = (basePath) =>[
//   {
//     path: `${basePath}/Packages`,
//     name: "Packages",
//   },
//   {
//     path: `${basePath}/AddOns`,
//     name: "Add-Ons",
//   },
// ]

const childrenForIntegration = (basePath) => [
  {
    path: `${basePath}/website`,
    name: "Website",
  },
  {
    path: `${basePath}/link Stripe`,
    name: "Link Stripe",
  },
];

const childrenForSubscription = (basePath) => [
  {
    path: `${basePath}/PaymentMethod`,
    name: "Add Payment Method",
  },
];
const navigations = [
  {
    name: "Dashboard",
    path: "/",
    icon: <TableOutlined />,
  },
  {
    name: "Events",
    path: "/",
    icon: <BookOutlined />,
  },
  {
    name: "Company Settings",
    path: "/company_settings",
    icon: <InsertRowLeftOutlined />,
    roles: [K.Roles.Admin],
    children: childrenForCompanyProfile("/company_settings"),
  },
  // {
  //   name: "Service Package",
  //   icon: <ShoppingOutlined />,
  //   path: "/service Package",
  //   roles: [K.Roles.Admin],
  //   children: childrenForServicePackages("/service Package"),
  // },
  {
    name: "Integration",
    path: "/",
    icon: <DesktopOutlined />,
    children: childrenForIntegration("/Integration"),
  },
  {
    name: "Subscription",
    path: "/",
    icon: <TeamOutlined />,
    children: childrenForSubscription("/Subscription"),
  },
  {
    name: "FAQ",
    path: "/",
    icon: <RetweetOutlined />,
  },
];

export default navigations;
