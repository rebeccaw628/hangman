import {
    chosenWord,
    rechooseWord
} from './js/game.js';

console.log(chosenWord);

// initalise variables
let guessedLetters = [];
let maxWrong = 10;
let wrongGuessCount = 0;


const keyboard = document.querySelector('#keyboard-area');
const incorrect = document.querySelector('#wrong-count');
const hangmanImg = document.querySelector('.hangman-display img');
const wordDisplay = document.querySelector('#word-display');
const resetBtn = document.querySelector('button');

// word display
const displayWord = () => {
    wordDisplay.innerHTML = chosenWord
                            .split('')
                            .map(letter => guessedLetters.indexOf(letter) >= 0 ? letter : '_')
                            .join('');
                        };

// keyboard display
export const buttons = () => {
    for (let letter of 'qwertyuiopasdfghjklzxcvbnm') {
    let button = document.createElement('button');
    button.textContent = letter;
    keyboard.appendChild(button);
    button.addEventListener('click', () => onGuess(button, letter));
    }
};

// for every guess
const onGuess = (clickedButton, chosenLetter) => {
    console.log(chosenLetter)
    guessedLetters.push(chosenLetter);
    console.log(guessedLetters);
    clickedButton.disabled = true;

    if(chosenWord.includes(chosenLetter)) {
        clickedButton.style.backgroundColor = '#428643';
        displayWord();
    }
        else if (!chosenWord.includes(chosenLetter)) {
            clickedButton.style.backgroundColor = '#BA0021';
            wrongGuessCount++;
            wrongGuessCounter();
            updateHangman(wrongGuessCount);
        }
    checkStatus ();
    };

// update wrong guess counter
const wrongGuessCounter = () => {
    incorrect.innerHTML = `${wrongGuessCount}`;
}

// update hangman pic
function updateHangman (wrongGuessCount) {
    return hangmanImg.src =`./assets/img/h-${wrongGuessCount}.jpg`
};

const checkStatus = () => {
    if (wrongGuessCount < 10 && wordDisplay.innerHTML.split('').includes('_')) {
        return;
    }
    else if (wrongGuessCount < 10 && !wordDisplay.innerHTML.split('').includes('_')) {
        keyboard.textContent = "You guessed the word!";
        showButton();
    }
    else if (wrongGuessCount === maxWrong) {
        keyboard.textContent = `You lost :( The word was '${chosenWord}'.`
        showButton();
    }
};

// show reset button
const showButton = () => {
    resetBtn.classList.remove('hidden')
};

resetBtn.addEventListener('click', () => {
    reset();
});

const reset = () => {
    keyboard.innerHTML = '';
    document.querySelector('button').classList.add('hidden');
    guessedLetters = [];
    wrongGuessCount = 0;
    buttons();
    rechooseWord();
    hangmanImg.src =`./assets/img/h-${wrongGuessCount}.jpg`
    wrongGuessCounter();
    displayWord();
    console.log(chosenWord)
}

displayWord();
buttons();




