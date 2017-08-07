
precision mediump float;

attribute vec3 vertPos;
attribute vec2 textCord;
attribute vec3 normal;

uniform mat4 worldMatrix; 
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
    
varying vec2 frag_TextCord;
varying vec3 frag_Normals;

    
void main()
{
	frag_TextCord = textCord;
	frag_Normals = (worldMatrix * vec4(normal , 0.0)).xyz;
	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertPos.xyz , 1.0);
}