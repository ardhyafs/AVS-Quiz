const questions = [
    {
        question: "Apa singkatan dari HTML?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighTech Markup Language", correct: false },
            { text: "HyperTransfer Markup Language", correct: false },
            { text: "HighText Markup Language", correct: false },
        ]
    },
    {
        question: "Elemen HTML untuk membuat paragraf adalah?",
        answers: [
            { text: "< p >", correct: true },
            { text: "< par >", correct: false },
            { text: "< para >", correct: false },
            { text: "< paragraph >", correct: false },
        ]
    },
    {
        question: "Apa fungsi dari elemen < head > dalam HTML?",
        answers: [
            { text: "Menyimpan konten halaman web", correct: false },
            { text: "Menyediakan tautan ke halaman lain", correct: false },
            { text: "Menyimpan informasi meta dan link", correct: true },
            { text: "Menyusun struktur halaman web", correct: false },
        ]
    },
    {
        question: "Apa yang dimaksud dengan elemen < iframe > dalam HTML?",
        answers: [
            { text: "Menyisipkan video", correct: false },
            { text: "Menyisipkan gambar", correct: false },
            { text: "Menyisipkan halaman web lain", correct: true },
            { text: "Menyisipkan audio", correct: false },
        ]
    },
    {
        question: "Apa yang dimaksud dengan elemen < div > dalam HTML?",
        answers: [
            { text: "Menyisipkan gambar", correct: false },
            { text: "Menyusun halaman web", correct: true },
            { text: "Menyisipkan halaman web lain", correct: false },
            { text: "Menyisipkan video", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disable = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Anda benar ${score} dari ${questions.
        length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();