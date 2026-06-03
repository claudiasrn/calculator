let a = 0;
let b = 0;
let operand = "";

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(dividend, divisor){
    if(divisor === 0) return "The universe said no";
    return dividend / divisor;
}

function operate() {
    switch(operand) {
        case "+":
            add(a, b);
            break;
        case "-":
            subtract(a, b);
            break;
        case "x":
            multiply(a, b);
            break;
        case "÷":
            divide(a, b);
            break;
    }
}