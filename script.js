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
        question: "ഇസ്ലാമിന്റെ വിശുദ്ധ ഗ്രന്ഥം ഏതാണ്?",
        options: ["തൗറത്ത്", "ഖുര്‍ആന്‍", "ബൈബിൾ", "വേദങ്ങൾ"],
        answer: "ഖുര്‍ആന്‍"
    },
    {
        question: "വിശ്വാസത്തിന്റെ പ്രഖ്യാപനം എന്താണ്?",
        options: ["സകാത്", "ഷഹാദ", "സലാത്ത്", "ഹജ്ജ്"],
        answer: "ഷഹാദ"
    },
    {
        question: "ഇസ്ലാമിലെ എത്ര സ്തംഭങ്ങൾ (അടിസ്ഥാന സിദ്ധാന്തങ്ങൾ) ഉണ്ട്?",
        options: ["മൂന്ന്", "നാല്", "അഞ്ച്", "ആറ്"],
        answer: "അഞ്ച്"
    },
    {
        question: "മുസ്ലിംമാർ പ്രാർത്ഥിക്കുമ്പോൾ ഏത് ദിശയിലാണ് തിരിഞ്ഞുനിൽക്കുന്നത്?",
        options: ["കിഴക്ക്", "തെക്ക്", "മക്ക", "യെരുശലേം"],
        answer: "മക്ക"
    },
    {
        question: "ഇസ്ലാമിലെ ഉപവാസ മാസമേത്?",
        options: ["മുഹറം", "റമദാൻ", "ശവ്വാൽ", "ദുൽ-ഹിജ്ജ"],
        answer: "റമദാൻ"
    },
    {
        question: "'സകാത്' എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
        options: ["പ്രാർത്ഥന", "ദാനം", "ഉപവാസം", "തീർഥാടനവും"],
        answer: "ദാനം"
    },
    {
        question: "മുസ്ലിംമാർക്ക് പ്രധാനപ്പെട്ട ഒരു പണ്ടിഗയേത്?",
        options: ["ബക്രിദ്", "ഇദുൽ ഫിത്വർ", "ക്രിസ്മസ്", "ദിവാളി"],
        answer: "ഇദുൽ ഫിത്വർ"
    },
    {
        question: "മക്കയിലേക്ക് നടത്തുന്ന തീർഥാടനം എന്താണ്?",
        options: ["ഹജ്ജ്", "ഉംറ", "ത്വവാഫ്", "തക്ക്വ"],
        answer: "ഹജ്ജ്"
    },
    {
        question: "ഇസ്ലാമിലെ അവസാന പ്രവാചകൻ ആരാണ്?",
        options: ["അബ്രാഹിം", "മൂസ", "മുഹമ്മദ്", "ഈസ"],
        answer: "മുഹമ്മദ്"
    },
    {
        question: "ഇസ്ലാമിലെ ദൈവത്തെ എന്താണ് വിളിക്കുന്നത്?",
        options: ["അല്ലാഹ്", "ബാഹ്മ", "എലോഹീം", "അദൊനായ്"],
        answer: "അല്ലാഹ്"
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
console.log("Q1")