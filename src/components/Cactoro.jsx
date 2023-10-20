/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Cactoro.gltf 
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Cactoro({ hovered, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Cactoro.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const anim = hovered ? "Wave" : "Idle";
    actions[anim].reset().fadeIn(0.5).play();

    return () => actions[anim].fadeOut(0.5);
  }, [hovered]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Cactoro">
            <skinnedMesh
              name="Cube120"
              geometry={nodes.Cube120.geometry}
              material={materials.Cactoro_Main}
              skeleton={nodes.Cube120.skeleton}
            />
            <skinnedMesh
              name="Cube120_1"
              geometry={nodes.Cube120_1.geometry}
              material={materials.Cactoro_Secondary}
              skeleton={nodes.Cube120_1.skeleton}
            />
            <skinnedMesh
              name="Cube120_2"
              geometry={nodes.Cube120_2.geometry}
              material={materials.Cactoro_Red}
              skeleton={nodes.Cube120_2.skeleton}
            />
            <skinnedMesh
              name="Cube120_3"
              geometry={nodes.Cube120_3.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube120_3.skeleton}
            />
            <skinnedMesh
              name="Cube120_4"
              geometry={nodes.Cube120_4.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube120_4.skeleton}
            />
            <skinnedMesh
              name="Cube120_5"
              geometry={nodes.Cube120_5.geometry}
              material={materials["Cactoro_Main.001"]}
              skeleton={nodes.Cube120_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Cactoro.gltf");
