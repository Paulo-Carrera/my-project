const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let flippedCards = [];
let score = 0;
let highScore = 0;
let attempts = 0;

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
gameContainer.addEventListener("click", handleCardClick);

function startGame() {
  startBtn.style.display = "none";
  restartBtn.style.display = "inline-block";

  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

function restartGame() {
  gameContainer.innerHTML = "";
  score = 0;
  attempts = 0;
  scoreDisplay.textContent = "Score: " + score;
  startBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const cardContainer = document.createElement("div");
    const frontCard = document.createElement("div");
    const backCard = document.createElement("div");

    cardContainer.classList.add("card");
    frontCard.classList.add("front");
    backCard.classList.add("back");

    frontCard.textContent = "?";

    backCard.style.backgroundColor = color;
    cardContainer.appendChild(frontCard);
    cardContainer.appendChild(backCard);

    gameContainer.appendChild(cardContainer);
  }
}

function handleCardClick(event) {
  console.log("Card Clicked!");
  const card = event.target.closest(".card");

  if (!card || card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;

    const color1 = getComputedStyle(card1.querySelector(".back")).backgroundColor;
    const color2 = getComputedStyle(card2.querySelector(".back")).backgroundColor;

    console.log("Color of card 1:", color1);
    console.log("Color of card 2:", color2);

    if (color1 === color2) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        score += 10 - (attempts * 2); // Adjust deduction based on attempts
        scoreDisplay.textContent = "Score: " + score;
      } else {
        attempts++;
        score -= 2; // Deduct a fixed amount per attempt
        if (score < 0) {
          score = 0; // Ensure score doesn't go negative
        }
        scoreDisplay.textContent = "Score: " + score; // Update score display
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
      
          const messageElement = document.createElement("div");
          messageElement.classList.add("message");
          messageElement.textContent = "Oops! The cards don't match. Try again!";
          document.body.appendChild(messageElement);
      
          setTimeout(() => {
            messageElement.remove();
          }, 1500);
        }, 1000);
      }

    if (score < 0) {
      score = 0;
    }

    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = "High Score: " + highScore;
    }

    flippedCards = [];
    attempts = 0;
  }

   // Check if all cards are matched
   const allMatched = document.querySelectorAll('.card').length === document.querySelectorAll('.matched').length;
   if (allMatched) {
     // Display temporary message
     const messageElement = document.createElement("div");
     messageElement.classList.add("message");
     messageElement.textContent = "Congratulations! You've matched all the cards!";
     document.body.appendChild(messageElement);
 
     setTimeout(() => {
       messageElement.remove();
     }, 3000); // Remove the message after 3 seconds (adjust as needed)
   }

}





function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

















