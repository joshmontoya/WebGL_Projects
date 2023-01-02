var InitDemo = function (){
  console.log('This is working');

  var canvas = document.getElementById('my_canvas');
  var gl = canvas.getContext('webgl');

  // Set the Canvas
  gl.clearColor(0.0, 0.0, 0, 0.2);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  /* Manual mix function for midpoint calculation prior to sending to shader */
  function midpoint(p1, p2){
    var mid = [];
    mid[0] = (p1[0] + p2[0]) / 2;
    mid[1] = (p1[1] + p2[1]) / 2;
    return mid;
  }

  /* Iterative Sierpinski triangle creation function
  @param v1, v2, v3 = user-defined coordinate arrays (2-D) triangle vertices
  @param numPoints = user-defined number of points to draw in creating image
  */
  function sierpinski(v1, v2, v3, numPoints){
    // Store initial vertices into array
    var vertices = [v1, v2, v3];
    
    // Declare empty arrays to store points (2-D arrays) & point coordinates
    var points = [];
    var coordinates = [];

    // Establish initial reference point by finding point within triangle
    var u = midpoint(v1, v2);
    var v = midpoint(v1, v3);
    var p = midpoint(u, v);

    // Add initial point to points array
    points.push(p);

    // Iterative loop to choose random vertex, find point at midpoint between it and last point, then push onto points array
    for(var i = 0; points.length < numPoints; i++){
      var r = Math.floor(Math.random() * 3);
      var q = midpoint(points[i], vertices[r]);
      points.push(q);
      coordinates.push(q[0], q[1]);
    }

    for(var i = 0; i < numPoints; i++){
      // Create a new buffer object
      var vertex_buffer = gl.createBuffer();
    
      // Bind an empty array buffer to it
      gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    
      // Pass the vertices data to the buffer
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinates), gl.STATIC_DRAW);
    
      // Unbind the buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
      /* Create and compile Shader programs */
    
      // Vertex shader source code
      var vertCode = 
        'attribute vec2 coordinates;' + 
        'void main(void) {' + ' gl_Position = vec4(coordinates, 0, 1.0);' + 'gl_PointSize = 3.0;' + '}';
    
      // Create a vertex shader object
      var vertShader = gl.createShader(gl.VERTEX_SHADER);
    
      // Attach vertex shader source code
      gl.shaderSource(vertShader, vertCode);
    
      // Compile the vertex shader
      gl.compileShader(vertShader);
    
      // Fragment shader source code
      var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(1.7, 0.3, 0.2, 1.0);' + '}';
    
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
    
      // Draw the points
      gl.drawArrays(gl.POINTS, 0, numPoints);
    }
  }

  // Call function to create and draw points
  sierpinski([-0.75, -0.75], [0.0, 0.75], [0.75, -0.75], 3000);
}
