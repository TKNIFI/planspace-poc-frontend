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
            Base: "https://planspace.herokuapp.com/",
            BaseAPI: "https://planspace.herokuapp.com/api",
            Timeout: 1000,
            TenantURL: (domainPrefix = "") => {
                return "http://" + domainPrefix + "planspace.herokuapp.com/api";
            },
            Client: {
                BaseHost: "planspace.herokuapp.com",
                BasePort: "80",
            },

            Protocol: "http",

            // Tenant
            GetTenant: "/tenant/get",

            //register
            Register: "/auth/register/",

            // Assignment
            LoginUser: "/auth/login/",

            //create company
            CreatCompany: "/company/",

            //get company
            GetCompany: "/company/",

            //create Locations
            CreateLocation: "/location/",

            //get Locations
            GetLocations: "/location/",

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
