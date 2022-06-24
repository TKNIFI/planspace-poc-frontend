"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _dashboard = _interopRequireDefault(require("../features/dashboard/dashboard"));

var _login = _interopRequireDefault(require("../features/login/login"));

var _Locations = _interopRequireDefault(require("../features/Locations/Locations"));

var _register = _interopRequireDefault(require("../features/register/invitedRegister/register"));

var _register2 = _interopRequireDefault(require("../features/register/Register/register"));

var _unauthorized = _interopRequireDefault(require("../features/unauthorized/unauthorized"));

var _users = _interopRequireDefault(require("../features/users/users"));

var _guestPageLayout = _interopRequireDefault(require("../layout/guestPageLayout"));

var _loggedInPageLayout = _interopRequireDefault(require("../layout/loggedInPageLayout"));

var _constants = _interopRequireDefault(require("../utilities/constants"));

var _companies = _interopRequireDefault(require("../features/companies/companies"));

var _servicePacakges = _interopRequireDefault(require("../features/servicePackages/servicePacakges"));

var _addons = _interopRequireDefault(require("../features/servicePackages/addons"));

var _teamMemberInvitation = _interopRequireDefault(require("../features/TeamMemberInvitation/teamMemberInvitation"));

var _resetPassword = _interopRequireDefault(require("../features/login/resetPassword"));

var _passwordResetMail = _interopRequireDefault(require("../features/login/passwordResetMail"));

var _resetingPassword = _interopRequireDefault(require("../features/resetingPassword/resetingPassword"));

var _verify = _interopRequireDefault(require("../features/register/Register/verify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import EditLocation from "../features/Locations/EditLocation";
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
var defaultCrudChildren = [{
  path: "/details/:id",
  name: "Details"
}, {
  path: "/store/:id",
  name: "Edit"
}];
var routes = [{
  path: "/login",
  name: "Login",
  component: _login["default"],
  layout: _guestPageLayout["default"]
}, {
  path: "/register/invited",
  name: "Register",
  component: _register["default"],
  layout: _guestPageLayout["default"]
}, {
  path: "/register/activate",
  name: "Activate",
  component: _verify["default"],
  layout: _guestPageLayout["default"]
}, {
  path: "/register",
  name: "Register",
  component: _register2["default"],
  layout: _guestPageLayout["default"]
}, {
  path: "/forgot_password",
  name: "Forgot Password",
  component: _resetPassword["default"],
  layout: _guestPageLayout["default"]
}, {
  path: "/account/password/change",
  name: "reset password",
  component: _resetingPassword["default"],
  layout: _guestPageLayout["default"]
}, // {
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
  component: _Locations["default"],
  authenticated: false,
  roles: [_constants["default"].Roles.Admin],
  children: defaultCrudChildren,
  layout: _loggedInPageLayout["default"]
}, {
  path: "/Locations/:id",
  name: "Locations",
  component: _login["default"],
  authenticated: false,
  roles: [_constants["default"].Roles.Admin],
  children: defaultCrudChildren,
  layout: _loggedInPageLayout["default"]
}, // {
//   path: "/editlocation/:id",
//   component: EditLocation,
//   authenticated: true,
// },
{
  path: "/company_settings/packages",
  name: "Service Package",
  component: _servicePacakges["default"],
  layout: _loggedInPageLayout["default"]
}, {
  path: "/company_settings/addons",
  name: "Service Package",
  component: _addons["default"],
  layout: _loggedInPageLayout["default"]
}, {
  path: "/company_settings/team",
  name: "Service Package",
  component: _teamMemberInvitation["default"],
  layout: _loggedInPageLayout["default"]
}, {
  path: "/users",
  name: "Users",
  component: _users["default"],
  authenticated: false,
  roles: [],
  children: defaultCrudChildren,
  layout: _loggedInPageLayout["default"]
}, {
  path: "/unauthorized",
  name: "Unauthorized",
  component: _unauthorized["default"],
  authenticated: false,
  roles: [],
  layout: _guestPageLayout["default"]
}, {
  path: "/",
  name: "Dashboard",
  component: _dashboard["default"],
  authenticated: false,
  layout: _loggedInPageLayout["default"]
}];
var _default = routes;
exports["default"] = _default;