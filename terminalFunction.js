var text = '';
var speed = 25;
var i = 0;
const fileList = ["Report: 03_23_2049","Note to all Custodians","[File Corrupted]"];
const fileNum = ["One", "Two","Three"];
const stages = [true, false, false, false];

//Function that allows the text to be loaded as if it were being typed in real time.
function loadText() {
  if (i < text.length) {
    document.getElementById("view_widget").innerHTML += text.charAt(i);
    i++;
    setTimeout(loadText, speed);
  }
}

//Function that checks the camera to make sure that certain events will happen, affecting the way the cameras will operate.
function cameraCheck() {
  if (stages[2] == true) {
    renderCameras("#cameraTemp");
    console.log("success!");
  } else {
    document.querySelector("#errorText").innerHTML = "ERROR - UNAUTHORIZED ACCESS"
    setTimeout(() =>{document.querySelector("#errorText").innerHTML = ""},500);
  }
}

//Event listener for when the content loads as soon as the story starts.
document.addEventListener("DOMContentLoaded", () => {
  text = "Hello, welcome to the Speci-fi Security Network.";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)");
});

//Function that uses handlebars to render the user input section of the project.
function accessFiles() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Accessing files, please enter a command. Refer to the manual for instruction.";
  loadText();
  renderTerminalInput("#terminalInput");
}

//Function that reads the user input in the accessFiles() portion of the story.
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
                case "help":
                  document.getElementById("view_widget").innerHTML="";
                  i = 0;
                  text="Getting help..."
                  loadText();
                  helpChat();
                  event.preventDefault();
                  break;
                event.preventDefault();
                break;
              default:
                console.log("null");
                event.preventDefault();
            }
        }

  });
}

//Function that will list all of the files present in the listOfFiles array.
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

//Function for showing help chat
const helpChatList = ["Hello, thank you for accessing the help system. How may I assist you?", "Help", "Type 'ls' in the input to list files. Type 'code <x>'' (x being a number). Type 'back' to return. More commands will be unlocked as you progress.", "Thank you."];
let countHelp = 0;
let chatList = [];
function helpChat() {
  var ulNode = document.createElement('ul');
  ulNode.setAttribute('id','ulNodeDefIdHelp');
  document.getElementById("view_widget").appendChild(ulNode);

  if(countHelp < helpChatList.length){
    chatList[countHelp] = document.createElement('li');
    chatList[countHelp].appendChild(document.createTextNode(`${helpChatList[countHelp]}`));
    chatList[countHelp].setAttribute('id',`helpNode${countHelp}`);
    if (countHelp%2==0) {
      chatList[countHelp].setAttribute('style','float: left');
    } else {
      chatList[countHelp].setAttribute('style','float: right');
    }
    //chatList[x].setAttribute('onclick',`selectFile${fileNum[x]}()`);
    ulNode.appendChild(chatList[countHelp]);
    countHelp++;
    setTimeout(helpChat(), 5000);
  }
}
//Functions for loading files in the webpage.
//First portion of the first file
function selectFileOne() {
  var description = "Employee performance has been...strange, to say the least. Sudden jerks and spasms, blank expressions, shuffling instead of walking, clear lack of awareness for one's surroundings. Not only that, but a foul odor filled the office area, like that of rotten eggs and gym socks. I've notified the authorities and gotten into contact with the higher-ups. We will get to the bottom of this. First, we will contact the scientists at the laboratory.";
  renderFileDisplay("#reportDisplay","March 23, 2049",description);
  console.log("selectFile");
}

//Second portion of the first file
function fileOnePartTwo() {
  stages[1] = true;
  var description = "I will be gone for the time being, but if anyone needs to access the security cameras for some reason, the code is 4403."
  renderFileDisplayOnePartTwo("#reportDisplayOnePartTwo","March 23, 2049",description);
  console.log("selectFile");
}

//Second file loaded, first portion.
function selectFileTwo() {
  var description = "Custodians, just a heads up from the Research Department here are Speci-fi, Inc. We've noticed that there has been an odd odor present in our ventilation system, as well as some banging. Whenever you can, would you please have a look and let us know if there's anything unusual? Thank you. Any supplies that you may need are located by the supply cabinet near camera 02.";
  renderFileDisplay("#reportDisplayTwo","March 03, 2049",description);
  console.log("selectFile");
}

//Third File Loaded. Error if the third stage has not been unlocked.
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

//Second part of the third file.
function fileThreePartTwo() {
  var description = "Specimen 37 has the ability to manipulate electricity and technology, with a preference for computers. We have managed to contain it thanks to (The rest of the file's text has been corrupted).";
  renderFileDisplay("#reportDisplayThreePartTwo","Specimen 37",description);
  console.log("selectFile");
}
//Camera Functions
function accessCameraTwo () {
  renderCameras("#cameraTwo");
}

//What happens when you zoom in on the second camera.
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
    var tmpCnt = 0;
    var tmpTxt = ""
    document.getElementById("cameraTwoCaption").innerHTML = "";
    tmpTxt = "It seems to be an ordinary supply closet. Nothing seems out of the ordinary.";
    const temp = function () {
      if (tmpCnt < tmpTxt.length) {
        document.getElementById("cameraTwoCaption").innerHTML += tmpTxt.charAt(tmpCnt);
        tmpCnt++;
        setTimeout(temp, speed);
      }
    }
    temp();
    console.log("no");
  }
  console.log("zooooooom!");
}

//Function that returns the user to the main menu.
function returnToMenu() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Hello, welcome to the Speci-fi Security Network.";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)");
}

//Specific function that returns the user to the "main menu" immediately after the first encounter with the specimen.
function returnAfterStare() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Hello, welcome to the Speci-fi Security Network, a new file had been added (It knows where I am).";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)");
}

//Templating done via Handlebars js in order to render the different pages.
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
