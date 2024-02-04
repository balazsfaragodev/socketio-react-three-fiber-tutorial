import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { useState } from "react";
import { Dog } from "./components/Dog";
import { socket, useSocket } from "./lib/constants";
import * as THREE from "three";

export const Scene = () => {
  const { characters } = useSocket();
  const [onFloor, setOnFloor] = useState(false);
  const [, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const handlePlaneClick = (e: { point: { x: number; z: number } }) => {
    const newPosition = { x: e.point.x, y: 0, z: e.point.z };
    setPosition(newPosition);
    // The new updated code send to server
    socket.emit("move", [newPosition.x, newPosition.y, newPosition.z]);
  };
  useCursor(onFloor);
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <OrbitControls makeDefault />
      <mesh
        rotation-x={-Math.PI / 2}
        onClick={handlePlaneClick}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
        receiveShadow
      >
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#70543E" />
      </mesh>
      {characters.map((character) => (
        <Dog
          key={character.id}
          position={
            new THREE.Vector3(
              character.position[0],
              character.position[1],
              character.position[2]
            )
          }
          dogColor={character.dogColor}
        />
      ))}
    </>
  );
};
