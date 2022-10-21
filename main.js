
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JqlQrQLXt/model.json',modelLoaded);
function modelLoaded(){
    console.log("model is loaded");
}
function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data= toSpeak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function gotResult(error, results) {
    if (error){
    console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        toSpeak="";

        if(results[0].label=="super")
        {
            toSpeak="this is super"
            document.getElementById("result_object_gesture_icon").innerHTML="&#128076;";
        }
        if(results[0].label=="best")
        {
            toSpeak="this is the best"
            document.getElementById("result_object_gesture_icon").innerHTML="&#128077;";
        }
        if(results[0].label=="victory")
        {
            toSpeak="this was a fantastic victory"
            document.getElementById("result_object_gesture_icon").innerHTML="&#9996;";
        }
        speak();
    }
}

