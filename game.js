   // --------------------------VARIABLES---------------------------------------------
   var gamePattern = [];
   var buttonColors = ["red", "blue", "green", "yellow"];
   var userClickedPattern = [];
   var level = 0;
   var started = false;

   // ------------------------------ MAIN CODE ----------------------------------------

   // USER CLICK PATTERN
   $(".btn").click(function() {

     var userChosenColor = $(this).attr("id");

     userClickedPattern.push(userChosenColor);

     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer((userClickedPattern.length - 1));
   });





   // --------------FUNCTIONS---------------------------------------------------------

   // START OVER FUNCTION
   function startOver() {
     started = false;
     level = 0;
     gamePattern = [];
   }


   // CHECK ANSWER FUNCTION
   function checkAnswer(currentLevel) {
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       console.log("sucsess");
       if (gamePattern.length === userClickedPattern.length) {
         setTimeout(function() {
           nextSequence();
         }, 1000)
         userClickedPattern = [];
       }
     } else {
       var wrong = new Audio("sounds/wrong.mp3");
       wrong.play();
       $("body").addClass("game-over");
       setTimeout(function() {
         $("body").removeClass("game-over")
       }, 200);
       $("h1").text("Game Over, Press Any Key To Restart");
       startOver();
       console.log("wrong");
     }
   }


   // NEXT SEQUENCE FUNCTION
   function nextSequence() {
     level = level + 1;
     $("h1").text("Level " + level);
     var randomNumber = Math.floor(Math.random() * 4);

     var randomChosenColor = buttonColors[randomNumber];
     playSound(randomChosenColor);
     gamePattern.push(randomChosenColor);


     $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   }



   //   COLORS SOUND FUNCTION
   function playSound(name) {
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
   }



   // CLICK ANIMATION FUNCTION
   function animatePress(currentColor) {
     $("#" + currentColor).addClass("pressed");
     setTimeout(function() {
       $("#" + currentColor).removeClass("pressed")
     }, 100)
   }
   // keydown handler
   $("html").keydown(function(event) {
     if (!started) {
       $("h1").text("Level " + level);
       nextSequence();
       started = true;
     }
   })
