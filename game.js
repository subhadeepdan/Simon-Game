var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

var started=false;
var level = 1;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    $("#level-title").text("Level "+level);
    level++;
}

function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(event) {
    if(!started)
        nextSequence();
    started=true;
})

