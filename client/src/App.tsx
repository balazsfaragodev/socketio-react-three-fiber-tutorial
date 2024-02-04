import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { SocketProvider } from "./components/SocketProvider";

function App() {
  return (
    <>
      <SocketProvider>
        <Canvas
          camera={{
            fov: 60,
            near: 0.1,
            far: 300,
            position: [0, 7, 8],
          }}
          shadows
        >
          <Scene />
        </Canvas>
      </SocketProvider>
    </>
  );
}

export default App;
