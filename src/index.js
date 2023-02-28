import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "App";
import { SocketContext, socket } from "context/socket";

// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketContext.Provider value={socket}>
          <MaterialUIControllerProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </MaterialUIControllerProvider>
        </SocketContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
