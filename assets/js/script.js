// vars to reference DOM elements
var viewHighscores = document.querySelector("#view-highscores");
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var optionsEl = document.querySelector("#options");
var questionsEl = document.querySelectory("#questions");
var submitBtn = document.querySelector("#submit");
var nameEl = document.querySelector("#name");
var restartBtn = document.querySelector("#restart");

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


// initial state of quiz


// function to start the game & hide intro


// loop through question array & create list with buttons


// check for right answer

// deduct time for wrong answer

// go to next question

// function to end quiz
    // stop timer
    // show final schore

// function to end quiz if timer runs out

// save score and initials to localStorage 


