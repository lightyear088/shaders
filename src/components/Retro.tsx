import {
    OrbitControls,
    OrthographicCamera
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { wrapEffect, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Effect } from "postprocessing";
import { FC, Suspense, useState } from "react";
import * as THREE from "three";
import { Text } from '@react-three/drei';
import fragmentShader from "./shaders/fragmentShader.glsl";
import './scene.css';
import { Props } from "../App";

interface RetroEffectImplProps {
    matrixSize?: number;
    bias?: number;
}

export class RetroEffectImpl extends Effect {
    // Приватное свойство для хранения uniforms
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public uniforms: Map<string, THREE.Uniform<any>>;

    constructor({ matrixSize = 8.0, bias = 0.5 }: RetroEffectImplProps = {}) {
        // Создаем uniforms
        const uniforms = new Map([
            ["matrixSize", new THREE.Uniform(matrixSize)],
            ["bias", new THREE.Uniform(bias)],
        ]);

        // Вызов конструктора базового класса Effect
        super("RetroEffect", fragmentShader, {
            uniforms,
        });

        // Сохраняем uniforms
        this.uniforms = uniforms;
    }

    // Сеттер для matrixSize
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
            <mesh receiveShadow castShadow>
                <torusKnotGeometry args={[1, 0.25, 128, 100]} />
                <meshStandardMaterial color="cyan" />
            </mesh>
            <EffectComposer>
                <RetroEffect {...effectProps} />
            </EffectComposer>
        </>
    );
};

const RetroModel: FC<Props> = ({ onClick }) => {

    return (
        <Canvas shadows dpr={[1, 2]}>
            <Suspense fallback="Loading">
                <ambientLight intensity={0.25} />
                <directionalLight position={[0, 10, 5]} intensity={10.5} />
                <color attach="background" args={["#000000"]} />
                <Text
                    position={[3, 0, 0]}
                    fontSize={0.5}
                    color="white"
                    onClick={() => onClick(2)}
                    rotation={[0, 0, 0]} // Фиксируем вращение текста
                >
                    NEXT?
                </Text>
                <Retro />
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

export default RetroModel;