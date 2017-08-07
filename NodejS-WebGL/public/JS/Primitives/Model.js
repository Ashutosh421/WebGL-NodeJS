function Model(gl, modelName) {
    this.name = "Custom Model";
    if (modelName != undefined && modelName != null) {
        this.name = modelName;
    }   
    this.ready = false;
    this.mesh;

    this.vertices;
    this.faces;
    this.normals;

    this.vertexBuffer;
    this.indexBuffer;

    this.vertexPosAttribLocation;
    this.light;

    this.init(gl);
}


Model.prototype.init = function (gl){
    this.shader = new Shader(`/public/Shaders/DirectionalLit/vertexShader_DLit.vert`, `/public/Shaders/DirectionalLit/fragmentShader_DLit.frag`);
    this.shader.init(gl, () =>
    {   
        loadJsonFromResource(`/public/Models/Fbx/Susan.json`, (err, result) =>{
            if (err != null) {
                console.log("Couldn't successfully load the Model");
            }
            else
            {
                this.texture = new Texture2D(gl , "/public/Models/Fbx/SusanTexture.png");

                this.mesh = result;

                this.vertices = this.mesh.meshes[0].vertices;
                this.faces = [].concat.apply([], this.mesh.meshes[0].faces);
                this.texCords = this.mesh.meshes[0].texturecoords[0];
                this.normals = this.mesh.meshes[0].normals;

                this.vertexPosAttribLocation = gl.getAttribLocation(this.shader.getShaderProgram(), "vertPos");
                this.texAttribLocation = gl.getAttribLocation(this.shader.getShaderProgram(), "textCord");
                this.normalAttribLocation = gl.getAttribLocation(this.shader.getShaderProgram(), "normal");
               // console.log("Normal Location obstained is " + this.normalAttribLocation);

                this.vertexArrayObject = gl.createVertexArray();
                gl.bindVertexArray(this.vertexArrayObject);

                this.vertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
                
                gl.vertexAttribPointer(this.vertexPosAttribLocation, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

                this.texBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCords), gl.STATIC_DRAW);
                
                gl.vertexAttribPointer(this.texAttribLocation, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

                this.normalBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

                gl.vertexAttribPointer(this.normalAttribLocation, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT , 0);

                gl.enableVertexAttribArray(this.vertexPosAttribLocation);
                gl.enableVertexAttribArray(this.texAttribLocation);
                gl.enableVertexAttribArray(this.normalAttribLocation);

                this.elementBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces), gl.STATIC_DRAW);

                

                this.transform = new Transform();
                this.transform.setRotation( 0 , 180 , 0);
                
                this.identityMatrix = mat4.create();
                mat4.identity(this.identityMatrix);

                
                this.ready = true;
            }
        });
    });
}

Model.prototype.draw = function (gl)
{
    if (this.ready)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.enableVertexAttribArray(this.vertPosAttribLocation);
        gl.enableVertexAttribArray(this.vertTextAttribLocation);
        gl.enableVertexAttribArray(this.normalAttribLocation);

        this.shader.bind(gl);
        this.transform.bind();
        this.texture.bind(gl);

        this.shader.setUniformLocationMatrix4fv(gl, this.transform.getModelMatrix(), "worldMatrix");
        this.updateLightInformation(gl);

        this.setCameraProjection_Matrix(gl);
        this.setCameraView_Matrix(gl);

        this.update(gl);

        gl.drawElements(gl.TRIANGLES, this.faces.length, gl.UNSIGNED_SHORT, 0);

        this.shader.unbind(gl);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.disableVertexAttribArray(this.vertPosAttribLocation);
        gl.disableVertexAttribArray(this.vertTextAttribLocation);
        gl.disableVertexAttribArray(this.normalAttribLocation);
    }
}

Model.prototype.setCameraView_Matrix = function (gl)
{
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "viewMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getViewMatrix(), "viewMatrix");
}

Model.prototype.setCameraProjection_Matrix = function (gl)
{
    if (this.viewCamera == undefined || this.viewCamera == null) {
        this.shader.setUniformLocationMatrix4fv(gl, this.identityMatrix, "projectionMatrix");
        return;
    }
    this.shader.setUniformLocationMatrix4fv(gl, this.viewCamera.getProjectionMatrix(), "projectionMatrix");
}

Model.prototype.setViewCamera = function (viewCamera)
{
    this.viewCamera = viewCamera;
}

Model.prototype.update = function (gl) {
   this.transform.setRotation(180, Time.getCurrentTime() , 0);
}

Model.prototype.setDirectionalLight = function (light) {
    this.light = light;
}

Model.prototype.updateLightInformation = function (gl) {
    if (light == undefined || light == null) {
        return;
    }
    this.shader.setUniformLocationVec4fv(gl, this.light.getDirection(), "directionLight.direction");
    this.shader.setUniformLocationVec4fv(gl, this.light.getColor(), "directionLight.color");
}