const K = {
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
      Base: "https://planspacedev.herokuapp.com/",
      BaseAPI: "https://planspacedev.herokuapp.com/api",
      Timeout: 1000,
      TenantURL: (domainPrefix = "") => {
        return "http://" + domainPrefix + "planspacedev.herokuapp.com/api";
      },
      Client: {
        BaseHost: "localhost",
        BasePort: "3000",
      },

      Protocol: "http",

      // Tenant
      GetTenant: "/tenant/get",

      // Assignment
      LoginUser: "/user/login",

      CreatCompany : "/company/",

      GetCompany : "/company/",

      CreateLocation: "/addLocation/",

      //get Locations
      GetLocations: "/locations/",

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
      Default: (token = "") => ({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      }),
      Authorization: (token = "") => ({
        Authorization: "Bearer " + token,
      }),
      Type: {
        Json: "json",
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

export default K;
