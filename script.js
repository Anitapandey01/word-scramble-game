const wordText = document.querySelector(".word"), 
hintText = document.querySelector(".hint span"),
inputField = document.querySelector("input"),
timeText = document.querySelector(".time b "),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word"),
messageBox = document.getElementById("message");

let correctWord, timer;

const showMessage = (text, color) => {
    messageBox.innerHTML = text;
    messageBox.style.color = color;
};

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        showMessage(`⏰ Time over! The correct word was: ${correctWord.toUpperCase()}`, "red");
        setTimeout(() => {
            initGame();
        }, 2000);
    }, 1000);
};

const initGame = () => {
    clearInterval(timer);
    initTimer(30);

    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    messageBox.innerHTML = ""; // Clear previous message
};

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();

    if (!userWord) {
        showMessage("✏️ Please enter a word!", "orange");
        return;
    }

    if (userWord !== correctWord) {
        showMessage(`❌ Oops! "${userWord}" is not correct 😢`, "red");
    } else {
        showMessage(`🎉 Yahoo! "${userWord.toUpperCase()}" is correct 😊`, "green");
        clearInterval(timer); // Stop timer
        setTimeout(() => {
            initGame(); // Auto-refresh after 2 sec
        }, 2000);
    }
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Start the first game
initGame();
