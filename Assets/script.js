//define arrays for questions
//order as [question, option_1,option_2, option_3, option_4, Ans]
var startBtn = document.querySelector("#startBtn");
var ansOptions = document.querySelector("#ansOptions");
var question = document.querySelector("#question");
var result = document.querySelector("#result");

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
var timeTaken = 0;
var timeTakenForQuestion = 0;
var questionIndex = 0;


function startTimer(){
    console.log("start Timer");
}
//start quiz loop through the questions
startBtn.addEventListener("click", function (event) {
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
    console.log("finished");
    questionIndex = 0;
}

function nextQuestion() {
    
    questionIndex++;
    if (questionIndex > questions.length - 1) {
        finalScore();
    }
    else {
        displayQuestion();
    }
}

function clearQuestion(){
    result.textContent = "";
    question.innerHTML ="";
    while (ansOptions.firstChild) {
        ansOptions.removeChild(ansOptions.firstChild);
      }
}

function verifyUserAnswer(event) {
    var userAnswer = event.target.parentElement;
    // console.log("target clicked = ", userAnswer);
    var indexOfAnswer = parseInt(userAnswer.getAttribute("id"));
    console.log("User choose : " + indexOfAnswer);


    var answerString = questions[questionIndex].answer;

    var ansArray = questions[questionIndex].choices;
    var ansIndux = parseInt(ansArray.indexOf(answerString));
    console.log("CorrectAns is : " + ansIndux);
    var resultOfQuestion = "";
    if (indexOfAnswer === ansIndux) {
        // console.log(indexOfAnswer + " : index: " + ansIndux + " :correct");
        resultOfQuestion = "Correct Answer"

    }
    else {
        // console.log(indexOfAnswer + " : index: " + ansIndux + " :wrong");
        resultOfQuestion = "Wrong Answer"
    }
    //show answer for two seconds
    result.textContent = resultOfQuestion;

    var secondsDelay2 = setInterval(function(){ 
        clearInterval(secondsDelay2);
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



//calculate score (in time) based on 1. answer

//wrong answer, 15 seconds added


//2. right answer and time took to answer
// within 5 sec, 10 points
//within 10 sec, 5 points
//more than 10 seconds, 1 point

//final score and save into local storage

