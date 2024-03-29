/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public\Dog.glb --transformlb --transform --types 
Files: public\Dog.glb [296.88KB] > E:\projekt\react\testSocketio\r3f-sims-online-main\client\Dog-transformed.glb [47.32KB] (84%)
*/

import * as THREE from "three";

import { useEffect, useRef, useMemo, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { DogProps } from "../lib/types";

const SPEED = 0.1;

export function Dog({ dogColor = "green", ...props }: DogProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const position = useMemo(() => props.position, []);
  const group = useRef<THREE.Group>(null);
  const { scene, materials, animations } = useGLTF("/Dog-transformed.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState(
    "AnimalArmature|AnimalArmature|AnimalArmature|Idle"
  );
  const dogGeom = nodes.Dog as THREE.SkinnedMesh;
  useEffect(() => {
    const currentAction = actions[animation];
    if (currentAction) {
      currentAction.reset().fadeIn(0.32).play();
      return () => {
        currentAction.fadeOut(0.32);
      };
    }
  }, [actions, animation]);

  useFrame(() => {
    // Ensure the group and its target position are defined
    if (!group.current || !props.position) {
      return;
    }
    // Calculate the distance to the target position
    const distance = group.current.position.distanceTo(props.position);
    // Check if the character needs to move
    if (distance > 0.1) {
      // Calculate the direction vector towards the target position
      const direction = props.position
        .clone()
        .sub(group.current.position)
        .normalize();

      // Move the character towards the target position
      const moveStep = direction.multiplyScalar(SPEED);
      group.current.position.add(moveStep);

      // Make the character face the target position
      group.current.lookAt(props.position);

      // Switch to the "run" animation if not already running
      if (animation !== "AnimalArmature|AnimalArmature|AnimalArmature|Run") {
        setAnimation("AnimalArmature|AnimalArmature|AnimalArmature|Run");
      }
    } else {
      // Switch to the "idle" animation if not already idle and the character is close enough to the target position
      if (animation !== "AnimalArmature|AnimalArmature|AnimalArmature|Idle") {
        setAnimation("AnimalArmature|AnimalArmature|AnimalArmature|Idle");
      }
    }
  });
  return (
    <group ref={group} {...props} position={position} dispose={null}>
      <group name="Root_Scene">
        <group
          name="AnimalArmature"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <primitive object={nodes.All} />
        </group>
        <primitive object={nodes.Root} />
        <skinnedMesh
          name="Dog"
          geometry={dogGeom.geometry}
          material={materials.AtlasMaterial}
          skeleton={dogGeom.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={dogColor} />
        </skinnedMesh>
      </group>
    </group>
  );
}

useGLTF.preload("/Dog-transformed.glb");
