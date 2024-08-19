// Função anônima

// ES5 (versão antiga)
var multiplicar = function(x, y) {
    return x * y;
}

// ES6(versão atual)
const multiplicar = (x, y) => {
    return x * y;
}

// É possível omitir as chaves e a palavra-chave return caso a função tenha uma única instrução (linha).
const multiplicar = (x, y) => x * y;