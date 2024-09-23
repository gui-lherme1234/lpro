const drawPlay = () => {
const randomNumber = Math.floor(Math.random() * 3);

let result = "";

if (randomNumber === 0) {
    result = "Rock"
} else if (randomNumber === 1) {
    result = "Paper";
} else {
    result = "Scissors";
}
  return result;
}

let computer = drawPlay();
console.log(computer);