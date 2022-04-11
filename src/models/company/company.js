import BaseModel from "../baseModel/baseModel";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
export default class Company extends BaseModel {
  // API call using thunk
  static async CreateCompany(Props) {
    return await NetworkCall.fetch(Request.CreateCompany(Props));
  }
  // static async GetCompany(Props) {
  //   return await NetworkCall.fetch(Request.GetLocations());
  // }

  // static async UpdateCompany(Props) {
  //   return await NetworkCall.fetch(Request.UpdateLocation(Props));
  // }

  // static async DeleteCompany(id) {
  //   return await NetworkCall.fetch(Request.DeleteLocation(id));
  // }

  // Selectors

  // Helpers
}
Location.modelName = "company";