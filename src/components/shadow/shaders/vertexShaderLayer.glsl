varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);

  // Set the final position of the vertex
  gl_Position = projectionMatrix * modelViewPosition;
}