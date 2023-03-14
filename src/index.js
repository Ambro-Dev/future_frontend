import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "App";
import { SocketProvider } from "context/socket";

// Distance Learning React Context Provider
import { MaterialUIControllerProvider } from "context";

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
