function Transform()
{
    this.position;
    this.rotation;
    this.scale;

    this.positionVec;
    this.scaleVec;

    this.translationMatrix;


    this.rotationMatrix;

    this.rotationXMatrix;
    this.rotationYMatrix;
    this.rotationZMatrix;

    this.scaleMatrix;

    this.modelMatrix;
    this.identityMatrix;

    this.init();
}

Transform.prototype.init = function ()
{
    this.position = new Vector3(0, 0, 0);
    this.scale = new Vector3(0, 0, 0);
    this.rotation = new Vector3(0, 0, 0);

    this.positionVec = vec3.create();
    this.scaleVec = vec3.create();

    this.setScale(1, 1, 1);
    
    this.translationMatrix = mat4.create();
    this.rotationMatrix = mat4.create();

    this.rotationXMatrix = mat4.create();
    this.rotationYMatrix = mat4.create();
    this.rotationZMatrix = mat4.create();

    this.scaleMatrix = mat4.create();
    this.modelMatrix = mat4.create();
    mat4.identity(this.modelMatrix);

    this.identityMatrix = mat4.create();
    mat4.identity(this.identityMatrix);
}

Transform.prototype.bind = function () {
    mat4.translate(this.translationMatrix, this.identityMatrix, this.positionVec);

    mat4.rotate(this.rotationXMatrix, this.identityMatrix, this.rotation.x, [1, 0, 0]);
    mat4.rotate(this.rotationYMatrix, this.identityMatrix, this.rotation.y, [0, 1, 0]);
    mat4.rotate(this.rotationZMatrix, this.identityMatrix, this.rotation.z, [0, 0, 1]);
    
    mat4.multiply(this.rotationMatrix, this.rotationYMatrix, this.rotationXMatrix);
    mat4.multiply(this.rotationMatrix, this.rotationZMatrix, this.rotationMatrix);

    mat4.scale(this.scaleMatrix, this.identityMatrix, this.scaleVec);

    mat4.multiply(this.modelMatrix, this.rotationMatrix, this.translationMatrix);
    mat4.multiply(this.modelMatrix, this.scaleMatrix, this.modelMatrix);
}

Transform.prototype.setPosition = function (x, y, z) {
    this.position.set(x, y, z);
    vec3.set(this.positionVec, x, y, z);
}

Transform.prototype.getPosition = function () {
    return this.position;
}

Transform.prototype.setScale = function (x, y, z)
{
    this.scale.set(x, y, z);
    vec3.set(this.scaleVec, x, y, z);
}

Transform.prototype.getScale = function () {
    return this.scale;
}

Transform.prototype.setRotation = function (x, y, z) {
    this.rotation.set(x, y, z);
}

Transform.prototype.getModelMatrix = function ()
{
    return this.modelMatrix;
}
