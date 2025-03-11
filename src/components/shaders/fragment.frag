uniform float uIorR;
uniform float uIorG;
uniform float uIorB;
uniform float uSaturation;
uniform float uChromaticAberration;
uniform float uRefractPower;
uniform vec2 winResolution;
uniform sampler2D uTexture;

varying vec3 worldNormal;
varying vec3 eyeVector;

vec3 sat(vec3 rgb, float intensity) {
  vec3 L = vec3(0.2125, 0.7154, 0.0721);
  vec3 grayscale = vec3(dot(rgb, L));
  return mix(grayscale, rgb, intensity);
}

const int LOOP = 16;

void main() {
  float iorRatioRed = 1.0/uIorR;
  float iorRatioGreen = 1.0/uIorG;
  float iorRatioBlue = 1.0/uIorB;

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;
  vec3 color = vec3(0.0);

  for ( int i = 0; i < LOOP; i ++ ) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(eyeVector, normal, iorRatioRed);
    vec3 refractVecG = refract(eyeVector, normal, iorRatioGreen);
    vec3 refractVecB = refract(eyeVector, normal, iorRatioBlue);
    
    color.r += texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).r;
    color.g += texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).g;
    color.b += texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).b;

    color = sat(color, uSaturation);
  }

  // Divide by the number of layers to normalize colors (rgb values can be worth up to the value of LOOP)
  color /= float( LOOP );


  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
