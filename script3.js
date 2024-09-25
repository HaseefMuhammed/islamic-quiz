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
        question: "പ്രവാചകൻ മുഹമ്മദിനോടൊപ്പം വിശ്വസിക്കാൻ അല്ലാഹു അയച്ച പുസ്തകങ്ങളിൽ ഒന്നല്ലാത്തത് ഏത്?",
        options: ["തൗറത്ത്", "സബൂര്‍", "ഇഞ്ചില്‍", "വേദങ്ങൾ"],
        answer: "വേദങ്ങൾ"
    },
    {
        question: "മുസ്ലിംമാർക്ക് ഹജ്ജ് തീർത്ഥാടനം നടത്തേണ്ടത് ഏത് മാസം?",
        options: ["റമദാൻ", "ദുൽ-ഹിജ്ജ", "ശവ്വാൽ", "മുഹറം"],
        answer: "ദുൽ-ഹിജ്ജ"
    },
    {
        question: "മുഹമ്മദ് നബി(സ) ജനിച്ച നഗരം ഏത്?",
        options: ["മദീന", "ജിദ്ദ", "മക്ക", "കാർബല"],
        answer: "മക്ക"
    },
    {
        question: "ഖുര്‍ആനിൽ ഏറ്റവും ചെറിയ സൂറ ഏത്?",
        options: ["അൽ-ഫലഖ്", "അൽ-ഇഖ്‌ലാസ്", "അൽ-കോൗസർ", "അൽ-ഫാത്തിഹ"],
        answer: "അൽ-കോൗസർ"
    },
    {
        question: "ഇസ്ലാമിൽ നിരീക്ഷണത്തിന് അനുശാസിക്കുന്ന പ്രാർത്ഥനയുടെ പേരെന്താണ്?",
        options: ["സലാത്ത്", "സിയാമ്", "സകാത്ത്", "ത്വവാഫ്"],
        answer: "സലാത്ത്"
    },
    {
        question: "ഇസ്ലാമിലെ നാലു പ്രധാന ഖലീഫകളിൽ അവസാനത്തെയാൾ ആരാണ്?",
        options: ["അബൂബക്കർ", "ഉമർ", "ഉത്മാൻ", "അലി"],
        answer: "അലി"
    },
    {
        question: "പ്രാർത്ഥനയ്ക്കായി വിളിക്കുന്ന സ്വരത്തെ എന്താണ് പറയുന്നത്?",
        options: ["ഇഖാമത്", "അസർ", "അദാൻ", "തസ്വീബ്"],
        answer: "അദാൻ"
    },
    {
        question: "മുഹമ്മദ് നബി(സ) യുടെ ആദ്യ ഭാര്യ ആരായിരുന്നു?",
        options: ["ആയിഷ", "ഫാത്തിമ", "ഖദീജ", "സഫിയ"],
        answer: "ഖദീജ"
    },
    {
        question: "ഖുര്‍ആന്റെ ഏറ്റവും വലിയ സൂറ ഏത്?",
        options: ["അൽ-നാസ്", "അൽ-ഇഖ്‌ലാസ്", "അൽ-ബഖറ", "അൽ-ഫാത്തിഹ"],
        answer: "അൽ-ബഖറ"
    },
    {
        question: "റമദാൻ മാസത്തിലെ അവസാനത്തെ മഹത്തായ രാത്രി ഏത്?",
        options: ["ലൈലത്തുൽ ഖദർ", "ഇദുൽ ഫിത്വർ", "മൗലിദ്", "ഇദുൽ അദ്ഹ"],
        answer: "ലൈലത്തുൽ ഖദർ"
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
console.log("Q3")