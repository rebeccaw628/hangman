export let chosenWord = selectRandomWord();

import words from '../assets/word-bank.json' with {type: 'json'};

// generate random word
function selectRandomWord() {
    return words[Math.floor(Math.random()*(words.length))];
}

export const rechooseWord = () => {
    chosenWord = selectRandomWord();
}

