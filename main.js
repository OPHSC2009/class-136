img=""
status=""
objects=[]

function preload() {
    img=createVideo("video.mp4")
    img.hide()
}

function setup() {
    canvas = createCanvas(700, 500)
    canvas.center()
   
    

}

function draw(){
    image(img,0,0,700,500)
    if (status != "") {
        objectDetector.detect(img, gotResult)
        

        for (i = 0; i < objects.length; i = i + 1) {
            
            document.getElementById("status").innerHTML = "Status:Objects Detected"
            fill("red")
            percent = floor(objects[i].confidence * 100)
            textSize(20)
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            document.getElementById("number").innerHTML=objects.length
        }


    }
    
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"



}
function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }

}

function modelLoaded(){
    console.log("Model is Loaded")
    status=true
    img.loop()
    img.speed(1)
    img.volume(0)
    objectDetector.detect(img, gotResult)


}
