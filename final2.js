const words = ["javascript", "hangman", "coding", "developer", "programming"];
var selectedWord = "";
var guessedLetters = [];
var remainingAttempts = 6;

document.addEventListener("DOMContentLoaded", function () {
  setupGame();

  document
    .getElementById("guess-button")
    .addEventListener("click", handleGuess);
  document.getElementById("new-game").addEventListener("click", setupGame);
});

function setupGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  remainingAttempts = 6;
  document.getElementById("incorrect-guesses").textContent = "";
  document.getElementById("remaining-attempts").textContent = remainingAttempts;
  updateWordDisplay();
  updateHangmanImage();
}

function handleGuess() {
  var guess = document.getElementById("guess-input").value.toLowerCase();
  document.getElementById("guess-input").value = "";

  if (guess && guessedLetters.indexOf(guess) === -1) {
    guessedLetters.push(guess);

    if (selectedWord.indexOf(guess) >= 0) {
      updateWordDisplay();
    } else {
      remainingAttempts--;
      document.getElementById("remaining-attempts").textContent =
        remainingAttempts;
      updateHangmanImage();
    }

    if (isGameOver()) {
      alert("Game Over! The word was " + selectedWord);
      setupGame();
    } else if (isWordGuessed()) {
      alert("Congratulations! You guessed the word!");
      setupGame();
    }
  }
}

function updateWordDisplay() {
  var display = "";
  for (var i = 0; i < selectedWord.length; i++) {
    var letter = selectedWord[i];
    if (guessedLetters.indexOf(letter) >= 0) {
      display += letter;
    } else {
      display += "_";
    }
    display += " ";
  }

  if (display.length > 0) {
    display = display.split(" ").slice(0, -1).join(" ");
  }
  document.getElementById("word-container").textContent = display;
}

function updateHangmanImage() {
  var hangmanStages = [
    "Hangman stage 0",
    "Hangman stage 1",
    "Hangman stage 2",
    "Hangman stage 3",
    "Hangman stage 4",
    "Hangman stage 5",
    "Hangman stage 6",
  ];

  document.getElementById("hangman-image").textContent =
    hangmanStages[6 - remainingAttempts];
}

function isGameOver() {
  return remainingAttempts - 1 < 0;
}

function isWordGuessed() {
  for (var i = 0; i < selectedWord.length; i++) {
    var letter = selectedWord[i];
    if (guessedLetters.indexOf(letter) === -1) {
      return false;
    }
  }
  return true;
}
