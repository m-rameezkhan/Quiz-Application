let quizData = [];
let current = 0;
let score = 0;
let total = 5;
let interval;

const qEl = document.getElementById('q');
const timerEl = document.getElementById('timer');
const optionEls = [
  document.getElementById('option1'),
  document.getElementById('option2'),
  document.getElementById('option3'),
  document.getElementById('option4')
];

// Fetch quiz questions on load
fetch('https://opentdb.com/api.php?amount=5&type=multiple')
  .then(res => res.json())
  .then(data => {
    quizData = data.results.map(formatQuestion);
    total = quizData.length;
    showQuestion(current);
    counterStart();
  })
  .catch(err => {
    qEl.innerText = 'Failed to load quiz.';
    console.error(err);
  });

function formatQuestion(apiQuestion) {
  const txt = document.createElement('textarea');
  txt.innerHTML = apiQuestion.question;
  const question = txt.value;

  txt.innerHTML = apiQuestion.correct_answer;
  const correct = txt.value;

  const incorrects = apiQuestion.incorrect_answers.map(ans => {
    txt.innerHTML = ans;
    return txt.value;
  });

  const options = [...incorrects];
  const correctIndex = Math.floor(Math.random() * 4);
  options.splice(correctIndex, 0, correct);

  return {
    question,
    options,
    answer: correct
  };
}

function showQuestion(index) {
  const q = quizData[index];
  qEl.innerHTML = q.question;
  for (let i = 0; i < 4; i++) {
    optionEls[i].innerText = q.options[i];
  }
}

function counterStart() {
  clearInterval(interval);
  let jsSec = 30;
  timerEl.innerHTML = jsSec;

  interval = setInterval(() => {
    jsSec--;
    timerEl.innerHTML = jsSec;

    if (jsSec <= 0) {
      clearInterval(interval);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  let inputs = document.getElementsByTagName('input');
  let selectedIndex = -1;

  Array.from(inputs).forEach((element, index) => {
    if (element.checked) {
      selectedIndex = index;
    }
  });

  if (selectedIndex !== -1) {
    if (quizData[current].options[selectedIndex] === quizData[current].answer) {
      score++;
    }
  }

  current++;
  if (current < total) {
    showQuestion(current);
    counterStart();
    Array.from(inputs).forEach(input => input.checked = false);
  } else {
    showResult();
  }
}

function showResult() {
  qEl.innerHTML = "";
  document.getElementById('options').innerHTML = `
        <h1>Quiz Completed</h1>
        <div class="chart">
            <canvas id="quizOutlineChart" width="300" height="300"></canvas>
        </div>
        <div style="text-align:center; margin-top:20px;">
            <button class="next" onclick="restartQuiz()">Try Again</button>
        </div>
    `;
  timerEl.innerHTML = "";
  clearInterval(interval);
  renderOutlineChart(score, total);
  document.getElementById('clearBtn').style.display = 'none';
}


function renderOutlineChart(score, total) {
  const ctx = document.getElementById("quizOutlineChart").getContext("2d");
  const percentage = ((score / total) * 100).toFixed(1);

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Score', 'Remaining'],
      datasets: [{
        data: [percentage, 100 - percentage],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        borderWidth: 0,
        cutout: '80%',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.raw.toFixed(1)}%`
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
        ctx.fillText(percentage + '%', width / 2, height / 2);
        ctx.restore();
      }
    }]
  });
}

function clearSelection() {
  const inputs = document.getElementsByTagName('input');
  Array.from(inputs).forEach(input => input.checked = false);
}

function restartQuiz() {
  current = 0;
  score = 0;
  qEl.innerText = "Loading...";
  timerEl.innerText = "30";
  document.getElementById('clearBtn').style.display = 'inline-block';

  document.getElementById('options').innerHTML = `
        <label><input type="radio" name="option" id="opt1"><span id="option1"></span></label>
        <label><input type="radio" name="option" id="opt2"><span id="option2"></span></label>
        <label><input type="radio" name="option" id="opt3"><span id="option3"></span></label>
        <label><input type="radio" name="option" id="opt4"><span id="option4"></span></label>
    `;

  // re-get the option span references because DOM has been replaced
  optionEls[0] = document.getElementById('option1');
  optionEls[1] = document.getElementById('option2');
  optionEls[2] = document.getElementById('option3');
  optionEls[3] = document.getElementById('option4');

  fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(res => res.json())
    .then(data => {
      quizData = data.results.map(formatQuestion);
      total = quizData.length;
      showQuestion(current);
      counterStart();
    })
    .catch(err => {
      qEl.innerText = 'Failed to load quiz.';
      console.error(err);
    });
}

