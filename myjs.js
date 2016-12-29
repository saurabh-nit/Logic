

var questions = [{
    question: "What is the population of Brazil?",
    choices: ["145 million", "199 million", "182 million", "205 million"],
    correctAnswer: 1
}, {
    question: "What is 27*14?",
    choices: ["485", "378", "408", "528"],
    correctAnswer: 2
}, {
    question: "What is the busiest train station in the world?",
    choices: ["Grand Central,New York", "Shibuya, Tokyo", "Beijing Central, China", "Gard du Nord, Paris"],
    correctAnswer: 1
}, {
    question: "What is the longest river?",
    choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    correctAnswer: 0
}, {
    question: "What is the busiest tube station in the London?",
    choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;


$(document).ready(function () 
  {

    // for display the first question
    displayCurrentQuestion();
    $(this).find("div#m.well").hide();
    $(this).find("div#r.well").hide();                                          

    // for going on next question by clicking next
    $(this).find("#b").on("click", function ()
      {
        if(!quizOver) 
          {
            value = $("input[type='radio']:checked").val();
            if (value == undefined) 
              {
                $(document).find("div#m.well").text("Please select an answer");
                $(document).find("div#m.well").show();
              } 
            else 
              {
                $(document).find("div#m.well").hide();
                if(value == questions[currentQuestion].correctAnswer) 
                  {
                    correctAnswers++;
                  }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) 
                 {
                   displayCurrentQuestion();
                 } 
                else 
                 {
                  displayScore();
                  $(document).find("#b").text("Play Again?"); //Button text converted to play again from next question
                  quizOver = true;
                 }
              }
        } 
        else 
         { 
            quizOver = false;
            $(document).find("#b").text("Next Question"); // quiz is over and clicked the next button (which now displays 'Play Again?
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
         }
     });

});

// This displays the current question AND the choices
function displayCurrentQuestion()
 {
   console.log("In display current Question");
   var question = questions[currentQuestion].question;
   var questionClass = $(document).find("div#q.well");
   var choiceList = $(document).find("div#c.well");
   var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) 
     {
       choice = questions[currentQuestion].choices[i];
       $('<li><input type="radio" value=' + i + 'name="dynradio"/>' + choice + '</li>').appendTo(choiceList);
     }
 }

function resetQuiz() 
 {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
 }

function displayScore() 
 {
    $(document).find("div#r.well").text("You have scored : " + correctAnswers + " out of : " + questions.length);
    $(document).find("div#r.well").show();
 }

function hideScore() 
 {
    $(document).find("div#r.well").hide();
 }