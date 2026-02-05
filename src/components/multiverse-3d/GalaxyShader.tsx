'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

// 星系着色器材质
const GalaxyMaterial = shaderMaterial(
  {
    uTime: 0,
    uPrimaryColor: new THREE.Color('#6366F1'),
    uSecondaryColor: new THREE.Color('#EC4899'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uPrimaryColor;
    uniform vec3 uSecondaryColor;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      // 转换到极坐标
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float angle = atan(center.y, center.x);
      
      // 旋转动画
      float rotatedAngle = angle + uTime * 0.5 + dist * 3.0;
      
      // 生成旋涡噪声
      vec2 spiralCoord = vec2(
        cos(rotatedAngle) * dist,
        sin(rotatedAngle) * dist
      );
      
      float noise1 = snoise(spiralCoord * 4.0 + uTime * 0.2);
      float noise2 = snoise(spiralCoord * 8.0 - uTime * 0.3);
      float noise3 = snoise(spiralCoord * 2.0 + uTime * 0.1);
      
      // 组合噪声形成星系臂
      float galaxyArms = sin(rotatedAngle * 2.0 + noise1 * 2.0) * 0.5 + 0.5;
      float stars = smoothstep(0.6, 0.8, noise2) * 0.8;
      float nebula = (noise3 * 0.5 + 0.5) * 0.4;
      
      // 径向衰减
      float radialFade = 1.0 - smoothstep(0.0, 0.5, dist);
      float coreGlow = exp(-dist * 6.0) * 1.5;
      
      // 混合颜色
      vec3 color1 = uPrimaryColor;
      vec3 color2 = uSecondaryColor;
      vec3 starColor = vec3(1.0, 1.0, 0.95);
      
      vec3 galaxyColor = mix(color1, color2, galaxyArms);
      galaxyColor += starColor * stars;
      galaxyColor += coreGlow * mix(color1, color2, 0.5);
      galaxyColor *= radialFade;
      galaxyColor += nebula * mix(color1, color2, noise1 * 0.5 + 0.5) * radialFade;
      
      // 透明度
      float alpha = radialFade * 0.9 + coreGlow * 0.5 + stars * 0.3;
      alpha = clamp(alpha, 0.0, 1.0);
      
      gl_FragColor = vec4(galaxyColor, alpha);
    }
  `
)

extend({ GalaxyMaterial })

// TypeScript 类型扩展
declare global {
  namespace JSX {
    interface IntrinsicElements {
      galaxyMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

interface GalaxyShaderProps {
  primaryColor: string
  secondaryColor: string
}

export default function GalaxyShader({ primaryColor, secondaryColor }: GalaxyShaderProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const colors = useMemo(() => ({
    primary: new THREE.Color(primaryColor),
    secondary: new THREE.Color(secondaryColor),
  }), [primaryColor, secondaryColor])
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
  
  return (
    <galaxyMaterial
      ref={materialRef}
      uTime={0}
      uPrimaryColor={colors.primary}
      uSecondaryColor={colors.secondary}
      transparent
      side={THREE.FrontSide}
      depthWrite={false}
    />
  )
}
