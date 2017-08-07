/// <reference path="../../webgl.d.ts" />

let display;

//window.onload = function () {
  //  console.log("Window Load called");
//    setUpDisplay();
//}

function setUpDisplay(displayComplete)
{
    display = new Display();
    display.canvas = document.createElement('canvas');
    document.body.appendChild(display.canvas);
    display.WIDTH = window.innerWidth;
    display.HEIGHT = window.innerHeight;
    display.canvas.width = display.WIDTH;
    display.canvas.height = display.HEIGHT;
    display.glContext = display.canvas.getContext("webgl2", {});

    if (display.glContext == null) {
        console.log("Couldn't get the GL Context... Trying Experimental WebGl..");
        display.glContext = display.canvas.getContext("experimental-webgl", {});
        if (display.glContext == null) {
            console.log("Couldn't get the Experimental GL Context... This browser doesn't support WebGl");
        }
    }
    displayComplete(display.glContext); //The Call Back Function
}

function Display() {
    this.WIDTH = 1024;
    this.HEIGHT = 768;
}

window.onresize = function (event) {
    display.WIDTH = window.innerWidth;
    display.HEIGHT = window.innerHeight; 

    if (display.hasOwnProperty("canvas")) {
        display.canvas.width = display.WIDTH;
        display.canvas.height = display.HEIGHT;
        display.glContext.viewport(0, 0, display.canvas.width, display.canvas.height);
    }
}