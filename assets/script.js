// ===================================================
// VARIABLES
// ===================================================

// array of questions for quiz
var questions = [
    { q: "This will be the first question?", 
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    correctAnswer: "d"},
    { q: "This will be the second question?", 
    a: "10",
    b: "11",
    c: "12",
    d: "13",
    correctAnswer: "a"},
    { q: "This will be the third question?",
    a: "ab",
    b: "bc",
    c: "cd",
    d: "de",
    correctAnswer: "b"},
    { q: "This will be the fourth question?",
    a: "first",
    b: "second",
    c: "third",
    d: "fourth",
    correctAnswer: "b"},
    { q: "This will be the fifth question?",
    a: "dog",
    b: "cat",
    c: "bird",
    d: "frog",
    correctAnswer: "c"},
];

// variables from index.html
var timer = document.querySelector("#timer");
var jumbo = document.querySelector("#jumbotron");
var startBtn = document.querySelector("#start-btn");

//variables from quiz box
var quizBox = document.getElementById("quiz-box");
var displayQuest = document.getElementById("questions");
var choiceA = document.getElementById("a");
var choiceB = document.getElementById("b");
var choiceC = document.getElementById("c");
var choiceD = document.getElementById("d");
var nextBtn = document.getElementById("next");
var submitQuizBtn = document.getElementById("submit-quiz");

// variables from initials box
var initialsBox = document.getElementById("initials-box");
var yourScore = document.getElementById("your-score");
var initialInput = document.getElementById("enter-initials");
var initialSubmitBtn = document.getElementById("submit-initials");

// variables from highscores.html
var highScoresContainer = document.getElementById("results");
var highScores = document.querySelector("highscores");
var userScores = document.querySelector("user-scores");
var goBackBtn = document.querySelector("go-back");

//JS created variables
// this variable sets the timer to 100 seconds - giving 20 seconds per question
var secondsLeft = 100;
//current question that will display
var currentQuestion = 0;
//keep track of score
var score = 0;
//count number of answers inputed
var counter = 0;
//used to track users answers
var userAnswer;
//used to keep track of questions 
var index = 0;

// ===================================================
// FUNCTIONS
// ===================================================

function startQuiz() {
    //this function will display quiz box
    function showQuizBox() {
        if (jumbo.style.display === "block" && quizBox.style.display === "none") {
            jumbo.style.display = "none";
            quizBox.style.display = "block";
        }
        displayQuestions();
    };
    //call function
    showQuizBox();

    // decrease the seconds while displaying to user how many seconds are left
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft + " seconds left"

        // once timer gets to zero the timer is cleared & a message will be displayed
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            sendMessage();
            showInitialBox();
        };

        // message displayed once timer ends
        function sendMessage() {
            timer.textContent = "Your time is up!";
        };
    }, 1000) 
}

function displayQuestions() {
    displayQuest.textContent = questions[index].q;
    choiceA.textContent = questions[index].a;
    choiceB.textContent = questions[index].b;
    choiceC.textContent = questions[index].c;
    choiceD.textContent = questions[index].d;
};

function nextQuestion() {
    index++;
    if (index === questions.length - 1) {
        nextBtn.style.display = "none";
        submitQuizBtn.style.display = "block";
    }
    displayQuestions();
    checkAnswer();
}

// i will use this function to check user answer to actual answer
function checkAnswer() {
    console.log("User Answer: " + userAnswer);
    console.log("Correct Answer: " + questions[index].correctAnswer);

    if (userAnswer === questions[index].correctAnswer) {
        counter++;
        score += 100;
    } else {
        secondsLeft -= 10;
    }
    console.log("Counter: " + counter);
    console.log("Score: " + score);

    yourScore = score;
    console.log(yourScore);
}

console.log("it works" + yourScore);

//this function will display initial box
function showInitialBox() {
    checkAnswer();

    if (jumbo.style.display === "none" && quizBox.style.display === "block" && initialsBox.style.display === "none") {
        jumbo.style.display = "none";
        quizBox.style.display = "none";
        initialsBox.style.display = "block"
    } 
}

// this function saves the data to the local storage
function saveData(event) {
    event.preventDefault();
    // var key = ""; this will be initials to get later
    // var value = ""; this will be the score
    // localStorage.setItem(key, value);
};

// ===================================================
// EVENT LISTENERS
// ====================================================

//timer will start & quiz will display when press start button
startBtn.addEventListener("click", startQuiz);

//when press submit quiz button it will display initial box
submitQuizBtn.addEventListener("click", showInitialBox)

//during the quiz, when next button is clicked it will go to next question
nextBtn.addEventListener("click", nextQuestion);


//listens for multiple choice options
choiceA.addEventListener("click", function() {
    userAnswer = "a";
})
choiceB.addEventListener("click", function() {
    userAnswer = "b";
})
choiceC.addEventListener("click", function() {
    userAnswer = "c";
})
choiceD.addEventListener("click", function() {
    userAnswer = "d";
})

// ===================================================