const buttons = document.querySelector(".squares");
const rows = buttons.children;

let currentRowIndex = 0;
let currentSquareIndex = 0;

let currentWord = [];

document.addEventListener("keydown", function (event) {
  // uses the isLetter function from above
  console.log(event.key);

  let row = rows[currentRowIndex % 6].children;
  let square = row[currentSquareIndex % 5];

  if (isLetter(event.key) && currentRowIndex < 6) {
    square.innerText = event.key;
    if (currentWord.length == 5) {
      currentWord.pop();
    }
    currentWord.push(event.key);
    if (currentSquareIndex % 5 < 4) {
      currentSquareIndex += 1;
    }
  } else if (event.key == "Enter" && currentWord.length == 5) {
    // check if word is valid with api, if so
    if (true) {
      // go to the next row
      currentRowIndex += 1;
      currentSquareIndex = 0;
      currentWord = [];
    }
  } else if (event.key == "Backspace" && currentSquareIndex > 0) {
    if (row[currentSquareIndex].innerText == "") {
      currentSquareIndex -= 1;
    }
    currentWord.pop();
    row[currentSquareIndex].innerText = "";
  }
});

// Utility Functions

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
