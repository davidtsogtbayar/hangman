const words = ["javascript", "hangman", "coding", "developer", "programming"];
let selectedWord = "";
let guessedLetters = [];
let remainingAttempts = 6;

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
  const guess = document.getElementById("guess-input").value.toLowerCase();
  document.getElementById("guess-input").value = "";

  if (guess && !guessedLetters.includes(guess)) {
    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
      updateWordDisplay();
    } else {
      remainingAttempts--;
      document.getElementById("remaining-attempts").textContent =
        remainingAttempts;
      updateHangmanImage();
    }

    if (isGameOver()) {
      setTimeout(() => alert("Game Over! The word was " + selectedWord), 100);
      setTimeout(setupGame, 2000); // Restart the game after 2 seconds
    } else if (isWordGuessed()) {
      setTimeout(() => alert("Congratulations! You guessed the word!"), 100);
      setTimeout(setupGame, 2000); // Restart the game after 2 seconds
    }
  }
}

function updateWordDisplay() {
  const display = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("word-container").textContent = display;
}

function updateHangmanImage() {
  const hangmanStages = [
    "./images/stage0.svg",
    "./images/stage1.svg",
    "./images/stage2.svg",
    "./images/stage3.svg",
    "./images/stage4.svg",
    "./images/stage5.svg",
    "./images/stage6.svg",
  ];

  document.getElementById("hangman-image").src =
    hangmanStages[6 - remainingAttempts];
}

function isGameOver() {
  return remainingAttempts <= 0;
}

function isWordGuessed() {
  return selectedWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
}
