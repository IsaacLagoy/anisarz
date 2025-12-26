"use client";

import { WebGLCanvas } from '@isaaclagoy/webgl-canvas';
import { createCubeScene } from '@/lib/scenes/scene';
import { vec3, quat } from 'gl-matrix';

interface SceneProps {
  modelPath: string | string[];
  scale?: [number, number, number] | vec3;
  initialRotation?: quat; // Quaternion for initial rotation
  position?: [number, number, number] | vec3; // Position transform
}

export default function Scene({ modelPath, scale, initialRotation, position }: SceneProps) {
  const sceneFactory = (gl: WebGL2RenderingContext) => {
    const scaleVec = scale ? (Array.isArray(scale) ? vec3.fromValues(scale[0], scale[1], scale[2]) : scale) : undefined;
    const rotQuat = initialRotation || undefined;
    const posVec = position ? (Array.isArray(position) ? vec3.fromValues(position[0], position[1], position[2]) : position) : undefined;
    return createCubeScene(gl, modelPath, scaleVec, rotQuat, posVec);
  };
  return <WebGLCanvas sceneFactory={sceneFactory} />;
}