function Texture2D(gl,imagePath)
{
    this.name;
    this.texture;
    this.image;
    this.init(gl, imagePath);

    this.ready = false;
}

Texture2D.prototype.init = function (gl , imagePath)
{   
    loadImage(imagePath, (err, image) =>
    {
        if (err) {
            console.log("Image couldn;t be loaded from the following URL " + imagePath);
        }
        else {
            this.image = image;
            this.texture = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);

            gl.bindTexture(gl.TEXTURE_2D, null);
            this.ready = true;
        }
    });
}

Texture2D.prototype.bind = function (gl)
{
    if (this.ready) {
        if (this.texture == undefined && this.texture == null) {
            return;
        }
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.activeTexture(gl.TEXTURE0);
    }
}

Texture2D.prototype.unbind = function (gl) {
    if (this.ready) {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}