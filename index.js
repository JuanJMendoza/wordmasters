const buttons = document.querySelector(".squares");
const rows = buttons.children;
let wordOfTheDay = ""; // assigned in getWordOfTheDay(), it's an immediately invoked function expression.

let currentRowIndex = 0;
let currentSquareIndex = 0;

let guessedChars = [];

document.addEventListener("keydown", function (event) {
  let rowChildren = rows[currentRowIndex % 6].children;
  let square = rowChildren[currentSquareIndex % 5];

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
    // check if guessed word matches word of the day
    if (isCorrectGuess(guessedChars)) {
      // flash boxes in current row green
      for (let i = 0; i < rowChildren.length; i++) {
        const child = rowChildren[i];
        child.classList.add("correct-guess");
      }

      document.getElementsByTagName("h1")[0].classList.add("won");
      // trigger alert on window
      alert("You Win, You're a Word Master!");
      return;
    }
    // check if word is even a valid word at all, if so
    // flash boxes red to tell user to try again on same row
    // otherwise, guess is wrong
    //go to the next row
    // currentRowIndex += 1;
    // currentSquareIndex = 0;
    // guessedChars = [];
  } else if (event.key == "Backspace" && currentSquareIndex > 0) {
    if (rowChildren[currentSquareIndex].innerText == "") {
      currentSquareIndex -= 1;
    }
    guessedChars.pop();
    rowChildren[currentSquareIndex].innerText = "";
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

function getTextFromNum(num) {
  let res = "";
  switch (num) {
    case 1:
      res = "first";
      break;
    case 2:
      res = "second";
      break;
    case 3:
      res = "thrid";
      break;
    case 4:
      res = "fourth";
      break;
    case 5:
      res = "fifth";
      break;
    case 6:
      res = "sixth";
      break;
  }
  return res;
}
