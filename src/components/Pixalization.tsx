import {
    OrbitControls,
    OrthographicCamera,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { wrapEffect, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Effect } from "postprocessing";
import { Suspense, useState } from "react";
import * as THREE from "three";

import fragmentShader from "./shaders/fragmentShader.glsl";

interface RetroEffectImplProps {
    matrixSize?: number;
    bias?: number;
}

class RetroEffectImpl extends Effect {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public uniforms: Map<string, THREE.Uniform<any>>;
    constructor({ matrixSize = 8.0, bias = 0.5 }: RetroEffectImplProps = {}) {


        const uniforms = new Map([
            ["colorNum", new THREE.Uniform(matrixSize)],
            ["pixelSize", new THREE.Uniform(bias)],
        ]);

        super("RetroEffect", fragmentShader, {
            uniforms,
        });

        this.uniforms = uniforms;
    }

    set matrixSize(value: number) {
        if (this.uniforms) {
            this.uniforms.get("matrixSize")!.value = value;
        }
    }

    // Геттер для matrixSize
    get matrixSize(): number {
        if (this.uniforms) {
            return this.uniforms.get("matrixSize")!.value;
        }
        throw new Error("Uniforms not initialized");
    }

    // Сеттер для bias
    set bias(value: number) {
        if (this.uniforms) {
            this.uniforms.get("bias")!.value = value;
        }
    }

    // Геттер для bias
    get bias(): number {
        if (this.uniforms) {
            return this.uniforms.get("bias")!.value;
        }
        throw new Error("Uniforms not initialized");
    }

}

const RetroEffect = wrapEffect(RetroEffectImpl);




const Retro = () => {
    const [effectProps, setEffectProps] = useState({ matrixSize: 8.0, bias: 0.5 });

    const { matrixSize, bias } = useControls({
        matrixSize: {
            value: "8.0",
            options: ["2.0", "4.0", "8.0"],
        },
        bias: {
            value: 0.70,
            min: 0.0,
            max: 1.0,
        },
    });

    useFrame(() => {
        setEffectProps({
            matrixSize: parseInt(matrixSize, 10),
            bias,
        });
    });

    return (
        <>

            <EffectComposer>
                <RetroEffect {...effectProps} />
            </EffectComposer>
        </>
    );
};

const Scene2 = () => {
    return (
        <Canvas shadows dpr={[1, 2]}>
            <Suspense fallback="Loading">
                <color attach="background" args={["#3386E0"]} />
                <ambientLight intensity={0.25} />
                <directionalLight position={[0, 10, 5]} intensity={10.5} />
                <Retro />
                <OrbitControls />
                <OrthographicCamera
                    makeDefault
                    position={[5, 5, 5]}
                    zoom={50}
                    near={0.01}
                    far={500}
                />
            </Suspense>
        </Canvas>
    );
};


export default Scene2;