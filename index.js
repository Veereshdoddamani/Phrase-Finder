const words = [
  "javascript", "hangman", "coding", "programming", "developer",
"function", "variable", "object", "array", "string",
"boolean", "undefined", "null", "number", "event",
"document", "window", "element", "node", "browser",
"console", "debugging", "syntax", "algorithm", "loop",
"callback", "promise", "async", "await", "closure",
"scope", "hoisting", "prototype", "inheritance", "class",
"module", "import", "export", "require", "npm",
"webpack", "babel", "react", "vue", "angular",
"redux", "state", "props", "component", "hook",
"middleware", "ajax", "json", "api", "rest",
"graphql", "typescript", "eslint", "prettier", "jest",
"mocha", "chai", "sinon", "karma", "enzyme",
"dom", "eventlistener", "localstorage", "sessionstorage", "cookie",
"websocket", "fetch", "xmlhttprequest", "promiseall", "promiserace"

];
let selectedWord;
let guessedLetters;
let wrongAttempts;

function initGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongAttempts = 0;
  document.getElementById("message").textContent = "";
  renderWord();
  renderKeyboard();
  resetDrowningStages();
}

function renderWord() {
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";

  for (let letter of selectedWord) {
      const span = document.createElement("span");
      span.textContent = guessedLetters.includes(letter) ? letter : "_";
      span.classList.add("letter");
      wordContainer.appendChild(span);
  }
}

function renderKeyboard() {
  const keyboardContainer = document.getElementById("keyboardContainer");
  keyboardContainer.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
      const button = document.createElement("button");
      const letter = String.fromCharCode(i).toLowerCase();
      button.textContent = letter;
      button.onclick = () => handleGuess(letter);
      keyboardContainer.appendChild(button);
  }
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter)) {
      return;
  }

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
      renderWord();
      checkWin();
  } else {
      wrongAttempts++;
      updateDrowningStage();
      checkLoss();
  }
}

function updateDrowningStage() {
  if (wrongAttempts <= 6) {
      document.getElementById(`stage${wrongAttempts}`).style.height = `${wrongAttempts * 16.6}%`;
  }
}

function resetDrowningStages() {
  for (let i = 1; i <= 6; i++) {
      document.getElementById(`stage${i}`).style.height = "0";
  }
}

function checkWin() {
  const wordContainer = document.getElementById("wordContainer");
  const word = Array.from(wordContainer.children).map(span => span.textContent).join("");
  
  if (word === selectedWord) {
      document.getElementById("message").textContent = "You Win!";
  }
}

function checkLoss() {
  if (wrongAttempts >= 6) {
      document.getElementById("message").textContent = `You Lose! The word was: ${selectedWord}`;
  }
}

window.onload = initGame;
