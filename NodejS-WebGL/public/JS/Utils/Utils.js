let loadTextFromResource = function (url, callback) {

    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                callback(null, xhttp.responseText);
                //console.log(xhttp.responseText);
            }
            else {
                //console.log("Couldn't complete Request ");
                callback('Error', null);
            }
        }
    }
    xhttp.send();
}

let loadImage = function (url ,  callback) {
    let image = new Image();
    image.src = url;

    image.onload = () =>
    {
        callback(null, image);
    }
}

let loadJsonFromResource = function (url, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                callback(null, JSON.parse(xhttp.response));
            }
            else
            {   
                callback("Couldn't load the JSON ", null);
            }
        }
    }

    xhttp.send();
}

let testModel;

/*loadJsonFromResource("/public/Models/Fbx/Susan.json", (err, obj) => {
    //console.log("Loaded JSON successfully");
    if (err == null) {
        testModel = obj;
    }
});*/