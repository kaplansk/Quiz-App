const questions = [
  {
    question: "What is the capital of Turkey?",
    answers: [
      { text: "Istanbul", correct: false },
      { text: "Ankara", correct: true },
      { text: "Izmir", correct: false },
      { text: "Bursa", correct: false },
    ]
  },
  {
    question: "What is the largest ocean in the world?",
    answers: [
      { text: "Indian", correct: false },
      { text: "Arctic", correct: false },
      { text: "Atlantic", correct: false },
      { text: "Pacific", correct: true },
    ]
  },

  {
    question: "What is the largest planet in the Solar System?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
    ]
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Makalu", correct: false },
    ]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "O2", correct: false },
      { text: "CO2", correct: false },
      { text: "H2", correct: false },
    ]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
    ]
  },
  {
    question: "What is the smallest unit of life?",
    answers: [
      { text: "Molecule", correct: false },
      { text: "Atom", correct: false },
      { text: "Cell", correct: true },
      { text: "Organ", correct: false },
    ]
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [
      { text: "China", correct: false },
      { text: "Japan", correct: true },
      { text: "South Korea", correct: false },
      { text: "Vietnam", correct: false },
    ]
  },
  {
    question: "What is the freezing point of water in Celsius?",
    answers: [
      { text: "0°C", correct: true },
      { text: "32°C", correct: false },
      { text: "-1°C", correct: false },
      { text: "100°C", correct: false },
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
    ]
  },

  {
    question: "Which element has the atomic number 1?",
    answers: [
      { text: "Helium", correct: false },
      { text: "Oxygen", correct: false },
      { text: "Hydrogen", correct: true },
      { text: "Carbon", correct: false },
    ]
  },

  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Lyon", correct: false },
      { text: "Marseille", correct: false },
      { text: "Nice", correct: false },
    ]
  },
  {
    question: "What is the most spoken language in the world?",
    answers: [
      { text: "English", correct: false },
      { text: "Mandarin Chinese", correct: true },
      { text: "Spanish", correct: false },
      { text: "Hindi", correct: false },
    ]
  },
  {
    question: "How many continents are there in the world?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ]
  }



];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffleArray(questions); // Soruları karıştırıyoruz
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
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
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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
});

startQuiz();
