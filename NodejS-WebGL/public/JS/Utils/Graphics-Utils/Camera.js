function Camera()
{
    this.position;
    this.forward;
    this.up; 
    this.fieldOfView;

    this.viewMatrix;
    this.projectionMatrix;

    this.init();

    this.position_Ref;
}

Camera.prototype.init = function()
{
    this.position = new Float32Array(3);
    this.forward = new Float32Array(3);
    this.up = new Float32Array(3);

    this.viewMatrix = new Float32Array(16);
    this.projectionMatrix = new Float32Array(16);

    this.position_Ref = new Vector3(0, 0, 4);
    vec3.set(this.position, 0, 0, -10);
    vec3.set(this.forward, 0, 0, 0);
    vec3.set(this.up, 0, 1, 0);
    this.fieldOfView = 45;

    mat4.lookAt(this.viewMatrix, this.position, this.forward, this.up);
    mat4.perspective(this.projectionMatrix, glMatrix.toRadian(this.fieldOfView), display.WIDTH / display.HEIGHT, 0.1, 1000);
}

Camera.prototype.setUp = function (x, y, z)
{
    vec3.set(this.up, x, y, z);
}

Camera.prototype.setPosition = function (x, y, z)
{
    this.position_Ref.set(x, y, z);
    vec3.set(this.position, x, y, z);
}

Camera.prototype.setForward = function (x, y, z)
{
    vec3.set(this.forward, x, y, z);
}

Camera.prototype.getViewMatrix = function ()
{   
    return this.viewMatrix;
}

Camera.prototype.update = function ()
{
    mat4.lookAt(this.viewMatrix, this.position, this.forward, this.up);
    mat4.perspective(this.projectionMatrix, glMatrix.toRadian(this.fieldOfView), display.WIDTH / display.HEIGHT, 0.1, 1000.0);
}

Camera.prototype.getProjectionMatrix = function ()
{
    return this.projectionMatrix;   
}

Camera.prototype.getPosition = function () {
    return this.position_Ref;
}