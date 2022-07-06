import BaseModel from "../baseModel/baseModel";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export default class Company extends BaseModel {
  // API call using thunk
  static async CreateCompany(Props) {
    return await NetworkCall.fetch(Request.CreateCompany(Props));
  }
  static async GetCompany(Props) {
    return await NetworkCall.fetch(Request.GetCompany());
  }

  static async UpdateCompany(Props) {
    return await NetworkCall.fetch(Request.UpdateCompany(Props));
  }

  // static async DeleteCompany(id) {
  //   return await NetworkCall.fetch(Request.DeleteCompany(id));
  // }

  // Selectors

  // Helpers
}
Company.modelName = "company";
