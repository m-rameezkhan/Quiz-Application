const jsQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "9", "7"],
    answer: "8"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Picasso", "Da Vinci", "Van Gogh", "Rembrandt"],
    answer: "Da Vinci"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Whale", "Hippopotamus", "Giraffe"],
    answer: "Whale"
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "India"],
    answer: "Japan"
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "80°C", "120°C"],
    answer: "100°C"
  }
];
let interval;

function counterStart() {
  clearInterval(interval); // stop any previous timer

  let jsSec = 30;
  let htmlSec = document.getElementById('timer');
  htmlSec.innerHTML = jsSec;

  interval = setInterval(() => {
    jsSec--;
    htmlSec.innerHTML = jsSec;

    if (jsSec <= 0) {
      clearInterval(interval);
      nextQuestion();
    }
  }, 1000);
}
counterStart()

let question = document.getElementById('q')
let option1 = document.getElementById('option1')
let option2 = document.getElementById('option2')
let option3 = document.getElementById('option3')
let option4 = document.getElementById('option4')

function showQuestion(index) {
  question.innerHTML = jsQuestions[index].question;
  option1.innerHTML = jsQuestions[index].options[0];
  option2.innerHTML = jsQuestions[index].options[1];
  option3.innerHTML = jsQuestions[index].options[2];
  option4.innerHTML = jsQuestions[index].options[3];
}
let current = 0

function nextQuestion() {
  current++;

  let inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'radio') {
      inputs[i].checked = false;
    }
  }

  if (current < jsQuestions.length) {
    showQuestion(current);
    counterStart(); // restart timer with each new question
  } else {
    question.innerHTML = "Quiz completed!";
    option1.innerHTML = "";
    option2.innerHTML = "";
    option3.innerHTML = "";
    option4.innerHTML = "";
    document.getElementById('timer').innerHTML = "";
    clearInterval(interval); // make sure timer is cleared
  }
}

showQuestion(current)
