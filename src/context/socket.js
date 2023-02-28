import React from "react";
import socketio from "socket.io-client";

const SOCKET_PORT = "http://localhost:8080";

export const socket = socketio.connect(SOCKET_PORT);
export const SocketContext = React.createContext();
