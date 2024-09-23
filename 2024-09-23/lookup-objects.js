// exemplo 5 (lookup objects)
const randomNumber = Math.floor(Math.random() * 3);

const lookObjects = {
    0: "rock",
    1: "paper",
    2: "scissors",
};

const result = lookObjects[randomNumber];

console.log(randomNumber);
console.log(result);