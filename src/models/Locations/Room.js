import BaseModel from "../baseModel/baseModel";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export default class Room extends BaseModel {
  // API call using thunk
  static async CreateRoom(Props) {
    return await NetworkCall.fetch(Request.CreateRoom(Props));
  }
  static async GetRooms(Props) {
    return await NetworkCall.fetch(Request.GetRooms());
  }

  static async UpdateRoom(Props) {
    return await NetworkCall.fetch(Request.UpdateRoom(Props));
  }

  static async DeleteRoom(id) {
    return await NetworkCall.fetch(Request.DeleteRoom(id));
  }
}

Location.modelName = "Room";
