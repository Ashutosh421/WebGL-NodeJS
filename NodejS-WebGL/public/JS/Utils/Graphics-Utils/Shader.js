//Shader Constructor Function
function Shader(vShader, fShader)
{
    this.vertexShader;
    this.fragmentShader;
    this.shaderProgram;
    
    this.vertexShaderURL = vShader;
    this.fragmentShaderURL = fShader;

    this.vertexShaderSource = "";
    this.fragmentShaderSource = "";
}

Shader.prototype.init = function(gl , callback){
    /*
        Setup all the Shaders here in..
        Create the Vertex Shader..
        Create the Fragment Shader..

        gl refers to the webgl drawing context
    */
    loadTextFromResource(this.vertexShaderURL, (error, responseText) => {
        if (error != null) {
        }
        else
        {   
            this.vertexShaderSource = responseText;
            loadTextFromResource(this.fragmentShaderURL, (error, responseText) => {
                if (error != null) {
                }
                else {
                    this.fragmentShaderSource = responseText;
                    this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
                    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

                    //Setting Up the Vertex Shader's Source
                    gl.shaderSource(this.vertexShader, this.vertexShaderSource);
                    //Compiling the Vertex Shader
                    gl.compileShader(this.vertexShader);

                    //Check if Vertex Shader is compiled successfully
                    if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
                        console.log("Vertex Shader couldn't compile " + gl.getShaderInfoLog(this.vertexShader));
                    }
                    else {
                        console.log("Vertex Shader successfully compiled");
                    }

                    //Setting up the Fragment Shader's Source
                    gl.shaderSource(this.fragmentShader, this.fragmentShaderSource);
                    //Compiling the Fragment Shader
                    gl.compileShader(this.fragmentShader);

                    //Check if Fragment Shader is compiled Successfully
                    if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
                        console.log("Fragment Shader couldn't compile " + gl.getShaderInfoLog(this.fragmentShader));
                    }
                    else {
                        console.log("Fragment Shader successfully compiled");
                    }

                    //Creating the Shader Program
                    this.shaderProgram = gl.createProgram();
                    gl.attachShader(this.shaderProgram, this.vertexShader);
                    gl.attachShader(this.shaderProgram, this.fragmentShader);
                    gl.linkProgram(this.shaderProgram);

                    //Check if the Program is Linked Properly
                    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
                        console.log(`Error Linking the Shader Program  ${gl.getProgramInfoLog(this.shaderProgram)}`);
                    }
                    else {
                        console.log("Shader Program linked successfully");
                    }

                    callback("Shader Load Complete");
                }
            });
        }
    });
}

Shader.prototype.bind = function(gl){
    gl.useProgram(this.shaderProgram);
}

Shader.prototype.unbind = function (gl) {
    gl.useProgram(null);
}

Shader.prototype.getShaderProgram = function(){
    return this.shaderProgram;
}

Shader.prototype.setUniformLocationMatrix4fv = function(gl, value, location) 
{
    let matrixLocation = gl.getUniformLocation(this.shaderProgram, location);
    gl.uniformMatrix4fv(matrixLocation, gl.FALSE, value);
}

Shader.prototype.setUniformLocationVec3fv = function (gl, value, location) {
    let vec3Location = gl.getUniformLocation(this.shaderProgram, location);
    gl.uniform3fv(vec3Location, value);
}

Shader.prototype.setUniformLocationVec4fv = function (gl, value, location) {
    let vec4Location = gl.getUniformLocation(this.shaderProgram, location);
    gl.uniform4fv(vec4Location, value);
}

Shader.prototype.setUniformLocationFloat = function(gl, value, location)
{
    let floatLocation = gl.getUniformLocation(this.shaderProgram, location);
    gl.uniform1f(floatLocation , value);
}