const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

// get a random word from the 'words' array
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// show hidden word: split the selectedWord string into an array and loop through each letter, if the current letter we looping through has been found in the correctLetters array, then output the letter, or output an empty '', and finally we turn the array back into a string
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter =>
        `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`
        ).join('')}`;
    
    // regular expression: replace the newline caracter, which is '\n', with a empty string, 'g' means globally, wherever it's found
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    
    // console.log(wordEl.innerText, innerWord);

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!!';
        popup.style.display = 'flex';
    }
}

displayWord()
