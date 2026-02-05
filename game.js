// --------------------------CONSTANTS---------------------------------------------
const BUTTON_COLORS = ["red", "blue", "green", "yellow"];
const BUTTON_FLASH_DURATION = 100;
const NEXT_SEQUENCE_DELAY = 1000;
const WRONG_ANIMATION_DURATION = 200;
const PRESS_ANIMATION_DURATION = 100;
const START_MESSAGE = "Press Any Key to Start";
const GAME_OVER_MESSAGE = "Game Over, Press Any Key To Restart";

// --------------------------VARIABLES---------------------------------------------
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$("#level-title").text(START_MESSAGE);

// ------------------------------ MAIN CODE ----------------------------------------

// USER CLICK PATTERN
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// --------------FUNCTIONS---------------------------------------------------------

// START OVER FUNCTION
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// CHECK ANSWER FUNCTION
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, NEXT_SEQUENCE_DELAY);
      userClickedPattern = [];
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, WRONG_ANIMATION_DURATION);
    $("h1").text(GAME_OVER_MESSAGE);
    startOver();
  }
}

// NEXT SEQUENCE FUNCTION
function nextSequence() {
  level = level + 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * BUTTON_COLORS.length);
  var randomChosenColor = BUTTON_COLORS[randomNumber];
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(BUTTON_FLASH_DURATION).fadeOut(BUTTON_FLASH_DURATION).fadeIn(BUTTON_FLASH_DURATION);
}

// COLORS SOUND FUNCTION
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// CLICK ANIMATION FUNCTION
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, PRESS_ANIMATION_DURATION);
}

// keydown handler
$("html").keydown(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});
