//Creating a Triangle Constructor Function and Template Here
function Triangle() {
    this.name = "Triangle";

    this.init(gl);
}

Triangle.prototype = primitive;

Triangle.prototype.init = function(gl) {
    //Initialize the Traingle Here
    this.vertices =
    [
    -0.5 , -0.5 , 0 ,    0.5 ,  0   , 0    ,
    0    ,  0.5 , 0 ,    0   , 0.5  , 0    ,
    0.5  , -0.5 , 0 ,    0   ,  0   , 0.5  ,
    ];

    /*for (let i = 0; i < 3 ; i++)
    {
        console.log(`Element at ${i} is X:${vertices[i].x} , Y:${vertices[i].y} , Z:${vertices[i].z}`);
    }*/

    this.shader = new Shader(`/public/Shaders/VertexLit/vertexShader.vert`, `/public/Shaders/VertexLit/fragmentShader.frag`);
    this.shader.init(gl);
    this.shader.bind(gl);

    this.vertPosAttribLocation = gl.getAttribLocation(this.shader.getShaderProgram(), "vertPos");
    this.vertColorAttribLocation = gl.getAttribLocation(this.shader.getShaderProgram(), "vertColor");

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.vertPosAttribLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(this.vertColorAttribLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(this.vertPosAttribLocation);
    gl.enableVertexAttribArray(this.vertColorAttribLocation);

    this.transform = new Transform();

    this.transform.bind();
    //Set the Model or World Matrix for the Triangle
    let worldMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
   // this.shader.setUniformLocationMatrix4fv(gl, worldMatrix, "worldMatrix");
    this.shader.setUniformLocationMatrix4fv(gl, this.transform.getModelMatrix(), "worldMatrix");

    this.identityMatrix = mat4.create();
    mat4.identity(this.identityMatrix);
}

Triangle.prototype.draw = function(gl) {
    this.shader.bind(gl);
    this.transform.bind();
    this.shader.setUniformLocationMatrix4fv(gl, this.transform.getModelMatrix(), "worldMatrix");

    //Send Camera View and Projection Matrix to the Shader
    this.setCameraView_Matrix(gl);
    this.setCameraProjection_Matrix(gl);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

Triangle.prototype.setCameraView_Matrix = function(gl) {
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "viewMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getViewMatrix(), "viewMatrix");
    //this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "viewMatrix");
}

Triangle.prototype.setCameraProjection_Matrix = function(gl) {
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "projectionMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getProjectionMatrix(), "projectionMatrix");
}

Triangle.prototype.setViewCamera = function (viewCamera)
{
    this.viewCamera = viewCamera;
}


