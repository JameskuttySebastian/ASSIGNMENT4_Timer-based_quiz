//define arrays for questions
//order as [question, option_1,option_2, option_3, option_4, Ans]
var startBtn = document.querySelector("#startBtn");
var viewHighScore = document.querySelector("#viewHighScore");
var ansOptions = document.querySelector("#ansOptions");
var question = document.querySelector("#question");
var result = document.querySelector("#result");
// var totalScore = document.querySelector("#totalScore");
var timer = document.querySelector("#timer");
var warning = document.querySelector("#warning");



var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
];

//variable to save correct answer count, remaining time
// var timeTaken = 0;
var timeTakenForQuestion = 0;
var questionIndex = 0;
var timeTaken = 75;
// var score = 0;


var timeElapsed = "";
result.parentElement.style.display ="none";
warning.style.display ="none";

function startTimer() {
    timeElapsed = setInterval(function () {
        timeTaken = timeTaken - 1;
        timer.textContent = timeTaken;
        if(timeTaken<=0){
            clearQuestion()
            timeTaken = 0;
            timer.textContent = timeTaken;
            
            finalScore() ;
            warning.style.display ="block";
            warning.innerHTML = "The time is over!.......";
            clearInterval(timeElapsed);
        }
    }, 1000);
}
//start quiz loop through the questions
startBtn.addEventListener("click", function (event) {
    startBtn.style.display ="none";
    viewHighScore.style.display ="none";
    timeTaken = 75;
    // score = 0;
    // totalScore.textContent = score;
    startTimer();
    displayQuestion();
});


function displayQuestion() {
    question.innerHTML = questions[questionIndex].title;
    ansOptions.value = "";
    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var choice = questions[questionIndex].choices[i];
        var li = document.createElement("li");
        li.setAttribute("id", i);
        var button = document.createElement("button");
        button.textContent = choice;
        li.appendChild(button);
        ansOptions.appendChild(li);
    }

}

function finalScore() {
    // console.log("finished");

    //changing button caption
    startBtn.style.display ="block";
    startBtn.textContent = "Go Back to Quiz";
    viewHighScore.style.display ="block";
    questionIndex = 0;    
}

function nextQuestion() {

    questionIndex++;
    if (questionIndex > questions.length - 1) {
        clearInterval(timeElapsed);
        finalScore();
    }
    else {
        displayQuestion();
    }
}

function clearQuestion() {
    result.textContent = "";
    question.innerHTML = "";
    while (ansOptions.firstChild) {
        ansOptions.removeChild(ansOptions.firstChild);
    }
}

function verifyUserAnswer(event) {
    var userAnswer = event.target.parentElement;
    // console.log("target clicked = ", userAnswer);
    var indexOfAnswer = parseInt(userAnswer.getAttribute("id"));
    // console.log("User choose : " + indexOfAnswer);


    var answerString = questions[questionIndex].answer;

    var ansArray = questions[questionIndex].choices;
    var ansIndux = parseInt(ansArray.indexOf(answerString));
    // console.log("CorrectAns is : " + ansIndux);
    var resultOfQuestion = "";
    if (indexOfAnswer === ansIndux) {
        // console.log(indexOfAnswer + " : index: " + ansIndux + " :correct");
        resultOfQuestion = "correct"
        // score = score + 10;
    }
    else {
        // console.log(indexOfAnswer + " : index: " + ansIndux + " :wrong");
        resultOfQuestion = "wrong"
        timeTaken = timeTaken - 15;
        // score = score - 5;
    }
    //show answer for two seconds
    result.parentElement.style.display ="block";
    result.textContent = resultOfQuestion;
    // totalScore.textContent = score;

    var secondsDelay2 = setInterval(function () {
        clearInterval(secondsDelay2);
        result.parentElement.style.display ="none";
        clearQuestion();
        nextQuestion();
    }, 2000);
}

//User clicks answer
ansOptions.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(event.target);

    if (event.target.matches("button")) {
        verifyUserAnswer(event);
    }
});