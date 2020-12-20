/********************** DOM ELEMENTS **********************/

var goBackBtnEl = document.querySelector("#go-back-btn");
var clearScoreBtnEl = document.querySelector("#clear-scores-btn");
var textFieldReadOnlyEl = document.querySelector("textArea");
var scoresEntriesEl = document.querySelector(".scores-entries-wrapper");

/********************** ON PAGE LOAD **********************/

displayHighScores();

/********************** HELPER FUNCTIONS **********************/

// Display high scores
function displayHighScores() {
  var allScores = JSON.parse(localStorage.getItem("highScores")) || [];

  if (allScores.length != 0) {
    // sorts array of objects by highest score
    var sortedByHighest = allScores.sort((a, b) => b.score - a.score);
    // for each score in the all scores array of scores, creates a DOM entry and displays it.
    for (var i = 0; i < sortedByHighest.length; i++) {
      var scoreEntryEl = document.createElement("textarea");
      scoreEntryEl.readOnly = true;
      scoreEntryEl.setAttribute("class", "score-entry");
      scoreEntryEl.value = `${sortedByHighest[i].initials}: ${sortedByHighest[i].score}`;
      scoresEntriesEl.appendChild(scoreEntryEl);
      if (i == 0) {
        // highlights highest score
        scoresEntriesEl.firstElementChild.setAttribute(
          "style",
          "background-color: cyan; text-align:center; color: red; font-size: 16pt"
        );
        scoreEntryEl.value = `🏅${sortedByHighest[i].initials}: ${sortedByHighest[i].score}🏅`;
      }
    }
  } else {
    handleNoScoresStyling();
  }
}

// Handles empty scores list
function handleNoScoresStyling() {
  clearScoreBtnEl.setAttribute("class", "hide");
  var headerEl = document.createElement("p");
  headerEl.setAttribute(
    "style",
    "color: green; font-size: 24pt; background: blanchedalmond"
  );
  headerEl.textContent =
    "You have the privelege of logging your scores first! Go ahead and take the quiz!";
  scoresEntriesEl.appendChild(headerEl);
}

/******************** EVENT HANDLERS ********************/

// Clears all scores from local storage
var clearScoreHandler = function () {
  if (confirm("Are you sure you want to clear high scores?")) {
    localStorage.removeItem("highScores");
    scoresEntriesEl.innerHTML = "";
    handleNoScoresStyling();
  }
};

/******************** EVENT LISTENERS ********************/

clearScoreBtnEl.addEventListener("click", clearScoreHandler);
