function multiplicar(a, b) {
    let r = a * b;
    return r;
}

let res = multiplicar(2, 3);
console.group(res);

let n1 = 5;
let n2 = 10;
resultado = multiplicar(n1, n2);
console.log(`${n1} X ${n2} = ${resultado}`); //interpolação
console.log(n1 + " X " + n2 + " = " + resultado) //concatenação