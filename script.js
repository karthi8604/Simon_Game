var started = false;
var level = 0;
var gameColours = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];

$(document).keydown(function(){
    if(!started){
        nextSquence();
        started = true;
    }
});

function nextSquence(){
    userClickedPattern = [];
    $("h1").text("Level "+level++);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = gameColours[randomNumber];
    gamePattern.push(randomColour);
    $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
    // console.log(randomNumber);
}

$(".btn").click(function(){
    var clickedButton = this.id;
    userClickedPattern.push(clickedButton);
    animatePress(clickedButton);
    playSound(clickedButton);
    checkAnswer(userClickedPattern.length-1);
    // console.log(clickedButton);
});

function checkAnswer(value){
    if(userClickedPattern[value]===gamePattern[value]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSquence();
            },1000);
            
        }
    } else{
        $("h1").text("Game Over, Press any key to Restart!");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        gameOver();
    }
}

function playSound(name){
    var aud = new Audio("./sounds/"+name+".mp3");
    aud.play();
}

function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function (){
        $("#"+name).removeClass("pressed");
    },100);
}

function gameOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}