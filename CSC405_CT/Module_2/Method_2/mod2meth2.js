/* Declare global variables */
var triangleVertices = [];

/* Function to add location of 3 vertices that specify a triangle to trianglePoints array */

function triangle(a, b, c) {
 triangleVertices.push(a, b, c);
}


/* Prepare the canvas and get WebGL context */

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

// /* Define initial triangle geometry and store it in buffer objects */

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

//FIXME

//   var vertices_dup = [-0.5, -0.5, -0.25, -0.25, 0, -0.25];
 
//   // Create a new buffer object
//   var vertex_buffer2 = gl.createBuffer();

//   // Bind an empty array buffer to it
//   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer2);

//   // Pass the vertices data to the buffer
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_dup), gl.STATIC_DRAW);

//   // Unbind the buffer
//   gl.bindBuffer(gl.ARRAY_BUFFER, null);

//   /* Create and compile Shader programs for initial triangle */

//   // Vertex shader source code
//   var vertCode2 = 
//     'attribute vec2 coordinates;' + 
//     'void main(void) {' + ' gl_Position = vec4(coordinates, 0.0, 1.0);' + '}';

//   // Create a vertex shader object
//   var vertShader2 = gl.createShader(gl.VERTEX_SHADER);

//   // Attach vertex shader source code
//   gl.shaderSource(vertShader2, vertCode2);

//   // Compile the vertex shader
//   gl.compileShader(vertShader2);

//   // Fragment shader source code
//   var fragCode2 = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' + '}';

//   // Create fragment shader object
//   var fragShader2 = gl.createShader(gl.FRAGMENT_SHADER);

//   // Attach fragment shader source code
//   gl.shaderSource(fragShader2, fragCode2);

//   // Compile the fragment shader
//   gl.compileShader(fragShader2);

//   // Create a shader program object to store combined shader program
//   var shaderProgram2 = gl.createProgram();

//   // Attach a vertex shader
//   gl.attachShader(shaderProgram2, vertShader2);

//   // Attach a fragment shader
//   gl.attachShader(shaderProgram2, fragShader2);

//   // Link both programs
//   gl.linkProgram(shaderProgram2);

//   // Use the combined shader program object
//   gl.useProgram(shaderProgram2);

//   /* Associate the shader programs to buffer objects */

//   // Bind vertex buffer object
//   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer2);

//   // Get the attribute location
//   var coord2 = gl.getAttribLocation(shaderProgram2, "coordinates");

//   // Point an attribute to the currently bound VBO
//   gl.vertexAttribPointer(coord2, 2, gl.FLOAT, false, 0, 0);

//   // Enable the attribute
//   gl.enableVertexAttribArray(coord2);

//   /* Draw the initial triangle */

// //   // Clear the canvas
// //   gl.clearColor(0.0, 0.0, 0.0, 0.1);

// //   // Enable the depth test
// //   gl.enable(gl.DEPTH_TEST);

//   // Clear the color buffer bit
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   // Set the view port
//   gl.viewport(0, 0, canvas.width, canvas.height);

//   // Draw the triangle
//   gl.drawArrays(gl.TRIANGLES, 0, 3);


//FIXME



/* Recursive function for Sierpinski triangle creation */

function sierpinski(a, b, c) {
  // Add passed vertices into triangleVertices array for storage
//   triangle(a, b, c);

  // Compute midpoints of each side
  var ab = mix(a, b, 0.5);
  var bc = mix(b, c, 0.5);
  var ac = mix(a, c, 0.5);

  // Add veritices of newly formed triangles based on midpoints into triangleVertices array
  triangle(a, ab, ac);
//   triangle(ab, b, bc);
//   triangle(ac, bc, c);

  var vertices_dup = [-0.5, -0.5, -0.25, -0.25, 0, -0.25];  //FIXME
 
  // Create a new buffer object
  var vertex_buffer = gl.createBuffer();

  // Bind an empty array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Pass the vertices data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_dup), gl.STATIC_DRAW);

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
  var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' + '}';

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

  }
  // Call sierpinski function for first (test) sub-triangle
//   sierpinski(vec2(vertices[0], vertices[1]), vec2(vertices[2], vertices[3]), vec2(vertices[4], vertices[5]));


