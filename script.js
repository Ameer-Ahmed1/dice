'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const restartBtn = document.querySelector('.btn--new');

// players
let activePlayer = 0;
let currentScores = [0, 0];
let totalScores = [0, 0];
let playing = true;

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

function generateDice() {
  const diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}

function switchPlayer() {
  currentScores[activePlayer] = 0;
  if (activePlayer == 0) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
  activePlayer = 1 - activePlayer;
  currentScore0El.textContent = currentScores[0];
  currentScore1El.textContent = currentScores[1];
}

function handleRoll() {
  if (playing) {
    const diceNum = generateDice();

    diceEl.setAttribute('src', `dice-${diceNum}.png`);
    diceEl.classList.remove('hidden');
    if (diceNum == 1) {
      switchPlayer();
    } else {
      currentScores[activePlayer] += diceNum;
      currentScore0El.textContent = currentScores[0];
      currentScore1El.textContent = currentScores[1];
    }
  }
}

function declareWinner() {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.rempove('player--active');
}

function handleHold() {
  if (playing) {
    totalScores[activePlayer] += currentScores[activePlayer];
    score0El.textContent = totalScores[0];
    score1El.textContent = totalScores[1];
    if (totalScores[activePlayer] >= 100) {
      declareWinner();
    } else {
      switchPlayer();
    }
  }
}

function handleRestart() {
  activePlayer = 0;
  currentScores = [0, 0];
  totalScores = [0, 0];
  playing = true;
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
}

rollBtn.addEventListener('click', handleRoll);
holdBtn.addEventListener('click', handleHold);
restartBtn.addEventListener('click', handleRestart);
