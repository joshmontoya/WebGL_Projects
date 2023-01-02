var InitDemo = function (){
  console.log('This is working');

  var canvas = document.getElementById("my_canvas");
  var gl = canvas.getContext("webgl");

  // Set the Canvas
  gl.clearColor(0.57, 0.99, 1.77, 0.9);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  /* Declare empty triangleVertices array */
  var triangleVertices = [];

  /* Function to add coordinates of 3 vertices that specify a triangle to triangleVertices array */
  function triangle(a, b, c){
    triangleVertices.push(a, b, c);
  }

  /* Manual mix function for midpoint calculation prior to sending to shader */
  function midpoint(p1, p2){
    var mid = [];
    mid[0] = (p1[0] + p2[0]) / 2;
    mid[1] = (p1[1] + p2[1]) / 2;
    return mid;
  }

  /* Recursive Sierpinski triangle creation function
  @param a, b, c = initial or recursive coordinate arrays (2-D) triangle vertices
  @param count = user determined number of times subdivision of triangle is wanted
  */

  function sierpinski(a, b, c, count){
    if (count == 0) {
      // Store final triangle into vertices array and end function
      triangle(a, b, c);
      return;
    } else {
      // Compute midpoints of each triangle side
      var ab = midpoint(a, b);
      var bc = midpoint(b, c);
      var ac = midpoint(a, c);

      count--;

      // Recursive call using vertices of newly formed sub-triangles based on midpoints
      sierpinski(a, ab, ac, count);
      sierpinski(ab, b, bc, count);
      sierpinski(ac, bc, c, count);
    }
  }

  sierpinski([-0.75, -0.75], [0.0, 0.75], [0.75, -0.75], 5);

  for(var i = 0; i < triangleVertices.length; i+= 3){
    var vertices = [];
    vertices.push(triangleVertices[i][0], triangleVertices[i][1],
      triangleVertices[i+1][0], triangleVertices[i+1][1],
      triangleVertices[i+2][0], triangleVertices[i+2][1]);

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

    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
