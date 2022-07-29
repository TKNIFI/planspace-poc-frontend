import BaseModel from "../baseModel/baseModel";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export default class Location extends BaseModel {
  // API call using thunk
  static async CreateLocation(Props) {
    return await NetworkCall.fetch(Request.CreateLocation(Props));
  }
  static async GetLocations(Props) {
    return await NetworkCall.fetch(Request.GetLocations());
  }

  static async UpdateLocation(Props) {
    return await NetworkCall.fetch(Request.UpdateLocation(Props));
  }

  static async DeleteLocation(id) {
    return await NetworkCall.fetch(Request.DeleteLocation(id));
  }

  static async GetLocationOptions(group) {
    return await NetworkCall.fetch(Request.GetLocationOptions(group));
  }

}
Location.modelName = "Location";
