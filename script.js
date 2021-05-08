'use strict';

//creation du nombre à deviner avec la fonction Math
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);

//on ne garde pas uniquement la valeur dans le DOM, on la définie dans le code
let score = 20;

let highScore = 0;

//contenu du selecteur message
const displayMessageSelector = function (message) {
  document.querySelector('.message').textContent = message;
};

//contenu selecteur .number
const displayNumberSelector = function (message) {
  document.querySelector('.number').textContent = message;
};

//contenu selecteur .score
const displayScoreSelector = function (message) {
  document.querySelector('.score').textContent = message;
};

//fonction qu'on appellera dans l'eventListener du click sur check
const checkFunction = function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // Pas d'entrée de nombre
  if (!guess) {
    document.querySelector('.message').textContent =
      'You have to put a number !';

    // Gagné
  } else if (guess === secretNumber) {
    displayMessageSelector("You've found it !");
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    displayNumberSelector(guess);
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    //trop haut ou trop bas
  } else if (guess !== secretNumber) {
    if (score > 1) {
      guess > secretNumber
        ? displayMessageSelector('Too high')
        : displayMessageSelector('Too low');

      score--;
      displayScoreSelector(score);
    } else {
      displayMessageSelector('You lost the game');
      displayScoreSelector(0);
    }
  }
};

//fonction du bouton Again
const resetFunction = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  score = 20;
  displayScoreSelector(score);
  displayMessageSelector('Start guessing ...');
  displayNumberSelector('?');
  document.querySelector('.guess').value = null;
};

// selection du bouton check et mise en place d'un listener dessus
document.querySelector('.check').addEventListener('click', checkFunction);
document.querySelector('.again').addEventListener('click', resetFunction);
