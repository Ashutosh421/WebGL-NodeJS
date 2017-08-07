function Cube(gl)
{
    this.name = "Quad";
    this.ready = false;
    this.init(gl);
}

Cube.prototype = primitive;

Cube.prototype.init = function (gl) {

    this.vertices =
        [ // X, Y, Z           R, G, B
            // Top
            -1.0,  1.0, -1.0,    0, 0,
            -1.0,  1.0,  1.0,    0, 1,
             1.0,  1.0,  1.0,    1, 1,
             1.0,  1.0, -1.0,    1, 0,

            // Left
            -1.0,  1.0,  1.0,    0, 0,
            -1.0, -1.0,  1.0,    1, 0,
            -1.0, -1.0, -1.0,    1, 1,
            -1.0,  1.0, -1.0,    0, 1,

            // Right
             1.0,  1.0,  1.0,    1, 1,
             1.0, -1.0,  1.0,    0, 1,
             1.0, -1.0, -1.0,    0, 0,
             1.0,  1.0, -1.0,    1, 0,

            // Front
             1.0,  1.0,  1.0,    1, 1,
             1.0, -1.0,  1.0,    1, 0,
            -1.0, -1.0,  1.0,    0, 0,
            -1.0,  1.0,  1.0,    0, 1,

            // Back
             1.0,  1.0, -1.0,    0, 0,
             1.0, -1.0, -1.0,    0, 1,
            -1.0, -1.0, -1.0,    1, 1,
            -1.0,  1.0, -1.0,    1, 0,

            // Bottom
            -1.0, -1.0, -1.0,    1, 1,
            -1.0, -1.0,  1.0,    1, 0,
             1.0, -1.0,  1.0,    0, 0,
             1.0, -1.0, -1.0,    0, 1,
        ];

    this.indices =
        [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            5, 4, 6,
            6, 4, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            13, 12, 14,
            15, 14, 12,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            21, 20, 22,
            22, 20, 23
        ];


    this.shader = new Shader(`/public/Shaders/VertexLit/vertexShader.vert`, `/public/Shaders/VertexLit/fragmentShader.frag`);
    this.shader.init(gl, () => {
        console.log("Success for Cube "+this);
        this.shader.bind(gl);

        this.texture = new Texture2D(gl, "/public/Textures/WallTexture_4.jpg");

        this.vertPosAttribLocation = gl.getAttribLocation(this.shader.getShaderProgram(), "vertPos");
        this.vertTextAttribLocation = gl.getAttribLocation(this.shader.getShaderProgram(), "textCord");
        //this.vertTextAttribLocation

        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.elementBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        gl.vertexAttribPointer(this.vertPosAttribLocation, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(this.vertTextAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

        gl.enableVertexAttribArray(this.vertPosAttribLocation);
        gl.enableVertexAttribArray(this.vertTextAttribLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        this.transform = new Transform();

        this.transform.bind();
        //Set the Model or World Matrix for the Triangle
        let worldMatrix = new Float32Array(16);
        mat4.identity(worldMatrix);

        this.shader.setUniformLocationMatrix4fv(gl, this.transform.getModelMatrix(), "worldMatrix");

        this.identityMatrix = mat4.create();
        mat4.identity(this.identityMatrix);
        this.ready = true;
    });
}

Cube.prototype.draw = function (gl) {
    if (this.ready) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.enableVertexAttribArray(this.vertPosAttribLocation);
        gl.enableVertexAttribArray(this.vertTextAttribLocation);

        this.shader.bind(gl);
        this.transform.bind();
        this.shader.setUniformLocationMatrix4fv(gl, this.transform.getModelMatrix(), "worldMatrix");
        this.shader.setUniformLocationFloat(gl, Time.getCurrentTime(), "timer");

        //Send Camera View and Projection Matrix to the Shader
        this.setCameraView_Matrix(gl);
        this.setCameraProjection_Matrix(gl);

        this.texture.bind(gl);

        //gl.drawArrays(gl.TRIANGLES, 0, 36);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);

        this.shader.unbind(gl);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(this.vertPosAttribLocation);
        gl.disableVertexAttribArray(this.vertTextAttribLocation);
    }
}

Cube.prototype.setCameraView_Matrix = function (gl) {
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "viewMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getViewMatrix(), "viewMatrix");
}

Cube.prototype.setCameraProjection_Matrix = function (gl) {
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "projectionMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getProjectionMatrix(), "projectionMatrix");
}

Cube.prototype.setViewCamera = function (viewCamera) {
    this.viewCamera = viewCamera;
}

Cube.prototype.setRotation = function (x, y, z) {
    if (this.ready) {
        this.transform.setRotation(x, y, z);
    }
}

//Cube.prototype.getBufferUsage = functiongl(){}

