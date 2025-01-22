// Array containing the possible colors of the buttons.
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the sequence of colors for the game and the user's chosen colors.
var gamePattern = [];
var userClickedPattern = [];

// Variables to track the start of the game and the current level.
var started = false;
var level = 0;

// Event listener to start or restart the game when the button is clicked.
$("#start-btn").on("click", function () {
  // Reset the game if it has already started.
  if (!started || gamePattern.length > 0) {
    startOver();
  }
  // Display the current level.
  $("#level-title").text("Level " + level);
  // Generate the next color in the sequence.
  nextSequence();
  // Update the status to indicate that the game has started.
  started = true;
});

// Event listener for button clicks.
$(".btn").on("click touchstart", function () {
  // Get the color of the clicked button.
  var userChosenColour = $(this).attr("id");
  // Add the chosen color to the user's sequence array.
  userClickedPattern.push(userChosenColour);

  // Play the sound associated with the chosen color.
  playSound(userChosenColour);
  // Animate the pressed button.
  animatePress(userChosenColour);

  // Check the user's sequence against the game's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's sequence against the game's sequence.
function checkAnswer(currentLevel) {
  // If the current color in the user's sequence matches the game's sequence:
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // And if the entire user's sequence matches the game's sequence:
    if (userClickedPattern.length === gamePattern.length) {
      // Wait for 1 second, then generate the next color in the sequence.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // If there's a mismatch in the sequence, play an error sound.
    playSound("wrong");
    // Add a "game-over" visual effect to the page.
    $("body").addClass("game-over");
    // Display the game over message.
    $("#level-title").text("Game Over! Press Start to Restart");

    // Remove the "game-over" effect after 200ms.
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Enable restart by clicking the button again.
    started = false;
  }
}

// Function to generate the next color in the game's sequence.
function nextSequence() {
  // Reset the user's sequence array.
  userClickedPattern = [];
  // Increment the game level.
  level++;
  // Update the displayed level.
  $("#level-title").text("Level " + level);
  // Generate a random number between 0 and 3.
  var randomNumber = Math.floor(Math.random() * 4);
  // Choose a random color from the buttonColors array using the randomNumber.
  var randomChosenColour = buttonColours[randomNumber];
  // Add the chosen color to the game's sequence array.
  gamePattern.push(randomChosenColour);

  // Animate the chosen button with a fade effect.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the sound associated with the chosen color.
  playSound(randomChosenColour);
}

// Function to animate the button when pressed.
function animatePress(currentColor) {
  // Add the "pressed" visual effect to the button.
  $("#" + currentColor).addClass("pressed");
  // Remove the "pressed" effect after 100ms.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play sounds.
function playSound(name) {
  // Load and play the audio file associated with the given name.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset the game.
function startOver() {
  // Reset the level and the game's sequence array.
  level = 0;
  gamePattern = [];
  // Update the status to indicate that the game hasn't started.
  started = false;
}
