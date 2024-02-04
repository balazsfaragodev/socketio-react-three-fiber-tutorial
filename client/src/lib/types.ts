import { ReactNode } from "react";

export interface Character {
  dogColor: string;
  id: string;
  position: [number, number, number];
}

export type DogProps = {
  dogColor?: string;
  position: THREE.Vector3;
};

export interface SocketContextType {
  characters: Character[];
}

export interface SocketProviderProps {
  children: ReactNode;
}
