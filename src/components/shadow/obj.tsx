import {
    OrbitControls,
    Environment,
    PerspectiveCamera,
    useFBO,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";
import * as THREE from "three";

import NormalMaterial from "./Material";

import '../scene.css';


const Caustics = () => {
    const mesh = useRef<THREE.Mesh>(null);
    const causticsPlane = useRef<THREE.Mesh>(null);

    // const {light} = useControls({
    //     light: {
    //         value: new THREE.Vector3(-10, 13, -10),
    //     },
    // });

    const {
        x, y, z
    } = useControls({
        x: {
            value: -10,
            min: -20,
            max: 20,
            step: 1,
        },
        y: {
            value: 13,
            min: -20,
            max: 20,
            step: 1,
        },
        z: {
            value: -10,
            min: -20,
            max: 20,
            step: 1,
        },
    });

    const normalRenderTarget = useFBO(2000, 2000, {});

    const [normalCamera] = useState(
        () => new THREE.PerspectiveCamera(65, 1, 0.1, 1000)
    );

    const [normalMaterial] = useState(() => new NormalMaterial());

    useFrame((state) => {
        const { gl } = state;

        if (!mesh.current) {
            return
        }
        const bounds = new THREE.Box3().setFromObject(mesh.current, true);

        normalCamera.position.set(x, y, z);
        normalCamera.lookAt(
            bounds.getCenter(new THREE.Vector3(0, 0, 0)).x,
            bounds.getCenter(new THREE.Vector3(0, 0, 0)).y,
            bounds.getCenter(new THREE.Vector3(0, 0, 0)).z
        );
        normalCamera.up = new THREE.Vector3(0, 1, 0);

        const originalMaterial = mesh.current.material;

        mesh.current.material = normalMaterial;
        mesh.current.material.side = THREE.BackSide;

        gl.setRenderTarget(normalRenderTarget);
        gl.render(mesh.current, normalCamera);

        mesh.current.material = originalMaterial;
        (causticsPlane.current?.material as THREE.MeshStandardMaterial).map = normalRenderTarget.texture;



        gl.setRenderTarget(null);
    });

    return (
        <>
            <mesh
                ref={mesh}
                scale={0.02}
                position={[0, 6.5, 0]}
            >
                <torusKnotGeometry args={[200, 40, 600, 16]} />
                {/* <MeshTransmissionMaterial backside {...config} /> */}
                <meshBasicMaterial />
            </mesh>
            <mesh ref={causticsPlane} rotation={[-Math.PI / 2, 0, 0]} position={[5, 0, 5]}>
                <planeGeometry args={[10, 10, 10, 10]} />
                <meshBasicMaterial />
            </mesh>
        </>
    );
};

const Scene33 = () => {
    return (
        <Canvas dpr={[1, 2]}>
            <Caustics />
            <OrbitControls />
            <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={65} />
            <Environment
                files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/syferfontein_0d_clear_puresky_1k.hdr"
                ground={{ height: 45, radius: 100, scale: 300 }}
            />
        </Canvas>
    );
};


export default Scene33;
