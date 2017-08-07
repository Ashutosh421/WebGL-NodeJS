precision mediump float;

varying vec2 frag_TextCord;
varying vec3 frag_Normals;

uniform float timer;
uniform sampler2D mainTexture;

vec4 ambientIntensity;
vec4 lightIntensity;

struct DirectionalLight
{
	vec4 direction;
	vec4 color;
};

uniform DirectionalLight directionLight;

void main()
{		
	ambientIntensity = vec4(0.8 , 0.8 , 0.8 , 1.0);
	lightIntensity = ambientIntensity + max(dot(directionLight.direction.xyz , normalize(frag_Normals)) , 0.0);

	gl_FragColor = texture2D(mainTexture , frag_TextCord) * lightIntensity * directionLight.color;
}