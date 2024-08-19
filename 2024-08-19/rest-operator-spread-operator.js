const somar = (...valores) => {
    return valores.reduce((acumulador, valorAtual)  => acumulador + valorAtual, 0);
}

console.log(somar(1, 2, 3)); //6

console.log(somar([1, 2, 3])); //01,2,3
console.log(somar(...[1, 2, 3])); //6

const myArray = [1, 2, 3, 4, 5];
console.log(somar(myArray)); //01,2,3,4,5
console.log(somar(...myArray)); //15