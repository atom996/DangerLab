var text = '';
var speed = 25;
var i = 0;
const fileList = ["Report: 03_23_2049","Note to all Custodians","[File Corrupted]"];
const fileNum = ["One", "Two","Three"];
const stages = [true, false, false, false, false];
const currentStage = [true, false, false, false, false];

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
  accessMainMenu();
});

//Function that uses handlebars to render the user input section of the project.
function accessFiles() {
  document.getElementById("screen").style.backgroundColor = "blue";
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Accessing files, please enter a command.";
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
                  currentStage[1] = false;
                  currentStage[2] = true;
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

function helpChat() {
  if(i == text.length) {
    if(stages[0] == true && (currentStage[0] == true || currentStage[1] == true)) {
      renderHelp("#helpScreen","Hello, welcome to the Speci-Fi help screen. For new employees, here are some commands to remember when accessing the file access system. ls (Ls, the L must be lowercase) allows one to list files in the system. Next, we'll be talking about the code function. The code function is written like this: code <x>. When you type the function yourself, you won't be writing the <x>, you'll be substituting that with a number. You'll find these numbers within the files as you progress. Press the back button every time you would like to, well, go back. Also, be sure to frequently check on the files and this help menu for new tips as you progress.");
    } else if (stages[3] == true && currentStage[3] == true) {
      document.getElementById("screen").style.backgroundColor = "red";
      renderHelpDanger("#helpScreenDanger","GIVEUPGIVEUPGIVEUPGIVEUPGIVEUPGIVEUP.");
      currentStage[3] = false;
      currentStage[4] = true;
      stages[4] = true;
      fileList.push("0______0");
      fileNum.push("Four");
      setTimeout(() => {
        document.getElementById("screen").style.backgroundColor = "blue";
        returnToMenu();
      }, 1000);
    } else if (stages[4] == true && currentStage[4]) {
      renderHelp("#helpScreen","A new file has been created...");
    }
  }
}

function nextHelp() {
  if(stages[0] == true) {
    renderHelp("#helpScreen","It is imperative to your [DELETED]saftey that you read the files carefully, there could be information there that will allow you to progress. Be sure to do so before... IT is aware of what you're doing...")
  }
}

//Function for allowing the event listener to access the main menu.
function accessMainMenu() {
  text = "Hello, welcome to the Speci-fi Security Network.";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)", "Help");
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
  currentStage[0] = false;
  currentStage[1] = true;
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

//File 4 after being added
function selectFileFour(){
  document.getElementById("screen").style.backgroundColor = "red";
  var description = "The reason why you haven't stopped me yet is because you have not activated the ((v en t i lati on)). Maybe try close vent. Maybe get it done in ((t en sec onds)).";
  renderFileFour("#reportDisplayFour",description);
  console.log("fileFour");
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
    currentStage[2] = false;
    currentStage[3] = true;
    document.getElementById("cameraTwoImageZoom").src = "eyes.jpg";
    document.getElementById("screen").style.backgroundColor = "red";
    document.getElementById("systemHead").innerHTML = "I SEE YOU";
    setTimeout(() => {
      document.getElementById("screen").style.backgroundColor = "blue";
      document.getElementById("systemHead").innerHTML = "Speci-fi Systems, Inc.";
      fileList[2] = "Specimen 37";
      returnAfterStare();
    }, 1000);
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
  document.getElementById("screen").style.backgroundColor = "blue";
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Hello, welcome to the Speci-fi Security Network.";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)","Help");
}

//Specific function that returns the user to the "main menu" immediately after the first encounter with the specimen.
function returnAfterStare() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Hello, welcome to the Speci-fi Security Network, a new file had been added (It knows where I am).";
  loadText();
  renderChoiceInput("#listTwoInput","Access Cameras","Access File(s)", "Help");
}

//Templating done via Handlebars js in order to render the different pages.
var renderChoiceInput = (view_id, choiceOne, choiceTwo, choiceThree) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'ChoiceOne' : choiceOne, 'ChoiceTwo' : choiceTwo, 'ChoiceThree' : choiceThree});

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

//Rendering the help chat in the different stages.
var renderHelp = (view_id, helpMessageInput) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'helpMessage' : helpMessageInput});

  document.querySelector("#view_widget").innerHTML = html;
  document.querySelector("#input_widget").innerHTML = "";

}

var renderHelpDanger = (view_id, helpMessageInput) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'helpMessage' : helpMessageInput});

  document.querySelector("#view_widget").innerHTML = html;
  document.querySelector("#input_widget").innerHTML = "";

}

var renderFileFour = (view_id, description) => {

  console.log("Rendering terminal...");

  var source = document.querySelector(view_id).innerHTML;

  var template = Handlebars.compile(source);

  var html = template({'description' : description});

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
