//Get current year
let year = getYear()
function getYear() {
	let date = new Date();
	return date.getFullYear()
}
$(".copyright").append(" " + year);


//Game Variables
let buttonColours = ["red", "blue", "green", "yellow"];
var audioObj = new Audio();
let gamePattern = [];
let userClickedPattern = [];
let gameHasStarted = false;
let counter = 0;
let level = 0;



function nextSequence() {
	level++;
	$("h1").text("Level " +  level)
	let randomChosenColour = whatColor(Math.floor(Math.random() * 4));
	animateColor(randomChosenColour); 
	playSound(randomChosenColour);
	gamePattern.push(randomChosenColour);
}

function whatColor(num) {
	switch(num) {
		case 0:
			return "red";
			break;
		case 1:
			return "yellow";
			break;
		case 2:
			return "green";
			break;
		case 3:
			return "blue";
			break;
		default:
			break;
	}
}

function playSound(color) {
	audioObj.src = "./sounds/" + color  + ".mp3";
	audioObj.play();
}

function animateUserInput(color) {
	$("#" + color).toggleClass("pressed")
	setTimeout(() => {
		$("#" + color).toggleClass("pressed");
	}, 100);
}

function animateColor(color) {
	$("#" + color).fadeOut(250).fadeIn(250);	
	gamePattern.push(color);
}

function checkAnswer(color) {
	if (color === gamePattern[counter]) {
		counter++;
		return true;
	} else {
		return false;
	}
}

function checkUserInputs() {
	if (counter === gamePattern.length-1) {
		return true
	} else {
		return false;
	}
}

function checkGame(color) {
	let userResponse = checkAnswer(color);
	let sequenceEnded = checkUserInputs();
	if (sequenceEnded && userResponse) {
		setTimeout(function () {
			nextSequence();
		}, 1000);
	}
}

// $(".buttons").keypress((e) => {
// 	if (gameHasStarted) {
// 		let userClickedColor = e.target.id;
// 		animateColor(userClickedColor)
// 	}
// })

$(".buttons").click(function(e)  {
	if (gameHasStarted) {
		let userClickedColor = e.target.id;
		playSound(userClickedColor);
		animateUserInput(userClickedColor);
		checkGame(userClickedColor);
		
	}
});

function gameStart() {
	setTimeout(() => {
		$("h1").text("Use Q, W, A, S or mouse");
		nextSequence();
		gameHasStarted = true;
	}, 500);
}

function gameOver() {

}

$(document).keypress(() => {
	if (!gameHasStarted) {
		gameStart();
	}
});