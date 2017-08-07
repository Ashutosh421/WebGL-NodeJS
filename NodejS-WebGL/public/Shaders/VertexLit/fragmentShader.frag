precision mediump float;
varying vec2 frag_TextCord;

uniform float timer;
uniform sampler2D texture1;

void main()
{	
	//gl_FragColor = vec4(fragColor.x * sin(timer) , fragColor.y * cos(timer) , fragColor.z * sin(timer) , 1.0);
	  gl_FragColor = texture2D(texture1 , frag_TextCord);
	 //gl_FragColor = vec4( 0.2f , 0.2f , 0.2f , 1);
}