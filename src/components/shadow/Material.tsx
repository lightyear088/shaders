import { shaderMaterial } from "@react-three/drei";

import vertexShader from "./shaders/vertexShaderLayer.glsl";
import fragmentShader from "./shaders/fragmentShaderLayer.glsl";

const NormalMaterial = shaderMaterial({}, vertexShader, fragmentShader);

export default NormalMaterial;
