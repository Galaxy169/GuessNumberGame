"use strict";

// Define Body
let body = document.body.style;

// Display Message Variables
let startMessage = "Start guessing...";
let validNumber = "Oops...It is not a number";
let winMessage = "You win";
let closeNumber = "You are close";
let lowNumber = "You entered a lower number";
let highNumber = "You entered a higher number";
let gameOver = "You lost the game!";

//Initilize the game
let score = 20;
let highScore = 0;
let isPlaying = true; // track if the game is active

// Display Messages, It takes two args: element/class/id name for dom and messages
const displayMessages = (element, message) => {
  return (document.querySelector(element).textContent = message);
};

// Generate Random Numbers
let randomNumbers = () => {
  return Math.trunc(Math.random() * (20 - 1 + 1) + 1);
};

// Assign random number
let randNum = randomNumbers();

// Generate a random threshold between 1-5

let randomthreshold = () => {
  return Math.trunc(Math.random() * 5) + 1;
};
let threshold = randomthreshold();

// Reset Function
const reset = () => {
  score = 20;
  displayMessages(".score", score);
  body.backgroundColor = "#222";
  document.querySelector(".guess").value = "";
  displayMessages(".message", startMessage);
  displayMessages(".number", "?");
  randNum = randomNumbers();
  threshold = randomthreshold();
  isPlaying = true;
};

// Add an event listener to the again button
document.querySelector(".again").addEventListener("click", () => {
  reset();
});

//Add an event listener to the check button
document.querySelector(".check").addEventListener("click", () => {
  // Store input value in a inputValue variable.
  // if (!gameActive) return;
  let inputValue = Number(document.querySelector(".guess").value);

  // Calculate and store the difference between random number and input number
  let difference = Math.abs(randNum - inputValue);

  // If the entered number is zero
  if (!inputValue) {
    displayMessages(".message", validNumber);

    // when player wins. If the entered number is === to random number
  } else if (randNum === inputValue) {
    // Check if user is playing the game
    if (isPlaying) {
      score++;
      displayMessages(".score", score);
      displayMessages(".message", winMessage);
      // randNum = randomNumbers();
      displayMessages(".number", randNum);

      // Change Body Color.
      body.backgroundColor = "#0b9a25";
      if (score > highScore) {
        highScore = score;
        displayMessages(".highscore", highScore);
      }
    }
    isPlaying = false; // Set to false because user is no longer playing the game.

    // Check if the difference is close to the random threshold max +5 and -5
  } else if (difference <= threshold) {
    // If score is not zero
    if (score > 1) {
      displayMessages(".message", closeNumber);

      // Decrement the score by 1
      score--;
      displayMessages(".score", score);

      // If the score is zero
    } else {
      displayMessages(".message", gameOver);
      body.backgroundColor = "darkred";
      displayMessages(".number", randNum);
    }

    // Check If the input number is greater than the random number
  } else if (inputValue != randNum) {
    // Check if the score is not zero
    if (score > 1) {
      //Check if the number is higher than random number then print highNumber otherwise print lowNumber
      displayMessages(".message", `${inputValue > randNum ? highNumber : lowNumber}`);

      // Decrement the score by 1
      score--;
      displayMessages(".score", score);

      // If the score is zero
    } else {
      displayMessages(".message", gameOver);
      displayMessages(".number", randNum);
      body.backgroundColor = "darkred";
    }
    // Check If the input number is less than the random number
  }
});
