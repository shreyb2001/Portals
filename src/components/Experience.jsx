import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "./Fish";
import { Cactoro } from "./Cactoro";
import { Dino } from "./Dino";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

const MonsterStage = ({
  children,
  active,
  setActive,
  texture,
  color,
  name,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        font="/fonts/Caprasimo-Regular.ttf"
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
          <ambientLight intensity={3} />
          {children}
          <mesh>
            <meshStandardMaterial map={map} side={THREE.BackSide} />
            <sphereGeometry args={[5, 64, 64]} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 9, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      <ambientLight intensity={2} />
      <MonsterStage
        texture={"/textures/lava_village.jpg"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        name={"Dragon"}
        color={"#873b5a"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Dino scale={0.6} position-y={-1} hovered={hovered === "Dragon"} />
      </MonsterStage>
      <MonsterStage
        texture={"/textures/cactus.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        name={"Cactus"}
        color={"#56782f"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactoro scale={0.55} position-y={-1} hovered={hovered === "Cactus"} />
      </MonsterStage>
      <MonsterStage
        name={"Fish King"}
        color={"#0685a7"}
        texture={"/textures/waterWorld.jpg"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish King"} />
      </MonsterStage>
    </>
  );
};

export default Experience;
