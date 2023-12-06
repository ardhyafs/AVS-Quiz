const questions = [
    {
        question: "Apa itu JavaScript?",
        answers: [
            { text: "Bahasa Pemrograman", correct: true },
            { text: "Browser Web", correct: false },
            { text: "Markup Language", correct: false },
            { text: "Sistem Operasi", correct: false },
        ]
    },
    {
        question: "Apa fungsi dari method parseInt() dalam JavaScript?",
        answers: [
            { text: "Mengonversi string menjadi angka bulat", correct: true },
            { text: "Mengonversi angka bulat menjadi string", correct: false },
            { text: "Menambahkan dua angka", correct: false },
            { text: "Membagi dua angka", correct: false },
        ]
    },
    {
        question: "Apa yang dilakukan oleh operator === dalam JavaScript?",
        answers: [
            { text: "Menambah dua nilai", correct: false },
            { text: "Membandingkan nilai tanpa memperhatikan tipe data", correct: false },
            { text: "Membandingkan nilai dan tipe data", correct: true },
            { text: "Membagi dua nilai", correct: false },
        ]
    },
    {
        question: "Bagaimana cara menambahkan komentar satu baris dalam JavaScript?",
        answers: [
            { text: "// Ini adalah komentar", correct: true },
            { text: " /* Ini adalah komentar */", correct: false },
            { text: "-- Ini adalah komentar", correct: false },
            { text: "# Ini adalah komentar", correct: false },
        ]
    },
    {
        question: "Apa perbedaan antara let dan var dalam mendeklarasikan variabel di JavaScript?",
        answers: [
            { text: "Tidak ada perbedaan", correct: false },
            { text: "`let` bersifat lokal dalam blok, sedangkan `var` bersifat global dalam fungsi", correct: true },
            { text: "`let` bersifat global, sedangkan `var` bersifat lokal dalam blok", correct: false },
            { text: "`let` hanya dapat digunakan dalam loop, sedangkan `var` dapat digunakan di mana saja", correct: false },
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