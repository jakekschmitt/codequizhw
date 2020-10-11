const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const resultForm = document.getElementById('form-result');
  var timer = document.querySelector("#time");


  let numberOfRightAnswers = 0; //1. How many answers were correct
  let randomQuestions, currentQuestionIndex;
  let currentQuestion = 1;

  var secondsRemaining = 60;


function setTime() {
  var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = secondsLeft;

      if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
      }

  }, 1000);


  
  
  startButton.addEventListener('click', startGame);

  setTime();

  
  nextButton.addEventListener('click', () => {
    document.getElementById('answer-buttons').classList.remove('no-click'); 
  
    currentQuestionIndex++; 
    setNextQuestion();
  
    currentQuestion++; 
    document.getElementById('current-question').innerHTML = currentQuestion;
  })
  
  
  function startGame() {
    console.log('started');
  
    document.getElementById('answer-buttons').classList.remove('no-click'); 
  
    startButton.classList.add('hide');
    resultForm.classList.add('hide');
  
    shuffledQuestions = questions.sort (() => Math.random() - 0.5) 
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  
    currentQuestion = 1;
    document.getElementById('current-question').innerHTML = currentQuestion;
  
    //3.  reset the counter after the test started 
    countRightAnswers = 0;
  
    document.getElementById('all-questions2').innerHTML = questions.length;
    document.getElementById('all-questions').innerHTML = questions.length; 
  }
  
  
  function setNextQuestion() {
    resetState(); 
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question; 
    question.answers.forEach(answer => {
      const button = document.createElement('button'); 
      button.innerText = answer.text;  
      button.classList.add('btn'); 
      if (answer.correct){ 
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button); 
    });
  }
  
  
  function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    })
  
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
  
      resultForm.classList.remove('hide');
      questionContainerElement.classList.add('hide');
  
      startButton.innerText = 'Repeat'; 
      startButton.classList.remove('hide'); 
    }
  
  
    //2. if the answer is correct
    if (selectedButton.dataset = correct) {
      countRightAnswers++; //+1
    }

  
    //5. to show the score inside <span>
    document.getElementById('right-answers').innerHTML = countRightAnswers; 
    document.getElementById('answers-percent').innerHTML = ((100 * countRightAnswers)/questions.length).toFixed(0);
    //prevent multiclicking 
    document.getElementById('answer-buttons').classList.add('no-click'); 
  }
  
  
  function setStatusClass(element, correct) { 
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong')
    }
  }
  
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

const questions = [
  {
    question: 'What is 5 + 5?',
    answers: [
      { text: '10', correct: true },
      { text: '55', correct: false }
    ]
  },
  {
    question: 'Who is the best instructor?',
    answers: [
      { text: 'Chad', correct: true },
      { text: 'Lee', correct: true },
      { text: 'Alexis', correct: true },
      { text: 'Substitute Guy', correct: true }
    ]
  },
  {
    question: 'What does JSON stand for?',
    answers: [
      { text: 'Jerry Springer Online Network', correct: false },
      { text: 'Javascript Object Notation', correct: true },
      { text: 'Joomla Standard Object Notation', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]