/********************** GLOBAL VARIABLES**********************/
var score = 0;
var quiz = [
  {
    question: "Commonly used data types DO Not Include:",
    answer1: "1. strings",
    answer2: "2. booleans",
    answer3: "3. alerts",
    answer4: "4. numbers",
  },
  {
    question:
      "The condition in an if / else statement is enclosed with _______.",
    answer1: "1. quotes",
    answer2: "2. curly brackets",
    answer3: "3. parenthesis",
    answer4: "4. square brackets",
  },
  {
    question: "Arrays in JavaScript can be used to store _______",
    answer1: "1. numbers and strings",
    answer2: "2. other arrays",
    answer3: "3. booleans",
    answer4: "4. all of the above",
  },
  {
    question:
      "String values must be enclosed within _______ when being assigned to variables",
    answer1: "1. commas",
    answer2: "2. curly brackets",
    answer3: "3. quotes",
    answer4: "4. paranthesis",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer1: "1. JavaScript",
    answer2: "2. terminal/bash",
    answer3: "3. for loops",
    answer4: "4. consol.log",
  },
];

/********************** GLOBAL DOM VARIABLES **********************/

var timerEl = document.querySelector("#timer");
var pageContentEl = document.querySelector(".page-content");
var buttonEl = document.querySelector("#start-quiz");
var pageTitleEl = document.querySelector(".page-title");
var introMsgEl = document.querySelector(".page-content p");
var buttonsWrapperEl = document.querySelector(".btn-wrapper");
var scoreEl = document.querySelector("#timer");
var submitFormBtnEl = document.querySelector("#submit-form-btn");

/********************** EVENT HANDLERS **********************/

var startQuizHandler = function () {
  // sets the initial timer to 75 seconds;
  score = 75;
  timerEl.textContent = score;

  // modifies css styling
  pageContentEl.style.alignItems = "flex-start";

  // removes start button and intro text
  buttonEl.remove();
  introMsgEl.remove();

  //displays first question
  displayQuestion();
};

var answerHandler = function () {
  if (quiz.length > 0) {
    displayQuestion();
  } else if (quiz.length === 0 || score === 0) {
    // gather initials
    displayDonePage();
  }
  //counter and answer check logic goes here.
};

var submitScoreFormHandler = function () {
  pageRedirect();
};

/********************** HELPER FUNCTIONS**********************/
// handles countdown
function countDown() {
  var timeInterval = setInterval(function () {
    console.log(score);
    clearInterval(timeInterval);
  }, 1000);
}

// adds current question and answer to the form
function displayQuestion() {
  // checks if there are existing answers already displayed
  var buttonElChildElementsCount = document.querySelector(".btn-wrapper")
    .childElementCount;

  if (buttonElChildElementsCount > 0) {
    document.querySelector(".btn-wrapper").innerHTML = "";
  }

  // id counter that will be then assigned to custom data-answer attribute
  var idCounter = 0;

  // Dynamically retrieves all 'answer' keys from given quiz object using regex;
  // for each 'answer' creates a new button and writes answer's value into element's text
  for (var key in quiz[0]) {
    if (/^answer/.test(key)) {
      var answerEl = document.createElement("button");

      answerEl.setAttribute("class", "btn left-aligned");
      answerEl.setAttribute("id", "data-answer-" + idCounter);
      buttonsWrapperEl.appendChild(answerEl);
      answerEl.textContent = quiz[0][key];

      // displays question
      pageTitleEl.textContent = quiz[0].question;

      // displays answers
      answerEl.textContent = quiz[0][key];
    }
    idCounter++;
  }
  // removes first object from quiz array
  quiz.shift();
  return;
}

// displays final score, collects initials
function displayDonePage() {
  pageTitleEl.textContent = "All done!";
  buttonsWrapperEl.remove();

  var initialsFormWrapperEl = document.querySelector(
    ".initials-form-wrapper.hide"
  );
  initialsFormWrapperEl.classList.remove("hide");

  var finalScoreEl = document.querySelector(".initials-form-wrapper p");
  finalScoreEl.textContent = `Your final score is ${score}.`;
}

// saves initials and score in localStorage, then redirects to the 'High Scores' page.
function pageRedirect() {
  var initials = document.querySelector("#initials").value;

  if (initials) {
    saveScoreInLocalStorage();
    window.location.href = "high-scores.html?";
  } else {
    alert("Please provide your initials");
  }
}

// adds the score to the localStorage for further re-use in high-scores.js
function saveScoreInLocalStorage() {
  var initials = document.querySelector("#initials").value.trim();

  // we want to preserve the existing scores rather than overwriting them
  var scoresArray = JSON.parse(localStorage.getItem("highScores")) || [];
  // handles score update for the existing user
  if (scoresArray.length != 0) {
    for (var i = 0; i < scoresArray.length; i++) {
      // if existing user, check current score
      // and only update if current score is greater than existing score for this user.
      if (scoresArray[i].initials === initials) {
        var existingUserRecord = parseInt(scoresArray[i].score);
        if (existingUserRecord < score) {
          scoresArray.splice(i, 1);
          var highScore = {
            initials: initials,
            score: score,
          };
          break;
        } else return;
      } else if (scoresArray[i].initials != initials) {
        var highScore = {
          initials: initials,
          score: score,
        };
      }
    }
    scoresArray.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(scoresArray));
    return;

    // if new user, then create and push the new object to the array
  } else {
    var highScore = {
      initials: initials,
      score: score,
    };
    scoresArray.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(scoresArray));
  }
}
/********************** EVENT LISTENERS **********************/

buttonEl.addEventListener("click", startQuizHandler);
buttonsWrapperEl.addEventListener("click", answerHandler);
submitFormBtnEl.addEventListener("click", submitScoreFormHandler);
