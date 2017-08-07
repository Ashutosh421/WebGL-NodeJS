function Quad(gl)
{
    this.name = "Quad";
    this.ready = false;
    this.init(gl);
}

Quad.prototype = primitive;

Quad.prototype.init = function (gl) {

    this.vertices =
        [
            -0.5 , -0.5 , 0 ,    0.5 ,   0 , 0   ,
             0.5 , -0.5 , 0 ,      0 , 0.5 , 0   ,
            -0.5 ,  0.5 , 0 ,      0 ,   0 , 0.5 ,
             0.5 , -0.5 , 0 ,      0 , 0.5 , 0   ,
             0.5 ,  0.5 , 0 ,    0.5 ,   0 , 0   ,
            -0.5 ,  0.5 , 0 ,      0 ,   0 , 0.5 ,
        ];
    

    this.shader = new Shader(`/public/Shaders/VertexLit/vertexShader.vert`, `/public/Shaders/VertexLit/fragmentShader.frag`);
    this.shader.init(gl, () => {
        this.shader.bind(gl);

        console.log("Quad Loaded Successfully");

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
        this.ready = true;
    });
    
}


Quad.prototype.draw = function (gl) {
    if (this.ready) {
        this.shader.bind(gl);
        this.transform.bind();
        this.shader.setUniformLocationMatrix4fv(gl, this.transform.getModelMatrix(), "worldMatrix");
        this.shader.setUniformLocationFloat(gl, Time.getCurrentTime(), "timer");

        //Send Camera View and Projection Matrix to the Shader
        this.setCameraView_Matrix(gl);
        this.setCameraProjection_Matrix(gl);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}

Quad.prototype.setCameraView_Matrix = function (gl) {
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "viewMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getViewMatrix(), "viewMatrix");
}

Quad.prototype.setCameraProjection_Matrix = function (gl) {
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "projectionMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getProjectionMatrix(), "projectionMatrix");
}

Quad.prototype.setViewCamera = function (viewCamera) {
    this.viewCamera = viewCamera;
}





