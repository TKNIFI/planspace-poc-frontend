import K from "../utilities/constants";
import Cookies from "js-cookie";

export default class Request {
  constructor(
    relativeURL,
    method = K.Network.Method.GET,
    body = null,
    defaultHeaderType = K.Network.Header.Type.Json,
    headers = {},
    isTenant = true
  ) {
    const token = Cookies.get(K.Cookie.Key.Token);
    const domainPrefix = Cookies.get(K.Cookie.Key.Tenant);
    headers = {
      ...(defaultHeaderType === K.Network.Header.Type.Json
        ? K.Network.Header.Default(token)
        : K.Network.Header.Authorization(token)),
      ...headers,
    };
    this.url = isTenant
      ? K.Network.URL.TenantURL(domainPrefix) + relativeURL
      : K.Network.URL.BaseAPI + relativeURL;
    this.method = method;
    this.body = body;
    this.headers = headers;
  }

  // Tenant calls.
  static getTenant() {
    return new Request(K.Network.URL.GetTenant, K.Network.Method.GET);
  }

  // User calls.
  static loginUser(email, password) {
    const body = {
      email,
      password,
    };
    return new Request(
      K.Network.URL.LoginUser,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }
  static CreateLocation(requestbody) {
    const body = {
      location_name: requestbody.location_name,
      location_image: requestbody.location_image,
      address1: requestbody.address1,
      address2: requestbody.address2,
      city: requestbody.city,
      state: requestbody.state,
      zip_code: requestbody.zip_code,
      is_physical_main_location: requestbody.is_physical_main_location,
      define_space: requestbody.define_space,
      phone: requestbody.phone,
      email: requestbody.email,
    };
    return new Request(
      K.Network.URL.CreateLocation,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }
  static GetLocations() {
    return new Request(
      K.Network.URL.GetLocations,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static DeleteLocation(id) {
    return new Request(
      K.Network.URL.DeleteLocation,
      K.Network.Method.DELETE,
      null,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static UpdateLocation(body) {
    return new Request(
      K.Network.URL.UpdateLocation,
      K.Network.Method.UPDATE,
      null,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }
}