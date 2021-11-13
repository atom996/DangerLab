var text = '';
var speed = 100;
var i = 0;
const fileList = ["Report: 03_23_2049","Note to all Custodians","[File Corrupted]"];
const fileNum = ["One", "Two","Three"];

function loadText() {
  if (i < text.length) {
    document.getElementById("view_widget").innerHTML += text.charAt(i);
    i++;
    setTimeout(loadText, speed);
  }
}

function errorFunc() {
  document.querySelector("#errorText").innerHTML = "ERROR - UNAUTHORIZED ACCESS"
  setTimeout(() =>{document.querySelector("#errorText").innerHTML = ""},500);
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

function selectFileOne() {
  var description = "Employee performance has been...strange, to say the least. Sudden jerks and spasms, blank expressions, shuffling instead of walking, clear lack of awareness for one's surroundings. Not only that, but a foul odor filled the office area, like that of rotten eggs and gym socks. I've notified the authorities and gotten into contact with the higher-ups. We will get to the bottom of this. First, we will contact the scientists at the laboratory.";
  renderFileDisplay("#reportDisplay","March 23, 2049",description);
  console.log("selectFile");
}

function fileOnePartTwo() {
  var description = "I will be gone for the time being, but if anyone needs to access the security cameras for some reason, the code is 4403."
  renderFileDisplayOnePartTwo("#reportDisplayOnePartTwo","March 23, 2049",description);
  console.log("selectFile");
}

function returnToMenu() {
  document.getElementById("view_widget").innerHTML="";
  i = 0;
  text = "Hello, welcome to the Speci-fi Security Network.";
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
