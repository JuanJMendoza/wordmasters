const buttons = document.querySelector(".squares");
const rows = buttons.children;
let wordOfTheDay = ""; // assigned in getWordOfTheDay(), it's an immediately invoked function expression.

let currentRowIndex = 0;
let currentSquareIndex = 0;

let guessedChars = [];

document.addEventListener("keydown", function (event) {
  let row = rows[currentRowIndex % 6].children;
  let square = row[currentSquareIndex % 5];

  if (isLetter(event.key) && currentRowIndex < 6) {
    square.innerText = event.key;
    if (guessedChars.length == 5) {
      guessedChars.pop();
    }
    guessedChars.push(event.key);
    if (currentSquareIndex % 5 < 4) {
      currentSquareIndex += 1;
    }
  } else if (event.key == "Enter" && guessedChars.length == 5) {
    // check if word is valid with api, if so
    if (true) {
      // go to the next row
      currentRowIndex += 1;
      currentSquareIndex = 0;
      guessedChars = [];
    }
  } else if (event.key == "Backspace" && currentSquareIndex > 0) {
    if (row[currentSquareIndex].innerText == "") {
      currentSquareIndex -= 1;
    }
    guessedChars.pop();
    row[currentSquareIndex].innerText = "";
  }
});

// Utility Functions

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

(async function getWordOfTheDay() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const processedResponse = await promise.json();
  wordOfTheDay = processedResponse.word;
  return wordOfTheDay;
})();

function isCorrectGuess(guessedChars) {
  const guessWord = guessedChars.join("");
  if (guessWord == wordOfTheDay) {
    return true;
  }
  return false;
}
