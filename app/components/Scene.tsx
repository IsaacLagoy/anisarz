"use client";

import { WebGLCanvas } from '@isaaclagoy/webgl-canvas';
import { createCubeScene } from '@/lib/scenes/scene';

export default function Scene() {
  return <WebGLCanvas sceneFactory={createCubeScene} />;
}