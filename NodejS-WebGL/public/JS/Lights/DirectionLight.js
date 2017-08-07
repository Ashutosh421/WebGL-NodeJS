function DirectionalLight() {
    this.init();
}

DirectionalLight.prototype = light;

DirectionalLight.prototype.init = function ()
{
    this.position = vec3.create();
    this.direction = vec4.create();
    this.color = vec4.create(1, 1, 1, 1);
};

DirectionalLight.prototype.setPosition = function (x , y , z)
{
    vec3.set(this.position , x , y , z);
}

DirectionalLight.prototype.setDirection = function (x, y, z)
{
    vec3.set(this.direction , x , y , z , 0.0);
}

DirectionalLight.prototype.setColor = function (r, b, g, a) {
    vec4.set(this.color , r , b , g , a);
}

DirectionalLight.prototype.getDirection = function () {
    return this.direction;
}

DirectionalLight.prototype.getColor = function () {
    return this.color;
}