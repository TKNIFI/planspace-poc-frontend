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
    </div>
  );
}

export default App;
