let gl;                    // Reference to the WebGL Context

window.onload = () => {
    setUpDisplay((glContext) => {
        gl = glContext;
        init();
    });
}


let firstCube;
//let firstQuad;
let mainCamera;
let firstModel;

let directionalLight;

function init()
{
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);

    mainCamera = new Camera();
    mainCamera.setPosition( 0 , 0 , -10);

    //firstQuad = new Quad(gl);
    //firstQuad.setViewCamera(mainCamera);

//    firstCube = new Cube(gl);
  //  firstCube.setViewCamera(mainCamera);

    directionalLight = new DirectionalLight();
    directionalLight.setDirection(-2.0, 0, 0);
    directionalLight.setColor(1.0 , 1.0 , 1.0 , 1);

    firstModel = new Model(gl, "Susan");
    firstModel.setViewCamera(mainCamera);
    firstModel.setDirectionalLight(directionalLight);
            
    console.log("Main.JS");
        
    requestAnimationFrame(renderLoop);
}

function renderLoop() {
    gl.clearColor(0.0, 0.0, 0.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_COLOR_BIT);
    Time.update();

    //firstCube.draw(gl);
   // firstCube.setRotation(Math.cos(Time.getCurrentTime()), Math.sin(Time.getCurrentTime()), 0);

    directionalLight.setDirection(Math.cos(Time.getCurrentTime()), Math.sign(Time.getCurrentTime()) , 0);

    firstModel.draw(gl);

    mainCamera.update();
    requestAnimationFrame(renderLoop);
}


window.onkeypress = function (event) {
/*    console.log(`You pressed: ${event.keyCode}`);
    if (event.keyCode == 97) { //Left
        // mainCamera.setPosition((mainCamera.getPosition().x + 1000) * sTime.getDeltaTime(), mainCamera.getPosition().y, mainCamera.getPosition().z);
        firstCube.transform.setPosition((firstCube.transform.getPosition().x - 0.1) * Time.getCurrentTime(), firstCube.transform.getPosition().y, firstCube.transform.getPosition().z);
    }
    else if (event.keyCode == 100) { //Right
        //mainCamera.setPosition();
        firstCube.transform.setPosition((firstCube.transform.getPosition().x + 0.1) * Time.getCurrentTime(), firstCube.transform.getPosition().y, firstCube.transform.getPosition().z);
    }
    else if (event.keyCode == 119) { //Up
        //mainCamera.setPosition();
    }
    else if (event.keyCode == 115) { //Down
    //    mainCamera.setPosition();
    }
    */
}
