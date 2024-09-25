var key = prompt("Enter your key:", "").trim();  // Trim any extra spaces

if (key === null) {
  // If the user presses the Cancel button, the key will be null
  location.reload();  // Reload the page immediately
} else if (key === "") {
  // If the user presses OK without entering anything
  alert("No key entered. Reloading the page.");
  location.reload();  // Reload the page
} else if (key === "haseef@df") {
  console.log("Correct key");
} else {
  alert("Incorrect key");  // Alert the user if the key is incorrect
  location.reload();  // Reload the page after the alert is acknowledged
}




document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('reveal-score').addEventListener('click', revealScore);
// document.getElementById('play-again-button').addEventListener('click', playAgain);

const questions = [
    {
        question: "മുസ്ലിംമാർക്ക് വിശ്വാസത്തിന്റെ അഞ്ച് സ്തംഭങ്ങളിൽ ഒന്നാണ്, അത് എന്താണ്?",
        options: ["സലാത്ത്", "സകാത്ത്", "ഹജ്ജ്", "ഷഹാദ"],
        answer: "ഷഹാദ"
    },
    {
        question: "പ്രവാചകനായ മുഹമ്മദ് നബി(സ) യെ അറിയപ്പെടുന്ന ഒരു നാമം എന്താണ്?",
        options: ["ഖാലിഫ", "അമീർ", "അൽ-അമീൻ", "അയ്യൂബ്"],
        answer: "അൽ-അമീൻ"
    },
    {
        question: "ഇസ്ലാമിൽ ഉപവാസം പാലിക്കുന്ന മാസം ഏതാണ്?",
        options: ["റമദാൻ", "ദുൽ-ഹിജ്ജ", "മുഹറം", "റജബ്"],
        answer: "റമദാൻ"
    },
    {
        question: "മക്കയിൽ നിന്നു യാഥാർത്ഥ്യത്തിൽ മുഹമ്മദ് നബി(സ) മദീനയിലേക്കുള്ള യാത്ര അറിയപ്പെടുന്നത് എന്താണ്?",
        options: ["ഹിജ്റ", "ഇസ്ര", "മിറാജ്", "ഉംറ"],
        answer: "ഹിജ്റ"
    },
    {
        question: "ഖുര്‍ആനിലെ എത്ര അധ്യായങ്ങൾ (സൂറ) ഉണ്ട്?",
        options: ["110", "114", "120", "130"],
        answer: "114"
    },
    {
        question: "ഇസ്ലാമിൽ 'സലാത്ത്' എന്താണ് സൂചിപ്പിക്കുന്നത്?",
        options: ["പ്രാർത്ഥന", "ദാനം", "ഉപവാസം", "വഴിപാടു"],
        answer: "പ്രാർത്ഥന"
    },
    {
        question: "മുസ്ലിംമാരുടെ ആഴ്ച്ചയിലെ വിശുദ്ധ ദിനം ഏത്?",
        options: ["ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"],
        answer: "വെള്ളി"
    },
    {
        question: "മുസ്ലിംമാർക്ക് ഖബറടക്കത്തിനു ശേഷം വിശ്വാസം അനുസരിച്ച്, ആരുടെ മുമ്പാകെ മൊഴിയിടണം?",
        options: ["മാലാഖമാർ", "പ്രവാചകൻ", "മിക്കാ'ൽ", "ആറിഫ്"],
        answer: "മാലാഖമാർ"
    },
    {
        question: "ഖുര്‍ആൻ ആരുടെ വചനം എന്ന് വിശ്വാസമുണ്ട്?",
        options: ["പ്രവാചകന്റെ", "അല്ലാഹുവിന്റെ", "അജ്ഞാതരുടെ", "മാലാഖമാരുടെ"],
        answer: "അല്ലാഹുവിന്റെ"
    },
    {
        question: "ഖുര്‍ആനിലെ ആദ്യത്തെ സൂറ എന്താണ്?",
        options: ["അൽ-ബഖറ", "അൽ-ഫാത്തിഹ", "അൽ-ഇഖ്‌ലാസ്", "അൽ-നാസ്"],
        answer: "അൽ-ഫാത്തിഹ"
    }
];


let shuffledQuestions, currentQuestionIndex, score, timerInterval, timeLeft;

function startQuiz() {
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        alert('Please enter your name');
        return;
    }

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');

    resetQuiz();
    showQuestion();
}

function resetQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 120;
    document.getElementById('time').textContent = timeLeft;
    timerInterval = setInterval(updateTimer, 1000);
}

function showQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(option) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (option === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
}

function revealScore() {
    const name = document.getElementById('name').value;
    document.getElementById('score').textContent = `${name} got ${score} out of ${questions.length}`;
}

// function playAgain() {
//     document.getElementById('result-screen').classList.add('hidden');
//     document.getElementById('quiz-screen').classList.remove('hidden');
//     resetQuiz();
//     showQuestion();
// }

console.log(`Script loaded`)
console.log("Q2")