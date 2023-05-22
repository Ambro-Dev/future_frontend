import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "App";
import { SocketProvider } from "context/socket";
import { I18nextProvider } from "react-i18next";
import { MaterialUIControllerProvider } from "context";
import { ErrorProvider } from "context/ErrorProvider";
import i18n from "./i18n";

// Distance Learning React Context Provider

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SocketProvider>
          <ErrorProvider>
            <I18nextProvider i18n={i18n}>
              <MaterialUIControllerProvider>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </MaterialUIControllerProvider>
            </I18nextProvider>
          </ErrorProvider>
        </SocketProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
