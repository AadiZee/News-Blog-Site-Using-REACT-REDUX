//LIBRARIES
import React from "react";
import ReactDOM from "react-dom";
//COMPONENTS
import Routes from "./routes/routes";
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
//REDUX
import { Provider } from "react-redux";
import ReduxStore from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
