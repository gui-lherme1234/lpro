// exemplo 3
const randomNumber = Math.floor(Math.random() * 3);

let result =
 (randomNumber === 0 &&  "rock") ||
 (randomNumber === 1 && "paper") ||
 "scissors";

console.log(result);
