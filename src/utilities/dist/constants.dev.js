"use strict";
require("dotenv").config();

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var getToken = function getToken() {
  var info = localStorage.getItem("userInfo");
  if (info) {
    if (JSON.parse(info).access_token) {
      return JSON.parse(info).access_token;
    } else if (JSON.parse(info).access) {
      return JSON.parse(info).access;
    }
  } else {
    return "";
  }
};

var K = {
  Network: {
    URL: {
      // Production
      // Base: 'http://ninjirosoft.com:8080/',
      // BaseAPI: 'http://ninjirosoft.com:8080/api',
      // TenantURL: (domainPrefix = '') => {
      //     return 'http://' + domainPrefix + '.' + 'ninjirosoft.com:8080/api'
      // },
      // Client: {
      //     BaseHost: 'ninjirosoft.com',
      //     BasePort: '80',
      // },
      // Development
      Base: `${process.env.REACT_APP_BASE_URL}`,
      BaseAPI: `${process.env.REACT_APP_BASE_URL}api`,
      Timeout: 1000,
      TenantURL: function TenantURL() {
        var domainPrefix =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "";
        return "https://" + domainPrefix + "planspace.herokuapp.com/api";
      },
      Client: {
        BaseHost: "planspace.herokuapp.com",
        BasePort: "80",
      },
      Protocol: "https",
      // Tenant
      GetTenant: "/tenant/get",
      // Register
      Register: "/auth/register/",
      // Register Invited User
      RegisterInvited: "/auth/register/invited/",
      // Login User
      LoginUser: "/auth/login/",
      // Login Using Facebook
      FacebookLogin: "/auth/login/facebook/",
      // Login Using Google
      GoogleLogin: "/auth/login/google/",
      // Invite User
      InviteUser: "/auth/user/",
      // Get Invite User
      GetInvitedUser: "/auth/user/invited/",
      // Delete User
      DeleteUser: "/auth/user/:id/",
      // Update User
      UpdateUser: "/auth/user/:id/",
      // Request Reset Password
      ResetPasswordRequest: "auth/password_reset/request/",
      // Reset Password
      ResetPassword: "auth/password_reset/confirm/",
      // Validate Reset Password Token
      ValidatePasswordResetToken: "auth/password_reset/validate_token/",
      //create company
      CreatCompany: "/company/",
      //get company
      GetCompany: "/company/",
      //create Locations
      CreateLocation: "/company/location/",
      //get Locations
      GetLocations: "/company/location/",
      //update Location
      UpdateLocation: "/locations/:id/update/",
      // delete Location
      DeleteLocation: "/locations/:id/delete/",
    },
    Method: {
      GET: "GET",
      POST: "POST",
      DELETE: "DELETE",
      UPDATE: "UPDATE",
    },
    Header: {
      ContentType: "Content-Type",
      ApplicationJson: "application/json",
      Default: function Default() {
        var token =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "";
        return {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        };
      },
      Authorization: function Authorization() {
        var token =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "";
        return {
          Authorization: "JWT " + getToken(),
        };
      },
      Type: {
        Json: "application/json",
        File: "file",
      },
    },
    Default: {
      AssignmentStatusID: 1,
      ResourceAllocationPercentage: 100,
      ResourceAllocationType: "percentage",
      WorkItem: "",
      Error: "Opps, an error occurred!",
    },
    StatusCode: {
      Unauthorized: 401,
    },
  },
  Actions: {
    // General part of action
    CREATE: "CREATE",
    UPSERT: "UPSERT",
    DELETE: "DELETE",
    DELETE_ALL: "DELETE_ALL",
    SET: "SET",
    // Settings
    UPSERT_SETTING: "UPSERT_SETTING",
  },
  Cookie: {
    Key: {
      Token: "token",
      Tenant: "tenant",
      UserId: "user_id",
    },
  },
  GuestPages: [
    "/login",
    "/authentication/register",
    "/authentication/reset-password",
    "/subscription/plans",
  ],
  Roles: {
    Admin: "Admin",
    User: "User",
  },
};
var _default = K;
exports["default"] = _default;
