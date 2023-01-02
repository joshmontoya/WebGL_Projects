/* Declare global variables */
var triangleVertices = [];

/* Function to add location of 3 vertices that specify a triangle to trianglePoints array */

function triangle(a, b, c) {
 triangleVertices.push(a, b, c);
}


/* Prepare the canvas and get WebGL context */

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

/* Define initial triangle geometry and store it in buffer objects */

var vertices = [-0.5, -0.5, 0.0, 0.5, 0.5, -0.5];

// Create a new buffer object
var vertex_buffer = gl.createBuffer();

// Bind an empty array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Pass the vertices data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

/* Create and compile Shader programs for initial triangle */

// Vertex shader source code
var vertCode = 
  'attribute vec2 coordinates;' + 
  'void main(void) {' + ' gl_Position = vec4(coordinates, 0.0, 1.0);' + '}';

// Create a vertex shader object
var vertShader = gl.createShader(gl.VERTEX_SHADER);

// Attach vertex shader source code
gl.shaderSource(vertShader, vertCode);

// Compile the vertex shader
gl.compileShader(vertShader);

// Fragment shader source code
var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);' + '}';

// Create fragment shader object
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

// Attach fragment shader source code
gl.shaderSource(fragShader, fragCode);

// Compile the fragment shader
gl.compileShader(fragShader);

// Create a shader program object to store combined shader program
var shaderProgram = gl.createProgram();

// Attach a vertex shader
gl.attachShader(shaderProgram, vertShader);

// Attach a fragment shader
gl.attachShader(shaderProgram, fragShader);

// Link both programs
gl.linkProgram(shaderProgram);

// Use the combined shader program object
gl.useProgram(shaderProgram);

/* Associate the shader programs to buffer objects */

// Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Get the attribute location
var coord = gl.getAttribLocation(shaderProgram, "coordinates");

// Point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

// Enable the attribute
gl.enableVertexAttribArray(coord);

/* Draw the initial triangle */

// Clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 0.1);

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

// Clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// Set the view port
gl.viewport(0, 0, canvas.width, canvas.height);

// Draw the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);



/* Recursive function for Sierpinski triangle creation */

function sierpinski(a, b, c) {
  // Add passed vertices into triangleVertices array for storage
//   triangle(a, b, c);

  // Compute midpoints of each side
  const ab = mix(a, b, 0.5);
  const bc = mix(b, c, 0.5);
  const ac = mix(a, c, 0.5);

  // Add veritices of newly formed triangles based on midpoints into triangleVertices array
  triangle(a, ab, ac);
//   triangle(ab, b, bc);
//   triangle(ac, bc, c);

  const vertices_dup = [-0.5, -0.5, -0.25, -0.25, 0, -0.25];  //FIXME
 
  // Create a new buffer object
  const vertex_buffer = gl.createBuffer();

  // Bind an empty array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Pass the vertices data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_dup), gl.STATIC_DRAW);

  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  /* Create and compile Shader programs for initial triangle */

  // Vertex shader source code
  const vertCode = 
    'attribute vec2 coordinates;' + 
    'void main(void) {' + ' gl_Position = vec4(coordinates, 0.0, 1.0);' + '}';

  // Create a vertex shader object
  const vertShader = gl.createShader(gl.VERTEX_SHADER);

  // Attach vertex shader source code
  gl.shaderSource(vertShader, vertCode);

  // Compile the vertex shader
  gl.compileShader(vertShader);

  // Fragment shader source code
  const fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' + '}';

  // Create fragment shader object
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  // Attach fragment shader source code
  gl.shaderSource(fragShader, fragCode);

  // Compile the fragment shader
  gl.compileShader(fragShader);

  // Create a shader program object to store combined shader program
  const shaderProgram = gl.createProgram();

  // Attach a vertex shader
  gl.attachShader(shaderProgram, vertShader);

  // Attach a fragment shader
  gl.attachShader(shaderProgram, fragShader);

  // Link both programs
  gl.linkProgram(shaderProgram);

  // Use the combined shader program object
  gl.useProgram(shaderProgram);

  /* Associate the shader programs to buffer objects */

  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Get the attribute location
  const coord = gl.getAttribLocation(shaderProgram, "coordinates");

  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

  // Enable the attribute
  gl.enableVertexAttribArray(coord);

  /* Draw the initial triangle */

  // Clear the canvas
  gl.clearColor(0.0, 0.0, 0.0, 0.1);

  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  }
  // Call sierpinski function for first (test) sub-triangle
  sierpinski(vec2(vertices[0], vertices[1]), vec2(vertices[2], vertices[3]), vec2(vertices[4], vertices[5]));


