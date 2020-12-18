/*
    Global DOM Elements
*/
var buttonEl = document.querySelector('#start-quiz');

/*
    Event Handlers
*/
var startQuizHandler = function () {
  alert("YAY");
};
/*
    Event Listeners
*/

// Start Quiz
buttonEl.addEventListener("click", startQuizHandler);
