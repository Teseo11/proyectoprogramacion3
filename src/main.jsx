import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { EntitiesProvider } from "./context/EntitiesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <EntitiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EntitiesProvider>
    </AuthProvider>
  </React.StrictMode>
);
