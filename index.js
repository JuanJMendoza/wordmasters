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
    currentWord.push(event.key);
    if (currentSquareIndex % 5 < 4) {
      currentSquareIndex += 1;
    }
  } else if (event.key == "Enter" && currentSquareIndex % 5 == 4) {
    // check if word is valid with api, if so
    if (true) {
      // go to the next row
      currentRowIndex += 1;
      currentSquareIndex = 0;
    } else {
      // otherwise
      // flash all squares with red borders and fade back to gray
    }
  } /* else if (event.key == "Backspace" && currentSquareIndex >= 0) {
    row[currentSquareIndex % 5].innerText = "";
    currentSquareIndex = currentSquareIndex < 0 ? 0 : (currentSquareIndex -= 1);
  } */
});

// Utility Functions

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
