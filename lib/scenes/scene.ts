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
 * Factory function to create a scene with a spinning model
 * Takes WebGL context, model path, scale, and initial rotation, returns a render function that handles all rendering
 */
export async function createCubeScene(
  gl: WebGL2RenderingContext, 
  modelPath: string,
  scale: vec3 = vec3.fromValues(1, 1, 1),
  initialRotation: quat = quat.create()
): Promise<RenderFunction> {
  // Create engine
  const engine = await Engine.create(gl);

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

  // Set camera to look at origin
  scene.camera.setPosition(vec3.fromValues(0, 0, 5));
  scene.camera.target = vec3.fromValues(0, 0, 0);
  scene.camera.updateMatrices();

  // Load model mesh
  const modelMesh = await Mesh.fromObj(engine, modelPath);

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

  // Create model node with scale and initial rotation (quaternion)
  const modelNode = new Node(
    scene,
    vec3.fromValues(0, 0, 0),
    scale,
    initialRotation,
    modelMesh,
    material
  );
  scene.add(modelNode);
  modelNode.angularVelocity = vec3.fromValues(0, 1, 0);

  let rotationAngle = 0;

  // Create and return render function
  const render: RenderFunction = (dt: number) => {
    // Resize canvas
    engine.resizeCanvas();

    const canvas = engine.gl.canvas as HTMLCanvasElement;
    if (canvas.width === 0 || canvas.height === 0 || engine.width === 0 || engine.height === 0) {
      return;
    }

    // Update camera
    scene.camera.update(dt);

    // Update scene
    scene.update(dt);

    // Render
    engine.update();
    scene.render();
    engine.use();
    engine.framebuffer.render((gl, program) => {
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

  // Add cleanup function
  render.cleanup = () => {
    if (scene.camera) {
      scene.camera.destroy();
    }
  };

  // Add resize function to immediately trigger canvas resize
  render.resize = () => {
    engine.resizeCanvas();
  };

  return render;
}

