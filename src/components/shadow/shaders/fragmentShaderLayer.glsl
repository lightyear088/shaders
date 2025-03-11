  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec3 normal = normalize(vNormal);
    gl_FragColor = vec4(normal * 0.5 + 0.1, 1.0);
  }