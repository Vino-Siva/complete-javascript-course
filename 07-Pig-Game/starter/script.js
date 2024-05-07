'use strict';

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');
const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const diceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newButton = document.querySelector('.btn--new');
const playerEl1 = document.querySelector('.player--0');
const playerEl2 = document.querySelector('.player--1');

let scores, activePlayer, playing, currentScore;

const startCondition = () => {
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  currentScore = 0;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  diceEl.classList.add('hidden');
  playerEl1.classList.add('player--active');
  playerEl2.classList.remove('player--active');
  playerEl1.classList.remove('player--winner');
  playerEl2.classList.remove('player--winner');
};
startCondition();

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl1.classList.toggle('player--active');
  playerEl2.classList.toggle('player--active');
};

const diceButtonAction = () => {
  if (playing) {
    const rollDice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rollDice}.png`;
    if (rollDice !== 1) {
      currentScore += rollDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdButtonAction = () => {
  if (playing) {
    scores[activePlayer] += Number(currentScore);
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};

diceButton.addEventListener('click', diceButtonAction);

holdButton.addEventListener('click', holdButtonAction);

newButton.addEventListener('click', startCondition);
