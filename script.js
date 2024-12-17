const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

// get a random word from the 'words' array
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// show hidden word: split the 'selectedWord' string into an array and loop through each letter, if the current letter we looping through has been found in the 'correctLetters' array, then output the letter, or output an empty '', and finally we turn the array back into a string
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




// show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, "2000");
}




// update the wrong letters 
function updateWrongLettersEl() {
    // display the wrong letters 
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;

    // display the figure parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortnately you lost'; 
        popup.style.display = 'flex';
    }
}





// keydown letter press
window.addEventListener('keydown', e => {
    // 65 < e.keyCode < 90 are letters 
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        // put the hitten letter into the 'letter' variable
        const letter = e.key; 
        // console.log(letter);

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            } 
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    } 
});



// restart game and play again 
playAgainBtn.addEventListener('click', () => {
    // empty arrays
    // correctLetters = [];
    // wrongLetters = [];
    
    correctLetters.splice(0);
    wrongLetters.splice(0);


    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord(); 

    updateWrongLettersEl(); 

    popup.style.display = 'none';

});

displayWord();
