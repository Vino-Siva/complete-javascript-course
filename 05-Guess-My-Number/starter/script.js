'use strict';

/** Generating Secret Number */
let score = 20;
let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20 + 1);
// document.querySelector('.number').textContent = secretNumber;

/** Game Functions */
const changeBackgroundWith = color => {
  document.querySelector('body').style.backgroundColor = color;
};

const showMessage = message => {
  document.querySelector('.message').textContent = message;
};

const noInput = () => {
  changeBackgroundWith('#b91c1c');
  showMessage('Oops! You forgot to input number! Try Again.');
};

const guessCondition = () => {
  score--;
  document.querySelector('.score').textContent = score;
};

const winCondition = () => {
  showMessage("AWESOME! That's Correct");
  changeBackgroundWith('#60b347');
  document.querySelector('.number').style.width = '30rem';
  document.querySelector('.check').textContent = 'Correct!';
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
  document.querySelector('.number').textContent = secretNumber;
};

const loseCondition = () => {
  showMessage("OOPS! You lost! Let's try Again.");
  changeBackgroundWith('#b91c1c');
  document.querySelector('.score').textContent = 0;
};

const resetGame = () => {
  showMessage('Start guessing...');
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.check').textContent = 'Check!';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  changeBackgroundWith('#222');
};

/** Game Handlers */
document.querySelector('.check').addEventListener('click', () => {
  let guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    noInput();
  } else if (guess === secretNumber) {
    winCondition();
  } else if (guess !== secretNumber && score > 1) {
    showMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
    guessCondition();
  } else {
    loseCondition();
  }
});
document.querySelector('.again').addEventListener('click', resetGame);
