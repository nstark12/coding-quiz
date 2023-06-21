// question array
var questions = [
    {
        title: "Commonly Used data types DO NOT include:",
        options: ["stings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
        title: "How do you call a function named myFunction?",
        options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
        answer: "myFunction()"
    },
    {
        title: "What javascipt method can we use to select an html element?",
        options: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
        answer: "Both 1 and 3"
    },
    {
        title: "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
        options: ["method", "assignment operator", "variable", "string"],
        answer: "variable"
    },
    {
        title: "What attribute is used in html to decorate content?",
        options: ["css", "class", "src", "style"],
        answer: "style"
    }
];

// vars to reference DOM elements
var viewHighscores = document.querySelector("#view-highscores");
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var optionsEl = document.querySelector("#options");
var questionsEl = document.querySelector("#questions");
var submitBtn = document.querySelector("#submit");
var nameEl = document.querySelector("#name");
var restartBtn = document.querySelector("#restart");
var introEl = document.querySelector("#intro");
var completeEl = document.querySelector("#completed-quiz");


// initial state of quiz
var currentQuestionIdx = 0;
// 10 seconds per question
var time = questions.length * 10;
var myTimer;

// function to start the game & hide intro
function quizStart() {
    myTimer = setInterval(tick, 1000);
    timerEl.textContent = time;
    introEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class", "hide");
    getQuestion();
}

// loop through question array & create list with buttons
function getQuestion() {
    var currentQuestion = questions[currentQuestionIdx];
    var titleEl = document.querySelector("#question-title");
    titleEl.textContent = currentQuestion.title;
    // clear out old question choices
    optionsEl.innerHTML = "";
    // loop through choices
    currentQuestion.choices.forEach(function(choice, i) {
        // create button for each choice
        var optionBtn = document.createElement("button");
        optionBtn.setAttribute("value", choice);
        optionBtn.textContent = i + 1 + ". " + choice;
        optionBtn.addEventListener("click", questionClick);
        // display on page
        optionsEl.appendChild(optionBtn);
    })
    
}
// check for right answer
// deduct time for wrong answer
// go to next question
function questionClick() {
    if(this.value !== questions[currentQuetionIdx].answer) {
        time -= 5;
        if(time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
    } else {

    }
}


// function to end quiz
function quizEnd() {
    // stops timer
    clearInterval(myTimer);
    completeEl.removeAttribute("class");
    // show final score
    var finalScore = document.querySelector("#final-score");
    finalScore.textContent = time;
    // hide questions
    questionsEl.setAttribute("class", "hide");

}

// function to end quiz if timer runs out
function tick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// save score and initials to localStorage 

// click event to start quiz
startBtn.addEventListener("click", quizStart);
