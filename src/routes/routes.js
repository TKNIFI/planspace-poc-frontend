import React from "react";
import Dashboard from "../features/dashboard/dashboard";
import Login from "../features/login/login";
import Locations from "../features/Locations/Locations";
// import EditLocation from "../features/Locations/EditLocation";
import Register from "../features/register/register";
import Unauthorized from "../features/unauthorized/unauthorized";
import Users from "../features/users/users";
import GuestPageLayout from "../layout/guestPageLayout";
import LoggedInPageLayout from "../layout/loggedInPageLayout";
import K from "../utilities/constants";
import Companies from "../features/companies/companies";
import ServicePack from "../features/servicePackages/servicePacakges";
import Addons from "../features/servicePackages/addons";
// Template for a route
// {
//   path: '/login',
//   name: "Login",
//   component: Login,
//   authenticated: false,
//   roles: [],
//   children: [],
//   layout: LoggedInPageLayout
// },

const defaultCrudChildren = [
  { path: "/details/:id", name: "Details" },
  { path: "/store/:id", name: "Edit" },
];

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: GuestPageLayout,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: GuestPageLayout,
  },
  {
    path: "/Company Profile/Company Settings",
    name: "companySettings",
    component: Companies,
    authenticated: false,
    roles: [K.Roles.Admin],
    layout: LoggedInPageLayout,
  },
  {
    path: "/Company Profile/locations",
    name: "Locations",
    component: Locations,
    authenticated: false,
    roles: [K.Roles.Admin],
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  {
    path: "/Locations/:id",
    name: "Locations",
    component: Login,
    authenticated: false,
    roles: [K.Roles.Admin],
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  // {
  //   path: "/editlocation/:id",
  //   component: EditLocation,
  //   authenticated: true,
  // },
  {
    path: "/service Package/Packages",
    name: "Service Package",
    component: ServicePack,
    layout: LoggedInPageLayout,
  },
  {
    path: "/service Package/AddOns",
    name: "Service Package",
    component: Addons,
    layout: LoggedInPageLayout,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    authenticated: false,
    roles: [],
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    authenticated: false,
    roles: [],
    layout: GuestPageLayout,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    authenticated: false,
    layout: LoggedInPageLayout,
  },
];

export default routes;
