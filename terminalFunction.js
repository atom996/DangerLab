var text = '';
var speed = 100;
var i = 0;

function loadText() {
  if (i < text.length) {
    document.getElementById("view_widget").innerHTML += text.charAt(i);
    i++;
    setTimeout(loadText, speed);
  } else {
    i = 0;
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
