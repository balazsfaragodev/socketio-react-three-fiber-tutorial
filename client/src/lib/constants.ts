import { io } from "socket.io-client";
import { SocketContextType } from "./types";
import { createContext, useContext } from "react";

export const socket = io("http://localhost:3001");

export const SocketContext = createContext<SocketContextType>({
  characters: [],
});

export const useSocket = () => useContext(SocketContext);
