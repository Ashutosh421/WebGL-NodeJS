
precision mediump float;
attribute vec3 vertPos;
//attribute vec3 vertColor;
attribute vec2 textCord;

uniform mat4 worldMatrix; // Model Matrix
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
    
varying vec2 frag_TextCord;
    
void main()
{
	frag_TextCord = textCord;
	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertPos.xyz , 1.0);
}