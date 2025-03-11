import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import '../scene.css';
import fragmentShader from "./shaders/shader.glsl";


const TestBook = () => {


    const Model = useMemo(() => {
        return () => (
            <mesh receiveShadow castShadow>
                <torusKnotGeometry args={[1, 0.25, 128, 100]} />
                <shaderMaterial
                    fragmentShader={fragmentShader}
                />
            </mesh>
        );
    }, []);


    return (
        <Canvas shadows dpr={[1, 2]}>
            <Suspense fallback="Loading">
                <ambientLight intensity={0.25} />
                <directionalLight position={[0, 10, 5]} intensity={10.5} />
                <color attach="background" args={["#000000"]} />

                <Model></Model>
                <OrbitControls />
                <OrthographicCamera
                    makeDefault
                    position={[5, 5, 5]}
                    zoom={120}
                    near={0.01}
                    far={500}
                />
            </Suspense>
        </Canvas>
    );
};

export default TestBook;