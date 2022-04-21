import React from "react";
import { attr } from "redux-orm";
import BaseModel from "../baseModel/baseModel";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import baseReducer from "../baseModel/baseReducer";
import { upsertModel } from "../baseModel/baseActions";
import K from "../../utilities/constants";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
class User extends BaseModel {
  // Registeration api call by using thunk
  static registerationCall(yname, emailId, phoneNo, YourBname, pasword) {
    console.log(yname, emailId, phoneNo, YourBname, pasword);
    return async (dispatch) => {
      const user = await NetworkCall.fetch(
        Request.registerationUser(yname, emailId, phoneNo, YourBname, pasword)
      )
        .then((response) => {
          const data = response.data.data;
          localStorage.setItem("userInfo", JSON.stringify(data));
          // useHistory.push("/login");
        })
        .catch((error) => alert(error.message));
      dispatch(upsertModel(User, user));
    };
  }

  // API call using thunk
  static loginCall(email, password) {
    return async (dispatch) => {
      const user = await NetworkCall.fetch(Request.loginUser(email, password));
      dispatch(upsertModel(User, user));
    };
  }

  // Selectors

  // Helpers
  static isAuthenticated() {
    return true;
  }

  static roles() {
    return [K.Roles.Admin];
  }

  // Reducer
  static reducer(action, User, session) {
    baseReducer(action, User, session);
  }
}

User.modelName = "User";

User.fields = {
  // Attributes
  id: attr(),
  firstName: attr(),
  lastName: attr(),
  name: attr(),
  email: attr(),
  cellPhone: attr(),
  officePhone: attr(),
  employeeNumber: attr(),
  fullTimeAvailabilityStartDate: attr(),
  fullTimeAvailabilityEndDate: attr(),
  targetUtilization: attr(),
  billRate: attr(),
  isCustomBillRate: attr(),
  photoPath: attr(),
  roleId: attr(),
  locationId: attr(),
  subscriptionId: attr(),
  dob: attr(),
  joiningDate: attr(),
  prefix: attr(),
  type: attr(),
};

export default withRouter(User);
