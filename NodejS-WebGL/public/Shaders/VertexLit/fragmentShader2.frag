precision mediump float;
varying vec2 frag_TextCord;

uniform float timer;
uniform sampler2D mainTexture;

void main()
{	
	gl_FragColor = texture2D(mainTexture , frag_TextCord);
}