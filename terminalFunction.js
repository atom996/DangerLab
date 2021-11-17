var text = '';
var speed = 100;
var i = 0;
const fileList = ["Report: 03_23_2049","Note to all Custodians","[File Corrupted]"];
const fileNum = ["One", "Two","Three"];
const stages = [true, false, false, false];

function loadText() {
  if (i < text.length) {
    document.getElementById("view_widget").innerHTML += text.charAt(i);
    i++;
    setTimeout(loadText, speed);
  }
}

function cameraCheck() {
  if (stages[2] == true) {
    renderCameras("#cameraTemp");
    console.log("success!");
  } else {
    document.querySelector("#errorText").innerHTML = "ERROR - UNAUTHORIZED ACCESS"
    setTimeout(() =>{document.querySelector("#errorText").innerHTML = ""},500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  text = "Hello, welcome to the Speci-fi Security Network.";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)");
});

function accessFiles() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Accessing files, please enter a command. Refer to the manual for instruction.";
  loadText();
  renderTerminalInput("#terminalInput");
}

function inputValue() {
  document.getElementById("usrInput")
      .addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            switch(document.getElementById("usrInput").value) {
              case "back":
                returnToMenu();
                event.preventDefault();
                break;
              case "ls":
                document.getElementById("view_widget").innerHTML="";
                i = 0;
                text = "Listing files present in system...";
                showFiles();
                loadText();
                console.log("input");
                event.preventDefault();
                break;
              case "code 4403":
                if (stages[1] == false) {
                  document.getElementById("view_widget").innerHTML="";
                  i = 0;
                  text = "(Maybe I should have a look at the documents first...)";
                  loadText();
                } else {
                  document.getElementById("view_widget").innerHTML="";
                  stages[2] = true;
                  i = 0;
                  text = "Cameras now accessible!";
                  loadText();
                }
                event.preventDefault();
                break;
              default:
                console.log("null");
                event.preventDefault();
            }
        }

  });
}

function showFiles() {
  var listOfFiles = [];
  var ulNode = document.createElement('ul');
  ulNode.setAttribute('id','ulNodeDefId');
  document.getElementById("view_widget").appendChild(ulNode);

  for (var x = 0; x < fileList.length; x++){
    listOfFiles[x] = document.createElement('li');
    listOfFiles[x].appendChild(document.createTextNode(`${fileList[x]}`));
    listOfFiles[x].setAttribute('id',`listNode${x}`);
    listOfFiles[x].setAttribute('onclick',`selectFile${fileNum[x]}()`);
    ulNode.appendChild(listOfFiles[x]);
  }

}

//Functions for loading files in the webpage.
function selectFileOne() {
  var description = "Employee performance has been...strange, to say the least. Sudden jerks and spasms, blank expressions, shuffling instead of walking, clear lack of awareness for one's surroundings. Not only that, but a foul odor filled the office area, like that of rotten eggs and gym socks. I've notified the authorities and gotten into contact with the higher-ups. We will get to the bottom of this. First, we will contact the scientists at the laboratory.";
  renderFileDisplay("#reportDisplay","March 23, 2049",description);
  console.log("selectFile");
}

function fileOnePartTwo() {
  stages[1] = true;
  var description = "I will be gone for the time being, but if anyone needs to access the security cameras for some reason, the code is 4403."
  renderFileDisplayOnePartTwo("#reportDisplayOnePartTwo","March 23, 2049",description);
  console.log("selectFile");
}

function selectFileTwo() {
  var description = "Custodians, just a heads up from the Research Department here are Speci-fi, Inc. We've noticed that there has been an odd odor present in our ventilation system, as well as some banging. Whenever you can, would you please have a look and let us know if there's anything unusual? Thank you. Any supplies that you may need are located by the supply cabinet near camera 02.";
  renderFileDisplay("#reportDisplayTwo","March 03, 2049",description);
  console.log("selectFile");
}

function selectFileThree() {
  if(stages[3] == true) {
    var description = "Specimen 37 is a dangerous entity held in facility 10. Not much is known about the appearance of entity 37, besides a pair of eyes, but it is said to very large in size based on the sounds heard in its containment area.";
    renderFileDisplay("#reportDisplayThree","Specimen 37",description);
    console.log("selectFile");
  } else {
    document.querySelector("#errorText").innerHTML = "ERROR - FILE CORRUPTED"
    setTimeout(() =>{document.querySelector("#errorText").innerHTML = ""},500);
  }
}

function fileThreePartTwo() {
  var description = "Specimen 37 has the ability to manipulate electricity and technology, with a preference for computers. We have managed to contain it thanks to (The rest of the file's text has been corrupted).";
  renderFileDisplay("#reportDisplayThreePartTwo","Specimen 37",description);
  console.log("selectFile");
}
//Camera Functions
function accessCameraTwo () {
  renderCameras("#cameraTwo");
}

function zoomTwo() {
  renderCameras("#cameraTwoZoom");
  if (stages[3] == false) {
    stages[3] = true;
    document.getElementById("cameraTwoImageZoom").src = "eyes.jpg";
    document.getElementById("screen").style.backgroundColor = "red";
    document.getElementById("systemHead").innerHTML = "I SEE YOU";
    setTimeout(() => {
      document.getElementById("screen").style.backgroundColor = "blue";
      document.getElementById("systemHead").innerHTML = "Speci-fi Systems, Inc.";
      fileList[2] = "Specimen 37";
      returnAfterStare();
    }, 2000);
  } else {
    console.log("no");
  }
  console.log("zooooooom!");
}

function returnToMenu() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Hello, welcome to the Speci-fi Security Network.";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)");
}

function returnAfterStare() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Hello, welcome to the Speci-fi Security Network, a new file had been added (It knows where I am).";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)");
}

var renderChoiceInput = (view_id, choiceOne, choiceTwo) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'ChoiceOne' : choiceOne, 'ChoiceTwo' : choiceTwo});

  document.querySelector("#input_widget").innerHTML = html;


}

var renderTerminalInput = (view_id) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template();

  document.querySelector("#input_widget").innerHTML = html;


}

var renderFileDisplay = (view_id, date, description) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'date' : date, 'description' : description});

  document.querySelector("#view_widget").innerHTML = html;
  document.querySelector("#input_widget").innerHTML = "";

}

var renderFileDisplayOnePartTwo = (view_id, date, description) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'date' : date, 'description' : description});

  document.querySelector("#view_widget").innerHTML = html;
  document.querySelector("#input_widget").innerHTML = "";


}

var renderCameras = (view_id) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template();

  document.querySelector("#view_widget").innerHTML = html;
  document.querySelector("#input_widget").innerHTML = "";


}
