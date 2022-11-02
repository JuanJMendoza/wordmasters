const buttons = document.querySelector(".squares");
const rows = buttons.children;
let wordOfTheDay = ""; // assigned in processWordOfTheDay(), it's an immediately invoked function expression.
let charCounter = null; // assigned in processWordOfTheDay(), it's an immediately invoked function expression.
let currentRowIndex = 0;
let currentSquareIndex = 0;
let guessedChars = [];

document.addEventListener("keydown", async function (event) {
  let currentRow = rows[currentRowIndex % 6];
  let rowChildren = currentRow.children;
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
    if (!(await validateGuessWord(guessedChars))) {
      // if the guess isn't a valid word, blink borders red
      for (let i = 0; i < rowChildren.length; i++) {
        const child = rowChildren[i];
        child.classList.add("invalid-word");
        console.log(child);
      }
      setTimeout(() => {
        for (let i = 0; i < rowChildren.length; i++) {
          const child = rowChildren[i];
          child.classList.remove("invalid-word");
          console.log(child);
        }
      }, 1000);
    } else if (isCorrectGuess(guessedChars)) {
      // check if word is valid with api, if so
      // check if guessed word matches word of the day
      // flash boxes in current row green
      for (let i = 0; i < rowChildren.length; i++) {
        const child = rowChildren[i];
        child.classList.add("correct-guess");
      }
      // hightlight title with rainbow highlights
      document.getElementsByTagName("h1")[0].classList.add("won");
      // trigger alert on window
      alert("You Win, You're a Word Master!");
      return;
    } else {
      guessChecker(guessedChars, rowChildren);
      newTry();
    }
    // check if word is even a valid word at all, if so
    // flash boxes red to tell user to try again on same row
    // otherwise, guess is wrong
    //go to the next row
    if (event.key == "Enter" && currentRowIndex == 6) {
      // you lose!
      alert(`You lose, the word was ${wordOfTheDay}`);
    }
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

function newTry() {
  currentRowIndex += 1;
  currentSquareIndex = 0;
  guessedChars = [];
}

async function fetchWordOfTheDay() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const processedResponse = await promise.json();
  return processedResponse.word;
}

(async function processedWordOfTheDay() {
  wordOfTheDay = await fetchWordOfTheDay();
  charCounter = makeCounter(wordOfTheDay);
})();

function isCorrectGuess(guessedChars) {
  const guessWord = guessedChars.join("");
  if (guessWord == wordOfTheDay) {
    return true;
  }
  return false;
}

function makeCounter(wordOfTheDay) {
  const charFreq = new Map();
  for (let i = 0; i < wordOfTheDay.length; i++) {
    char = wordOfTheDay[i];
    if (!charFreq.has(char)) {
      charFreq.set(char, 0);
    }
    charFreq.set(char, charFreq.get(char) + 1);
  }

  return charFreq;
}

function guessChecker(guessedChars, rowChildren) {
  const charCounterCopy = new Map(charCounter);
  for (let i = 0; i < guessedChars.length; i++) {
    char = guessedChars[i];
    const child = rowChildren[i];
    if (!charCounterCopy.has(char) || charCounterCopy.get(char) == 0) {
      // turn square the current char is in to gray
      child.classList.add("wrong-guess");
    } else if (
      charCounterCopy.has(char) &&
      charCounterCopy.get(char) > 0 &&
      char != wordOfTheDay[i]
    ) {
      // turn squrae with char in wrong position to yellow
      charCounterCopy.set(char, charCounterCopy.get(char) - 1);
      child.classList.add("wrong-placement-guess");
    } else {
      // correct placement, turn square green
      charCounterCopy.set(char, charCounterCopy.get(char) - 1);
      child.classList.add("correct-guess");
    }
  }
}

async function validateGuessWord(guessedChars) {
  const guessedWord = guessedChars.join("");
  const promise = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      word: guessedWord,
    }),
  });
  const response = await promise.json();
  console.log(response.validWord);
  return response.validWord;
}
