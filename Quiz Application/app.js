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

function showResult(score, total) {
  let options = document.getElementById("options")
  question.innerHTML = ""
  options.innerHTML = `<h1>Quiz Completed</h1>
            <div class="chart">
                <canvas id="quizOutlineChart" width="300" height="300"></canvas>
            </div>`
  document.getElementById('timer').innerHTML = "";
  clearInterval(interval);

  renderOutlineChart(score, total);
}

function renderOutlineChart(score, total) {
  const ctx = document.getElementById("quizOutlineChart").getContext("2d");
  const percentage = ((score / total) * 100).toFixed(1); // Calculate percentage

  // Create the chart
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Score', 'Remaining'],
      datasets: [{
        data: [percentage, 100 - percentage],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        borderWidth: 0,
        cutout: '80%', // Makes the chart look like an outline
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide legend for simplicity
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ': ' + context.raw.toFixed(1) + '%';
            }
          }
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
    plugins: [{
      id: 'textCenter',
      beforeDraw: function (chart) {
        const { width, height, ctx } = chart;
        ctx.save();
        const fontSize = (height / 90).toFixed(2);
        ctx.font = `${fontSize}em Arial`;
        ctx.fillStyle = '#4CAF50';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = percentage + '%';
        const textX = width / 2;
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.restore();
      }
    }]
  });
}

let current = 0
let score = 0;
let total = 10;
function nextQuestion() {
  current++;

  let inputs = document.getElementsByTagName('input');

  if (current < jsQuestions.length) {
    showQuestion(current);
    counterStart(); // restart timer with each new question
  } else {
    showResult(score, total)
    return;
  }

  let selectedIndex = -1;
  Array.from(inputs).forEach((element, index) => {
    if (element.checked) {
      selectedIndex = index;
    }
  });

  if (selectedIndex !== -1) {
    console.log(jsQuestions[current - 1].options[selectedIndex])
    if (jsQuestions[current - 1].options[selectedIndex] === jsQuestions[current - 1].answer) {
      console.log("Correct Answer");
      score++
    } else {
      console.log("Wrong Answer");
    }
  } else {
    console.log("No option selected");
  }

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'radio') {
      inputs[i].checked = false;
    }
  }
}

showQuestion(current)
