const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
  const num = numQuestions.value,
    cat = category.value,
    diff = difficulty.value;
  const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results;
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        currentQuestion = 1;
        showQuestion(questions[0]);
      });
    };

startBtn.addEventListener("click", startQuiz);

const submitBtn = document.querySelector(".submit");
  nextBtn = document.querySelector(".next");


const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
        answersWrapper = document.querySelector(".answer-wrapper"),
        questionNumber = document.querySelector(".number"); 

        questionText.innerHTML = question.question;

        //corret an wrong answer are sparete lets mix them
        const answers = [
            ...question.incorrect_answers, 
            question.correct_answer.toString(),
        ];
        //correct answer will be always at last
        //lets sheffle the array

        answers.sort(()=> Math.random() - 0.5);
        answersWrapper.innerHTML = "";
        answers.forEach((answer) =>{
            answersWrapper.innerHTML += `
            <div class="answer">
              <span class="text">${answer}</span>
              <span class="checkbox">
                <span class="icon">✓</span>
              </span>
            </div>
            `
        })

        questionNumber.innerHTML =`
        Quesrion <span class="current">${questions.indexOf(question) +1}
        </span><span class="total">${questions.length}</span>
        `;

       //lets add evebt listener on answer 
        
       const answerDiv = document.querySelectorAll(".answer")
       answerDiv.forEach((answer) =>{
        answer.addEventListener("click", () =>{
          //if answer not already submitted
          if(!answer.classList.contains("checked")) {
            //remove checked from other answer
            answerDiv.forEach((answer) => {
                answer.classList.remove("selected");
          });
          //add selected on currently clicked
          answer.classList.add("selected");
          //after any answer is selected enable submit btn
          submitBtn.disabled = false;
        }
        })
       })
};