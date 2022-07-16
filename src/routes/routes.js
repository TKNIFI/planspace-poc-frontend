import React from "react";
import Dashboard from "../features/dashboard/dashboard";
import Login from "../features/login/login";
import Locations from "../features/Locations/Locations";
// import EditLocation from "../features/Locations/EditLocation";
import RegisterInvited from "../features/register/invitedRegister/register";
import Register from "../features/register/Register/register";
import Unauthorized from "../features/unauthorized/unauthorized";
import Users from "../features/users/users";
import GuestPageLayout from "../layout/guestPageLayout";
import LoggedInPageLayout from "../layout/loggedInPageLayout";
import K from "../utilities/constants";
import Companies from "../features/companies/companies";
import ServicePack from "../features/servicePackages/servicePacakges";
import Addons from "../features/servicePackages/addons";
import TeamInvitation from "../features/TeamMemberInvitation/teamMemberInvitation";
import ResetPassword from "../features/login/resetPassword";
import PasswordResetMail from "../features/login/passwordResetMail";
import ResetingPassword from "../features/resetingPassword/resetingPassword";
import Verifiy from "../features/register/Register/verify";

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
    path: "/register/invited",
    name: "Register",
    component: RegisterInvited,
    layout: GuestPageLayout,
  },
  {
    path: "/register/activate",
    name: "Activate",
    component: Verifiy,
    layout: GuestPageLayout,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: GuestPageLayout,
  },
  {
    path: "/forgot_password",
    name: "Forgot Password",
    component: ResetPassword,
    layout: GuestPageLayout,
  },
  {
    path: "/account/password/change",
    name: "reset password",
    component: ResetingPassword,
    layout: GuestPageLayout,
  },
  // {
  //   path: "/pwdresetmail",
  //   name: "Password Reset Mail",
  //   component: PasswordResetMail,
  //   layout: GuestPageLayout,
  // },
  // {
  //   path: "/Company Profile/Company Settings",
  //   name: "companySettings",
  //   component: Companies,
  //   authenticated: false,
  //   roles: [K.Roles.Admin],
  //   layout: LoggedInPageLayout,
  // },
  {
    path: "/company_settings/locations",
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
    path: "/company_settings/packages",
    name: "Service Package",
    component: ServicePack,
    layout: LoggedInPageLayout,
  },
  {
    path: "/company_settings/addons",
    name: "Service Package",
    component: Addons,
    layout: LoggedInPageLayout,
  },
  {
    path: "/company_settings/team",
    name: "Service Package",
    component: TeamInvitation,
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
