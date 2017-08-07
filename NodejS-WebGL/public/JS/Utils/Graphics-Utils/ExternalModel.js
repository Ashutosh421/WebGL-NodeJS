function ExternalModel(url , name) {
    this.name = name;
    this.ready = false;
    this.model;
}

ExternalModel.prototype = primitive;

ExternalModel.prototype.init = function (gl) {
    this.shader = new Shader(`/public/Shaders/VertexLit/vertexShader.vert`, `/public/Shaders/VertexLit/fragmentShader.frag`);
    this.shader.init(gl, () => {
        console.log("External Model:: Shader Initialization Complete");
        loadJsonFromResource("/public/Models/Fbx/Susan.json", (err, obj) => {
            if (err == null) {
                console.log("Couudn't read the JSON File");
            }
            else
            {
                this.model = obj;
                this.vertices = this.model.meshes[0].vertices;

                this.vertexArray_Object = gl.createVertexArray();

                this.vertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices) , gl.STATIC_DRAW);

                this.normalsBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);

                this.indices = this.model.meshes[0].faces;

            }
        });
    });
}

ExternalModel.prototype.draw = function (gl) {
    if (this.ready) {

    }
}

ExternalModel.prototype.setCameraView_Matrix = function (gl) {

}

ExternalModel.prototype.setCameraProjection_Matrix = function (gl) {
}

ExternalModel.prototype.setViewCamera = function (viewCamera) {

}

ExternalModel.prototype.setRotation = function (x, y, z) {
    if (this.ready) {

    }
}