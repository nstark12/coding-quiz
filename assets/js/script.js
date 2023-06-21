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
var introEl = document.querySelector("#intro");
var completeEl = document.querySelector("#completed-quiz");
var gradeEl = document.querySelector("#grade");
var scoreEl = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");


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
    currentQuestion.options.forEach(function(option, i) {
        // create button for each choice
        var optionBtn = document.createElement("button");
        optionBtn.setAttribute("value", option);
        optionBtn.textContent = option;
        optionBtn.addEventListener("click", questionClick);
        // display on page
        optionsEl.appendChild(optionBtn);
    })
    
}
// check for right answer
// deduct time for wrong answer
// go to next question
function questionClick() {
    if(this.value !== questions[currentQuestionIdx].answer) {
        time -= 5;
        if(time < 0) {
            time = 0;
        }
        // show new time
        timerEl.textContent = time;
        gradeEl.textContent = "Incorrect!";
    } else { 
        gradeEl.textContent = "Correct!";
    }
    // time help on page to only show briefly then disappear
    gradeEl.removeAttribute("class");
    setTimeout(function() {
        gradeEl.setAttribute("class", "hide");
    }, 2000);

    // go to next question
    currentQuestionIdx++;

    // if out of questions, end quiz
    if (currentQuestionIdx === questions.length) {
        quizEnd();
    } else {
        getQuestion();
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
    gradeEl.setAttribute("class", "hide");

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
function saveScore() {
    // get value of input
    var name = nameEl.value.trim();
    if (name !== "") {
        // get from localStorage if empty, or if no values in localStorage set to empty array
        var scores = JSON.parse(localStorage.getItem("scores")) || [];

        var newScore = {
            score: time,
            name: name
        };
        // save to localStorage
        scores.push(newScore);
        localStorage.setItem("scores", JSON.stringify(scores));
    }
}

// function to show highscores screen
function showScores() {
    introEl.setAttribute("class", "hide");
    questionsEl.setAttribute("class", "hide");
    completeEl.setAttribute("class", "hide");
    scoreEl.removeAttribute("class");
}

// function to retrieve scores and rank from localStorage
function printScores() {
   var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    scores.forEach(function(score) {
        var liEl = document.createElement("li");
        liEl.textContent = score.name + " - " + score.score;
        var olEl = document.querySelector("#olEl");
        olEl.appendChild(liEl);
    });
}

// clear old scores
function clearScores() {
    localStorage.removeItem("scores");
    location.reload();
} clearBtn.addEventListener("click", clearScores);


// click event to start quiz
startBtn.addEventListener("click", quizStart);

// click event to submit name
submitBtn.addEventListener("click", saveScore);

// click event to show highscore screen
viewHighscores.addEventListener("click", showScores);

// runs function
printScores();