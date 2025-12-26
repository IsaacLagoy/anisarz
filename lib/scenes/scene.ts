import { 
  Engine, 
  Scene, 
  Shader, 
  Mesh, 
  Material, 
  Node,
  Skybox,
  type RenderFunction 
} from '@isaaclagoy/webgl-canvas';
import { vec3, quat, mat4 } from 'gl-matrix';

/**
* Factory function to create a scene with spinning model(s)
* Takes WebGL context, model path(s), scale, and initial rotation, returns a render function that handles all rendering
* Can accept a single model path or an array of model paths - all models will share the same transformations
*/
export async function createCubeScene(
gl: WebGL2RenderingContext, 
modelPath: string | string[],
scale: vec3 = vec3.fromValues(1, 1, 1),
initialRotation: quat = quat.create(),
position: vec3 = vec3.fromValues(0, 0, 0)
): Promise<RenderFunction> {
// Create engine
const engine = await Engine.create(gl);

// Ensure canvas is properly sized and aspect ratio is correct
engine.resizeCanvas();

// Load quad shader for post-processing
const quadProgram = await Shader.create(
  gl,
  "/shaders/quad.vert",
  "/shaders/edge.frag"
);

// Assign quad program to engine framebuffer for final output
engine.framebuffer.program = quadProgram;

// Load scene shader
const program = await Shader.create(
  gl,
  "/shaders/default.vert",
  "/shaders/default.frag"
);

const skyboxShader = await Shader.create(
  gl,
  "/shaders/skybox.vert",
  "/shaders/skybox.frag"
);

// Create scene
const scene = new Scene(engine, program);
engine.scene = scene;

// Ensure camera has correct aspect ratio after scene creation
scene.camera.updateAspectRatio();

// Set camera to look at origin
scene.camera.setPosition(vec3.fromValues(0, 0, 5));
scene.camera.target = vec3.fromValues(0, 0, 0);
scene.camera.updateMatrices();

// Normalize modelPath to array
const modelPaths = Array.isArray(modelPath) ? modelPath : [modelPath];

// Load all model meshes in parallel
const modelMeshes = await Promise.all(
  modelPaths.map(path => Mesh.fromObj(engine, path))
);

// Create skybox (using cube mesh for skybox)
const skyboxCubeMesh = await Mesh.fromObj(engine, "/models/cube.obj");
const skybox = new Skybox(engine, scene, skyboxCubeMesh, skyboxShader);
scene.skybox = skybox;
scene.setCycleTime(0.5); // Noon

// Create plain material without textures
const material = new Material(engine);
// No texture set - plain material
material.roughnessMultiplier = 0.3;
material.metallic = 0.8;

// Manual rotation state - track rotation quaternion directly
let manualRotation = quat.clone(initialRotation);
// Angular velocity in radians per second
const angularVelocity = vec3.fromValues(0, 0.2, 0);

// Create model nodes for all meshes with the same transformations
const modelNodes = modelMeshes.map(mesh => {
  const node = new Node(
    scene,
    position,
    scale,
    quat.fromValues(0, 0, 1, 0),
    mesh,
    material
  );
  // Disable automatic angular velocity integration - we'll do it manually
  node.angularVelocity = vec3.fromValues(0, 0, 0);
  // Initialize rotation to match manualRotation state
  quat.copy(node.rotation, quat.normalize(manualRotation, manualRotation));
  scene.add(node);
  return node;
});

// Create and return render function
const renderFn = (dt: number) => {
  // Don't resize canvas on every frame - only resize when needed via resize() method
  // This prevents layout thrashing during scroll
  const canvasElement = engine.gl.canvas as HTMLCanvasElement;
  if (canvasElement.width === 0 || canvasElement.height === 0 || engine.width === 0 || engine.height === 0) {
    return;
  }

  // Manually integrate rotation (angular velocity to quaternion)
  // Convert angular velocity to quaternion form: q_omega = (wx, wy, wz, 0)
  const qOmega = quat.fromValues(angularVelocity[0], angularVelocity[1], angularVelocity[2], 0);
  // Multiply with current rotation: dq = 0.5 * dt * q_rotation * q_omega
  const dq = quat.create();
  quat.multiply(dq, manualRotation, qOmega);
  quat.scale(dq, dq, 0.5 * dt);
  // Add to current rotation and normalize
  quat.add(manualRotation, manualRotation, dq);
  quat.normalize(manualRotation, manualRotation);
  
  // Apply rotation to all nodes
  modelNodes.forEach(node => {
    quat.copy(node.rotation, manualRotation);
  });

  // Update scene (includes camera update with input handling)
  scene.update(dt);

  // Render
  engine.update();
  scene.render();
  engine.use();
  engine.framebuffer.render((gl: WebGL2RenderingContext, program: WebGLProgram) => {
    const quantizationLevelLoc = gl.getUniformLocation(program, "uQuantizationLevel");
    if (quantizationLevelLoc !== null) {
      gl.uniform1f(quantizationLevelLoc, 8.0);
    }

    const resolutionLoc = gl.getUniformLocation(program, "uResolution");
    if (resolutionLoc !== null) {
      gl.uniform2f(resolutionLoc, engine.width, engine.height);
    }

    // Calculate and pass inverse view-projection matrix for edge detection
    const inverseViewProjLoc = gl.getUniformLocation(program, "uInverseViewProj");
    if (inverseViewProjLoc !== null) {
      const viewProj = mat4.create();
      mat4.multiply(viewProj, scene.camera.projectionMatrix, scene.camera.viewMatrix);
      const inverseViewProj = mat4.create();
      mat4.invert(inverseViewProj, viewProj);
      gl.uniformMatrix4fv(inverseViewProjLoc, false, inverseViewProj);
    }
  });
};

// Create render function with methods
const render = Object.assign(renderFn, {
  cleanup: () => {
    scene.disableCameraControls();
    if (scene.camera) {
      // Camera no longer has destroy method, but keep for compatibility
    }
  },
  resize: () => {
    engine.resizeCanvas();
  },
  enableControls: (canvasElement: HTMLCanvasElement) => {
    scene.enableCameraControls(canvasElement);
  }
}) as RenderFunction;

return render;
}

