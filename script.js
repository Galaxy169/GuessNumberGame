"use strict";

// Define Variables
let message = document.querySelector(".message");
let gameScore = document.querySelector(".score");
let highscore = document.querySelector(".highscore");
let body = document.body.style;
let startMessage = "Start guessing...";
let validNumber = "Oops...It is not a number";
let winMessage = "You win";
let closeNumber = "You are close";
let lowNumber = "You entered a lower number";
let highNumber = "You entered a higher number";
let gameOver = "You lost the game!";
//Define the score
let score = 20;
let highScore = 0;

// Generate Random Numbers
let randomNumbers = () => {
  return Math.trunc(Math.random() * (20 - 1 + 1) + 1);
};
// Assign random number
let randNum = randomNumbers();
// Print the number to the "number" element
//For debug, move it later
document.querySelector(".number").textContent = randNum;

// Reset Function
const reset = () => {
  //   score = 20;
  body.backgroundColor = "#222";
  document.querySelector(".guess").value = "";
  message.textContent = startMessage;
  randNum = randomNumbers();
  //For debug, remove it later
  document.querySelector(".number").textContent = randNum;
};

// Add an event listener to the again button

document.querySelector(".again").addEventListener("click", () => {
  reset();
});

//Add an event listener to the check button
document.querySelector(".check").addEventListener("click", () => {
  // Store input value in a inputValue variable.
  let inputValue = Number(document.querySelector(".guess").value);

  // Calculate and store the difference between random number and input number
  let diffrence = Math.abs(randNum - inputValue);

  // If the entered number is zero
  if (!inputValue) {
    message.textContent = validNumber;
    // when player wins. If the entered number is === to random number
  } else if (randNum === inputValue) {
    score++;
    gameScore.textContent = score;
    message.textContent = winMessage;
    randNum = randomNumbers();

    // Change Body Color.
    body.backgroundColor = "#0b9a25";
    if (score > highScore) {
      highScore = score;
      highscore.textContent = highScore;
    }
    // Check if the input number is close to the random number +5 and -5
  } else if (diffrence <= 5) {
    // If score is not zero
    if (score > 1) {
      message.textContent = closeNumber;
      // Decrement the score by 1
      score--;
      gameScore.textContent = score;
      // If the score is zero
    } else {
      message.textContent = gameOver;
      body.backgroundColor = "darkred";
    }
    // Check If the input number is greater than the random number
  } else if (inputValue != randNum) {
    // Check if the score is not zero
    if (score > 1) {
      //Check if the number is higher than random number then print highNumber otherwise print lowNumber
      message.textContent = `${inputValue > randNum ? highNumber : lowNumber}`
      // Decrement the score by 1
      score--;
      gameScore.textContent = score;
      // If the score is zero
    } else {
      message.textContent = gameOver;
      body.backgroundColor = "darkred";
    }
    // Check If the input number is less than the random number
   }
  // else if (inputValue < randNum) {
  //   // Check if the score is not zero
  //   if (score > 1) {
  //     message.textContent = lowNumber;
  //     // Decrement the score by 1
  //     score--;
  //     gameScore.textContent = score;
  //     // If the score is zero
  //   } else {
  //     message.textContent = gameOver;
  //     body.backgroundColor = "darkred";
  //   }
  // }
});
