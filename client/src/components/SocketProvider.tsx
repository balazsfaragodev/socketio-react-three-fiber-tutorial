import React, { useEffect, useState } from "react";
import { Character, SocketProviderProps } from "../lib/types";
import { SocketContext, socket } from "../lib/constants";

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const handleCharactersUpdate = (
      newCharacters: React.SetStateAction<Character[]>
    ) => {
      setCharacters(newCharacters);
    };

    socket.on("connect", () => console.log("Connected"));
    socket.on("characters", handleCharactersUpdate);

    // Return a cleanup function that correctly performs cleanup without returning a value
    return () => {
      socket.off("connect");
      socket.off("characters", handleCharactersUpdate);
    };
  }, []);
  return (
    <SocketContext.Provider value={{ characters }}>
      {children}
    </SocketContext.Provider>
  );
};
