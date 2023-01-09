const form = document.querySelector("form");
const mainMenu = document.querySelector(".main-menu");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(
  ".end-screen .reaction-time-text"
);
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

let gender;
let age;

const ask_for_age_and_gender = () => {
  age = prompt("Please enter your age: ");
  gender = prompt("Please enter your gender (M/F): ");
  return {age: age, gender: gender};
}

let timer;
let soundPlayed;
let timeNow;
let waitingForStart;
let waitingForClick;
let scores;
let averageScore;

const init = () => {
  soundPlayed = false;
  waitingForStart = false;
  waitingForClick = false;
  scores = [];
};

ask_for_age_and_gender();
init();

const playSound = () => {
  const audio = new Audio("./beep.mp3");
  audio.volume = 0.2;
  audio.play();
  soundPlayed = true;
  timeNow = Date.now();
};

const startGame = () => {
  message.innerHTML = "Wait for the sound.";
  message.style.color = "#111";

  let randomNumber = Math.floor(Math.random() * 4000 + 3000);
  timer = setTimeout(playSound, randomNumber);

  waitingForStart = false;
  // waitingForClick = true;
};

mainMenu.addEventListener("click", () => {
  mainMenu.classList.remove("active");
  startGame();
});

const endGame = () => {
  endScreen.classList.add("active");
  clearTimeout(timer);

  let total = 0;

  scores.forEach((s) => {
    total += s;
  });

  averageScore = Math.round(total / scores.length);

  reactionTimeText.innerHTML = `${averageScore} ms`;
};

const displayReactionTime = (rt) => {
  message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
  soundPlayed = false;
  waitingForStart = true;
  scores.push(rt);
  if (scores.length >= 3) {
    endGame();
    $.post("http://localhost:3000/",
      {
        age: age,
        gender: gender,
        scores: scores,
        averageScore: averageScore,
      },
    )
  }
};

const displayTooSoon = () => {
  message.innerHTML = "Too Soon. Click to continue";
  message.style.color = "#111";
  waitingForStart = true;
  clearTimeout(timer);
};

document.body.addEventListener("click", () => {
  if (soundPlayed) {
    let clickTime = Date.now();
    let reactionTime = clickTime - timeNow;
    displayReactionTime(reactionTime);
    return;
  }

  if (waitingForStart) {
    startGame();
    return;
  }

  if (waitingForClick) {
    displayTooSoon();
  }
});

playAgainBtn.addEventListener("click", () => {
    endScreen.classList.remove("active");
    init();
    startGame();
    });