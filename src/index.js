import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "App";
import { SocketProvider } from "context/socket";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

// Distance Learning React Context Provider
import { MaterialUIControllerProvider } from "context";

LogRocket.init("ubeizn/future");
setupLogRocketReact(LogRocket);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SocketProvider>
          <MaterialUIControllerProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </MaterialUIControllerProvider>
        </SocketProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
