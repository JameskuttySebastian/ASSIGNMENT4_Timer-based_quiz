


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

//declaring global variables
var timeRemaining = 75;
var questionIndex = 0;




//Hide all the questions and messages

function hideAll() {
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
hideAll();

//function result to user
function showAnswer(msg){
    //showing the result section
    for (var i = 0; i < result.length; i++) {
        result[i].style.display = "block";
    };

    rslt.innerHTML=msg;
    // var d = new Date();

    var secondsDelay2 = setInterval(function () {                    
        //hiding after showing result for 2 seconds
        clearInterval(secondsDelay2);
        clearResult();
        hideQuestion();        
        nextQuestion();
    }, 2000);
    
    function clearResult(){
        for (var i = 0; i < result.length; i++) {
            result[i].style.display = "none";     
        }
    }
    
  
};

//hide question
function hideQuestion(){
    var question = questionArray[questionIndex];
    for (var i = 0; i < question.length; i++) {
        question[i].style.display = "none";
    };
}


//save the result
function saveResult(){
    console.log("save result");
}

function nextQuestion(){
    questionIndex++;
    if(questionIndex<questionArray.length){
        var question = questionArray[questionIndex];
        console.log(question);
        for (var i = 0; i < question.length; i++) {
            question[i].style.display = "block";


            // addEventListenerToButtons()
        };
    }
    else{
        saveResult();
    }
}

// function addEventListenerToButtons() {
//     document.ready(function() {
//         ansButtonList[questionIndex].addEventListener("click", function(event){
//     })
// }

// start the quiz
startButton.addEventListener("click", function (event) {

    //  hide initial screen
    for (var i = 0; i < startMsg.length; i++) {
        startMsg[i].style.display = "none";
    };
    // hide start question button

    for (var i = 0; i < startBtn.length; i++) {
        startBtn[i].style.display = "none";
    };

    // show first question
    var question = questionArray[questionIndex];
    console.log(question);
    for (var i = 0; i < question.length; i++) {
        question[i].style.display = "block";
    };

});

ansButtonList[questionIndex].addEventListener("click", function(event){
    var clickEvent = event.target;
    console.log(event); 
    if(clickEvent.matches("button")){
        // console.log("button");
        if(clickEvent.classList.contains("correct")){
            showAnswer("correct");

        }
        else{
            showAnswer("wrong");
            timeRemaining = timeRemaining - 15;
        }
    }
    else {
        alert("click the answer buttons!..")
    }
})


