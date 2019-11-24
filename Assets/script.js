


//questions
var startMsg = document.querySelectorAll(".startMsg");
var question1 = document.querySelectorAll(".question1");
var question2 = document.querySelectorAll(".question2");
var question3 = document.querySelectorAll(".question3");
var question4 = document.querySelectorAll(".question4");
var question5 = document.querySelectorAll(".question5");
var question6 = document.querySelectorAll(".question6");

var questionArray = [question1, question2, question3, question4, question5, question6];

//buttons
var startButton = document.querySelector("#startButton");
var viewHighScore = document.querySelector("#viewHighScoreButton");
var saveBtn = document.querySelector("#saveButton");

//Timers
var timerSection = document.querySelector("#timerSection");

// answer buttons
var ansButtonList = document.querySelectorAll("ul");

//Other sections
var startBtn = document.querySelectorAll(".startBtn");
var viewHighScore = document.querySelectorAll(".viewHighScore");
var warning = document.querySelectorAll(".warning");
var result = document.querySelectorAll(".result");
var saveToMemory = document.querySelectorAll(".saveToMemory");

//message spans

var rslt = document.querySelector("#rslt");
var score = document.querySelector("#score");

//declaring global variables
var timeRemaining = 75;
var questionIndex = 0;




//Hide all the questions and messages

function hideAllSections() {
    for (var j = 0; j < questionArray.length; j++) {
        for (var i = 0; i < questionArray[j].length; i++) {
            questionArray[j][i].style.display = "none";
        }
    }

    // Hiding warning section
    for (var i = 0; i < warning.length; i++) {
        warning[i].style.display = "none";
    }
    // Hiding result section
    for (var i = 0; i < result.length; i++) {
        result[i].style.display = "none";
    }
    // Hiding show high score section
    for (var i = 0; i < viewHighScore.length; i++) {
        viewHighScore[i].style.display = "none";
    }

    // Hiding saveToMemory section
    for (var i = 0; i < saveToMemory.length; i++) {
        saveToMemory[i].style.display = "none";
    }
}

//Hiding all the questions for first screen
hideAllSections();



function showInitialScreen() {
    for (var i = 0; i < startMsg.length; i++) {
        startMsg[i].style.display = "block";
    };
    // hide start question button

    for (var i = 0; i < startBtn.length; i++) {
        startBtn[i].style.display = "block";
    };
}

function hideInitialScreen() {
    for (var i = 0; i < startMsg.length; i++) {
        startMsg[i].style.display = "none";
    };
    // hide start question button

    for (var i = 0; i < startBtn.length; i++) {
        startBtn[i].style.display = "none";
    };
}

function hideResultSection() {
    for (var i = 0; i < result.length; i++) {
        result[i].style.display = "none";
    }
}

function showResultSection() {
    for (var i = 0; i < result.length; i++) {
        result[i].style.display = "block";
    }
}
//hide question
function hideQuestion() {
    var question = questionArray[questionIndex];
    for (var i = 0; i < question.length; i++) {
        question[i].style.display = "none";
    };
}
//show question
function showQuestion() {
    var question = questionArray[questionIndex];
    for (var i = 0; i < question.length; i++) {
        question[i].style.display = "block";
    };
}
//show save to memory section
function showSaveToMemorySection(){
    for (var i = 0; i < saveToMemory.length; i++) {
        saveToMemory[i].style.display = "block";
    }
}
//hide save to memory section
function hideSaveToMemorySection(){
    for (var i = 0; i < saveToMemory.length; i++) {
        saveToMemory[i].style.display = "none";
    }
}

//save the result
function saveResult() {
    // console.log("save result");
    showInitialScreen();
    startButton.textContent = "Retake Quiz";
    showSaveToMemorySection();
    score.textContent = timeRemaining;
    var scoreToSave = timeRemaining;
    timeRemaining = 75;
    questionIndex = 0;
}

function nextQuestion() {
        showQuestion();
        addEventListenerToButtons(questionIndex);
}

var quizTimer = setInterval(function () {
    timerSection.textContent = timeRemaining;
    timeRemaining--;
}, 1000);


function programExecution() {
    if (questionIndex < questionArray.length && timeRemaining > 0) {
        // show first question
        nextQuestion();
    }   
    //stop timer when time remaining is 0
    if (timeRemaining <= 0) {
        clearInterval(quizTimer);
        hideQuestion();
        // show warning section
        for (var i = 0; i < warning.length; i++) {
            warning[i].style.display = "block";
        }
        hideResult();
        saveResult();
    }
    
    // stop timer, when all the question finished
    if (questionIndex >= questionArray.length) {
        clearInterval(quizTimer);
        saveResult();
    }
}



// start the quiz
startButton.addEventListener("click", function (event) {
    //  hide initial screen and button
    hideInitialScreen();
    hideSaveToMemorySection();
    quizTimer;
    programExecution();
});

//function result to user
function showAnswer(msg) {
    //showing the result section
    showResultSection();
    rslt.innerHTML = msg;
    var secondsDelay2 = setInterval(function () {
        //hiding after showing result for 2 seconds
        clearInterval(secondsDelay2);
        hideResultSection();
        hideQuestion();
        questionIndex++;
        programExecution();
    }, 2000);

};

function checkAnswers(clickEvent) {
    // console.log("button");
    if (clickEvent.classList.contains("correct")) {
        showAnswer("correct");
    }
    else {
        showAnswer("wrong");
        timeRemaining = timeRemaining - 15;
    }
}


function addEventListenerToButtons(index) {
    ansButtonList[index].addEventListener("click", function (event) {
        var clickEvent = event.target;
        event.stopPropagation();
        //  console.log(clickEvent);     
        if (clickEvent.matches("button")) {
            //disabled buttin to prevent double click
            clickEvent.disabled = true;

            // This section is for removing the different button clicks for same question
            // var lists = ansButtonList[index].childNodes;

            // for (var i = 0; i < lists.length; i++) {
            //     var elementList = lists[i].childNodes
            //     console.log(elementList);
            //     for (var j = 0; j < elementList.length; j++) {
            //         //if (elementList[j].hasChildNodes()) {
            //             // var buttonElements = elementList[j].childNodes;
            //             // console.log(buttonElements);
            //         //}
            //     }
            // }


            //moved out in to a function

            checkAnswers(clickEvent);
            clickEvent.disabled = false;
        }
        else {
            alert("click the answer buttons!..")
        }
    })
}

