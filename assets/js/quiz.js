/********************** GLOBAL VARIABLES**********************/
var score = 0;
var quiz = [
  {
    question: "Commonly used data types DO Not Include:",
    answer1: "strings",
    answer2: "booleans",
    answer3: "alerts",
    answer4: "numbers",
    correctAnswer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed with _______.",
    answer1: "quotes",
    answer2: "curly brackets",
    answer3: "parenthesis",
    answer4: "square brackets",
    correctAnswer: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store _______",
    answer1: "numbers and strings",
    answer2: "other arrays",
    answer3: "booleans",
    answer4: "all of the above",
    correctAnswer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within _______ when being assigned to variables",
    answer1: "commas",
    answer2: "curly brackets",
    answer3: "quotes",
    answer4: "paranthesis",
    correctAnswer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer1: "JavaScript",
    answer2: "terminal/bash",
    answer3: "for loops",
    answer4: "console.log()",
    correctAnswer: "console.log()",
  },
];

/********************** GLOBAL DOM VARIABLES **********************/

var timerEl = document.querySelector("#timer");
var pageContentEl = document.querySelector(".page-content");
var startQuizBtnEl = document.querySelector("#start-quiz");
var pageTitleEl = document.querySelector(".page-title");
var introMsgEl = document.querySelector(".page-content p");
var buttonsWrapperEl = document.querySelector(".btn-wrapper");
var scoreEl = document.querySelector("#timer");
var submitFormBtnEl = document.querySelector("#submit-form-btn");
var answerMsgEl = document.querySelector(".answer-msg");

/********************** EVENT HANDLERS **********************/

// starts the quiz
var startQuizHandler = function () {
  // sets the initial timer to 75 seconds;
  score = 75;
  timerEl.textContent = score;

  // modifies css styling
  pageContentEl.style.alignItems = "flex-start";

  // removes start button and intro text
  startQuizBtnEl.remove();
  introMsgEl.remove();

  countDown();
  displayQuestion();
};

// validates anwer
var quizHandler = function (event) {
  // debugger;
  document.querySelector(".answer-wrapper").classList.remove("hide");
  var targetEl = event.target;
  // removes <span> tag and stores its value as the answer
  var answer = targetEl.innerHTML;
  answer = answer.replace(/<span>\d. <\/span>/, "");

  // Checks the answer
  if (answer === quiz[0].correctAnswer) {
    answerMsgEl.setAttribute("style", "color: green");
    answerMsgEl.textContent = "Correct!";
    clearAnswerValidationMsg();
  } else if (answer != quiz[0].correctAnswer) {
    answerMsgEl.setAttribute("style", "color: red");
    answerMsgEl.textContent = "Wrong!";
    score = score - 15;
    clearAnswerValidationMsg();
    // set element value
    scoreEl.textContent = score;
  }
  // removes answered question from the array of question objects
  quiz.shift();
  if (quiz.length > 0 && score > 0) {
    displayQuestion();
  } else if (quiz.length === 0 || score === 0) {
    // gather initials
    displayDonePage();
  }
  //counter and answer check logic goes here.
};

// submits the initials and score form
var submitScoreFormHandler = function () {
  pageRedirect();
};

/********************** HELPER FUNCTIONS**********************/
// handles countdown
function countDown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `score` is greater than 1
    if (score >= 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = score;
      // Decrement `score` by 1
      score--;
    } else {
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      displayDonePage();
    }
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

  // id counter that will be then assigned to DOM entry for a given answer
  var index = 0;
  // Dynamically retrieves all 'answer' keys from given quiz object using regex;
  // for each 'answer' creates a new button and writes answer's value into element's text
  for (var key in quiz[0]) {
    if (/^answer/.test(key)) {
      var newSpanEl = document.createElement("span");
      newSpanEl.innerText = `${index}. `;

      var answerBtnEl = document.createElement("button");
      answerBtnEl.setAttribute("class", "btn left-aligned");
      answerBtnEl.innerHTML = `<span>${index}. </span>${quiz[0][key]}`;

      // displays question
      pageTitleEl.textContent = quiz[0].question;

      // displays answers
      buttonsWrapperEl.appendChild(answerBtnEl);
    }
    index++;
  }
  return;
}

// clears answer validation msg
function clearAnswerValidationMsg() {
  setTimeout(function () {
    document.querySelector(".answer-wrapper").classList.add("hide");
  }, 2000);
}

// displays final score, collects initials
function displayDonePage() {
  pageTitleEl.textContent = "All done!";
  buttonsWrapperEl.remove();
  document.querySelector(".timer-wrapper").classList.add('hide');

  // unhides initials form in DOM
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
  var initials = document.querySelector("#initials").value.trim().toUpperCase();

  // we want to preserve the existing scores rather than overwriting them
  var scoresArray = JSON.parse(localStorage.getItem("highScores")) || [];
  // handles score update for the existing user
  if (scoresArray.length != 0) {
    for (var i = 0; i < scoresArray.length; i++) {
      // if existing user, check current score
      // and only update if current score is greater than existing score for this user.
      if (scoresArray[i].initials === initials) {
        window.alert(
          "Looks like you already are in our system, we will go ahead and update your highest score."
        );
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

    // if new user, then create and push the score object to the array
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

startQuizBtnEl.addEventListener("click", startQuizHandler);
buttonsWrapperEl.addEventListener("click", quizHandler);
submitFormBtnEl.addEventListener("click", submitScoreFormHandler);
