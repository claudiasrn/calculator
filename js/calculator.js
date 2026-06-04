let a = {
    value: 0,
    symbol: "",
    done: false,
    shown: false,
    canBeOverWritten: false};
let b = {
    value: 0,
    symbol: "",
    done: false,
    shown: false};

let operator = "";

function add(){
    a.value = parseInt(a.value) + parseInt(b.value);
    a.shown = false;
    a.done = false;
    a.canBeOverWritten = true;
    b.value = 0;
    b.shown = false;
    b.done = false;
    updateScreen();
    operator = "";
}

function subtract(){
    a.value = parseInt(a.value) - parseInt(b.value);
    a.shown = false;
    a.done = false;
    a.canBeOverWritten = true;
    b.value = 0;
    b.shown = false;
    b.done = false;
    updateScreen();
    operator = "";
}

function multiply(){
    a.value = parseInt(a.value) * parseInt(b.value);
    a.shown = false;
    a.done = false;
    a.canBeOverWritten = true;
    b.value = 0;
    b.shown = false;
    b.done = false;
    updateScreen();
    operator = "";
}

function divide(){
    a.done = false;
    a.canBeOverWritten = true;
    b.shown = false;
    b.done = false;

    if(parseInt(b.value) === 0){
        const screen = document.querySelector(".input-output");
        screen.textContent = "The universe said no";
        a.shown = true;
        updateFontSize();
        a.value = 0;
    } else {
        a.value = parseInt(a.value) / parseInt(b.value);
        a.shown = false;
        updateScreen();
    }

    b.value = 0;
    operator = "";
}

function operate() {
    switch(operator) {
        case "+":
            add();
            break;
        case "-":
            subtract();
            break;
        case "x":
            multiply();
            break;
        case "÷":
            divide();
            break;
    }
}

function updateScreen(){
    const screen = document.querySelector(".input-output");

    if (!a.shown){
        screen.textContent = parseInt(a.value);
        a.shown = true;
        updateFontSize();
    } else {
        screen.textContent = parseInt(b.value);
        b.shown = true;
        updateFontSize();
    }
}

function updateNumber(){
    digitBtns = document.querySelectorAll(".number");

    for (const btn of digitBtns) {
        btn.addEventListener("click", (event) => {
            if(!a.done && !a.canBeOverWritten) {
                a.value += event.target.textContent;
                a.shown = false;
                updateScreen();
            } else if (!a.done && a.canBeOverWritten){
                a.value = 0;
                a.canBeOverWritten = false;
                a.value += event.target.textContent;
                a.shown = false;
                updateScreen();
            } else {
                b.value += event.target.textContent;
                b.shown = false;
                updateScreen();
            }
        })
    }
}

operatorBtns = document.querySelectorAll(".operator");
for (const btn of operatorBtns) {
    btn.addEventListener("click", (event) => {
        if(a.done === true && b.shown === true) {
            b.done = true;
            operate();
        }
        operator = event.target.textContent;
        a.done = true;
    })
}

equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", () => {
    if(operator === "" || !b.shown) return;
    b.done = true;
    operate();
})

function updateFontSize() {
    const display = document.querySelector('.input-output');
    const length = display.textContent.length;

    if (length > 10) display.style.fontSize = '30px';
    else if (length > 7) display.style.fontSize = '50px';
    else display.style.fontSize = '70px';
}

updateNumber();