function Vector3(x , y , z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.add = (other) =>
{
    return new Vector3((this.x + other.x), (this.y + other.y), (this.z + other.z));
}

Vector3.prototype.subtract = (other) =>
{
    return new Vector3((this.x - other.x), (this.y - other.y), (this.z - other.z));
}

Vector3.prototype.scalarMultiply = (other) =>
{
    return new Vector3((this.x * other), (this.y * other), (this.z * other));
}

Vector3.prototype.magnitude = () =>
{
    return ((this.x ** 2) + (this.y ** 2) + (this.z ** 2)) ** (1 / 2);
}

Vector3.prototype.normalized = () =>
{
    let magnitude = this.magnitude();
    return new Vector3(this.x / magnitude, this.y / magnitude, this.z / magnitude);
}

Vector3.prototype.set = function (x , y , z) {
    this.x = x;
    this.y = y;
    this.z = z;
}