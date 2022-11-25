import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./store/AuthorizationContextProvider";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById("root")
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <AuthContextProvider>
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>

//   // </AuthContextProvider>
// );
