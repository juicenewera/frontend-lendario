precision highp float;

uniform sampler2D uMap;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec2 uVelocity;
uniform float uTime;
uniform float uRadius;
uniform float uStrength;

varying vec2 vUv;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise21(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.55;

  for (int octave = 0; octave < 3; octave++) {
    value += noise21(p) * amplitude;
    p = p * 2.03 + 11.7;
    amplitude *= 0.48;
  }

  return value;
}

float field(vec2 p) {
  return fbm(p * 3.2 + vec2(uTime * 0.07, -uTime * 0.05));
}

vec2 curlField(vec2 p) {
  float epsilon = 0.018;
  float dx = field(p + vec2(epsilon, 0.0)) - field(p - vec2(epsilon, 0.0));
  float dy = field(p + vec2(0.0, epsilon)) - field(p - vec2(0.0, epsilon));
  return normalize(vec2(dy, -dx) + vec2(0.00001));
}

void main() {
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 local = (vUv - uPointer) * aspect;

  float distanceToPointer = length(local);
  float influence = 1.0 - smoothstep(0.0, uRadius, distanceToPointer);
  influence *= influence;

  vec2 radial = normalize(local + vec2(0.00001));
  vec2 flow = curlField(local * 2.0);
  float speed = min(length(uVelocity) * 2.0, 1.0);
  vec2 inertia = normalize(uVelocity * aspect + flow * 0.35 + vec2(0.00001));

  float wake =
    sin(distanceToPointer * 30.0 - uTime * 4.0) *
    exp(-distanceToPointer * 9.0);

  vec2 direction = mix(-radial, inertia, 0.6);
  vec2 displacement =
    direction * influence * uStrength * speed +
    radial * wake * influence * uStrength * 0.16;

  displacement /= aspect;

  vec2 uv = clamp(vUv + displacement, vec2(0.002), vec2(0.998));
  gl_FragColor = texture2D(uMap, uv);
}

