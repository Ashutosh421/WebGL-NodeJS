let primitive =
    {
        "vertices": 0,
        "color": 0,
        "indices": 0,

        "vertexArray_Object": 0,
        "vertexBuffer": 0,
        "elementBuffer" : 0,

        "shader" : 0,
        "viewCamera" : 0,
        "transform" : 0,

        "identityMatrix" : 0,
    }

primitive.init = function (gl) {
    console.log("Init Called in Primitive");
}

primitive.draw = function (gl) {}

primitive.setCameraView_Matrix = function (gl) {}

primitive.setCameraProjection_Matrix = function (gl) {}

primitive.setViewCamera = function (gl) {}


