buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

var level = 0
var started = false;


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);



});

//nextsequence stores in the gamepattern comp play
function nextSequence() {

  level  = level + 1;
  $(".intro").text("level " + level);
  //When the user is triggered
  userClickedPattern.length = 0;

  var randomNumber = Math.floor(Math.random() * 4);

  randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);
  //Adds the game
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);



}


function playSound(variable) {

  $("#" + variable).ready(function() {

    var audio = new Audio("sounds/" + variable + ".mp3");
    audio.play();
  });

}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {

    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

$(document).keydown(function(event) {

//if the game hasn't started then start it
  if(started == false) {

    nextSequence();
    $(".intro").text("level " + level);
    started = true;
  }

});

function checkAnswer(currentLevel) {

//if the user matches the gamepattern
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Success");

//checks to see if the game array is the same length as the user array
    if(gamePattern.length === userClickedPattern.length) {

          setTimeout(function() {

              nextSequence();
          }, 1000);
    }
  } else {

    console.log("wrong");

      var audio = new Audio("sounds/youfailed.m4a");
      audio.play();

      $("body").addClass("game-over");

      setTimeout(function() {

        $("body").removeClass("game-over");
      }, 300)

      $("h1").text("You Failed! Kenechukwu says press any key to restart");

//once you press a key this triggers this function first.
      startOver();


  }
}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}


//$("h1").text("Level 0");
//Shorter way of doing this if else statement code
// $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
// var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
// audio.play();
