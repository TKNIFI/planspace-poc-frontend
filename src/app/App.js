import React from "react";
import { Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";
import routes from "../routes/routes";
import RouteWithSubRoutes from "../routes/routeWithSubRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>

      <div className="help-div">
        <svg
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          className="help-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="20.24"
            cy="19.555"
            rx="20.24"
            ry="19.555"
            fill="#CCE5FF"
          />
          <path
            d="M20.9995 10C26.5223 10 30.9991 14.4769 30.9991 19.9997C30.9991 25.5226 26.5223 29.9994 20.9995 29.9994C19.4036 30.0016 17.8305 29.6203 16.4128 28.8875L12.5869 29.9544C12.3735 30.014 12.148 30.0158 11.9337 29.9595C11.7193 29.9033 11.5238 29.791 11.3671 29.6343C11.2104 29.4776 11.0982 29.2821 11.0419 29.0677C10.9857 28.8534 10.9874 28.6279 11.047 28.4145L12.115 24.5916C11.3803 23.1726 10.9979 21.5976 11 19.9997C11 14.4769 15.4768 10 20.9995 10ZM20.9995 11.5C18.7453 11.5 16.5834 12.3955 14.9894 13.9895C13.3954 15.5835 12.4999 17.7454 12.4999 19.9997C12.4999 21.4697 12.8729 22.8826 13.5729 24.1366L13.7229 24.4066L12.6109 28.3905L16.5977 27.2785L16.8677 27.4285C18.0021 28.0592 19.2657 28.4217 20.5619 28.4883C21.8581 28.5549 23.1522 28.3237 24.3452 27.8126C25.5382 27.3015 26.5983 26.5239 27.4442 25.5396C28.2901 24.5552 28.8993 23.3902 29.2252 22.1339C29.5511 20.8776 29.5849 19.5634 29.3242 18.292C29.0634 17.0205 28.5149 15.8257 27.7208 14.7991C26.9268 13.7725 25.9081 12.9414 24.743 12.3696C23.578 11.7977 22.2974 11.5002 20.9995 11.5ZM20.9995 23.4996C21.2647 23.4996 21.5191 23.605 21.7066 23.7925C21.8941 23.98 21.9995 24.2344 21.9995 24.4996C21.9995 24.7648 21.8941 25.0191 21.7066 25.2067C21.5191 25.3942 21.2647 25.4996 20.9995 25.4996C20.7343 25.4996 20.48 25.3942 20.2925 25.2067C20.1049 25.0191 19.9996 24.7648 19.9996 24.4996C19.9996 24.2344 20.1049 23.98 20.2925 23.7925C20.48 23.605 20.7343 23.4996 20.9995 23.4996ZM20.9995 14.7499C21.7288 14.7499 22.4283 15.0396 22.944 15.5553C23.4597 16.071 23.7494 16.7705 23.7494 17.4998C23.7494 18.5098 23.4524 19.0737 22.6985 19.8587L22.5295 20.0297C21.9075 20.6517 21.7495 20.9157 21.7495 21.4997C21.7495 21.6986 21.6705 21.8893 21.5298 22.03C21.3892 22.1706 21.1984 22.2497 20.9995 22.2497C20.8006 22.2497 20.6099 22.1706 20.4692 22.03C20.3286 21.8893 20.2496 21.6986 20.2496 21.4997C20.2496 20.4897 20.5466 19.9257 21.3005 19.1407L21.4695 18.9697C22.0915 18.3478 22.2495 18.0838 22.2495 17.4998C22.2484 17.1801 22.1249 16.8729 21.9044 16.6415C21.6838 16.41 21.3829 16.2719 21.0636 16.2555C20.7443 16.2391 20.4309 16.3457 20.1878 16.5533C19.9447 16.761 19.7904 17.0539 19.7566 17.3718L19.7496 17.4998C19.7496 17.6987 19.6706 17.8895 19.5299 18.0301C19.3893 18.1708 19.1985 18.2498 18.9996 18.2498C18.8007 18.2498 18.61 18.1708 18.4693 18.0301C18.3287 17.8895 18.2497 17.6987 18.2497 17.4998C18.2497 16.7705 18.5394 16.071 19.0551 15.5553C19.5708 15.0396 20.2702 14.7499 20.9995 14.7499Z"
            fill="#676879"
          />
        </svg>
      </div>
    </div>
  );
}

export default App;
