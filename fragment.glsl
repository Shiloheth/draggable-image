precision highp float;

uniform sampler2D tMap;
 
varying vec2 vUv;

void main() {
    vec3 color = texture2D(tMap, vUv).rgb; // Use texture2D() for WebGL 1.0
    gl_FragColor = vec4(color, 1.0);
}
