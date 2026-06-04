let a = {
    value: 0,
    symbol: "+",
    done: false,
    shown: true,
    canBeOverWritten: false};
let b = {
    value: 0,
    symbol: "+",
    done: false,
    shown: false};

let operator = "";

function add(){
    a.value = roundResult(parseFloat(a.symbol + a.value) + parseFloat(b.symbol + b.value));
    a.shown = false;
    a.done = false;
    a.canBeOverWritten = true;
    normalizeSign(a);
    b.value = 0;
    b.shown = false;
    b.done = false;
    b.symbol = "+";
    updateScreen();
    operator = "+";
}

function subtract(){
    a.value = roundResult(parseFloat(a.symbol + a.value) - parseFloat(b.symbol + b.value));
    a.shown = false;
    a.done = false;
    a.canBeOverWritten = true;
    normalizeSign(a);
    b.value = 0;
    b.shown = false;
    b.done = false;
    b.symbol = "+";
    updateScreen();
    operator = "+";
}

function multiply(){
    a.value = roundResult(parseFloat(a.symbol + a.value) * parseFloat(b.symbol + b.value));
    a.shown = false;
    a.done = false;
    a.canBeOverWritten = true;
    normalizeSign(a);
    b.value = 0;
    b.shown = false;
    b.done = false;
    b.symbol = "+";
    updateScreen();
    operator = "+";
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
        a.symbol = "+"
        b.symbol = "+";

        setTimeout(() => { screen.textContent = "💥 self destructing in 3..."; updateFontSize(); }, 1000);
        setTimeout(() => { screen.textContent = "2..."; updateFontSize(); }, 2000);
        setTimeout(() => { screen.textContent = "1..."; updateFontSize(); }, 3000);
        setTimeout(() => { screen.textContent = "jk lol"; updateFontSize(); }, 4000);
        setTimeout(() => { acBtn.click(); }, 5000);
    } else {
        a.value = roundResult(parseFloat(a.symbol + a.value) / parseFloat(b.symbol + b.value));
        normalizeSign(a);
        b.symbol = "+";
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

    function formatValue(symbol, value) {
        const displayed = parseFloat(symbol + value);
        const str = value.toString();
        const displayedStr = displayed.toString().includes('e') 
            ? displayed.toFixed(20).replace(/\.?0+$/, '') 
            : displayed.toString();
        if (str.includes('.')) {
            const trailingZeros = str.replace(/.*\./, '').match(/0+$/);
            const endsWithDot = str.endsWith('.');
            if (endsWithDot) return displayedStr + '.';
            else if (trailingZeros) {
                const hasDot = displayedStr.includes('.');
                return displayedStr + (hasDot ? '' : '.') + trailingZeros[0];
            }
            else return displayedStr;
        }
        return displayedStr;
    }

    if (!a.shown){
        screen.textContent = formatValue(a.symbol, a.value);
        a.shown = true;
        updateFontSize();
    } else {
        screen.textContent = formatValue(b.symbol, b.value);
        b.shown = true;
        updateFontSize();
    }
}

function updateNumber(){
    digitBtns = document.querySelectorAll(".number");

    for (const btn of digitBtns) {
        btn.addEventListener("click", (event) => {
            if (!a.done && !a.canBeOverWritten && a.value.toString().replace('.', '').length >= 12) return;
            if (a.done && b.value.toString().replace('.', '').length >= 12) return;

            if(!a.done && !a.canBeOverWritten) {
                a.value += event.target.textContent;
                a.shown = false;
                updateScreen();
            } else if (!a.done && a.canBeOverWritten){
                a.value = 0;
                a.symbol = "+"
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
            pointBtn = document.querySelector(".point");
            pointBtn.classList.remove('active'); 
            operate();
        }
        operator = event.target.textContent;
        a.done = true;
        pointBtn = document.querySelector(".point");
        pointBtn.classList.remove('active');

        operatorBtns.forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
    })
}

equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", () => {
    if(operator === "" || !b.shown) return;
    b.done = true;
    pointBtn = document.querySelector(".point");
    pointBtn.classList.remove('active'); 
    operatorBtns.forEach(btn => btn.classList.remove('active'));
    operate();
})

function updateFontSize() {
    const screen = document.querySelector('.input-output');
    const length = screen.textContent.length;

    if (length > 10) screen.style.fontSize = '30px';
    else if (length > 7) screen.style.fontSize = '50px';
    else screen.style.fontSize = '70px';
}

acBtn = document.querySelector(".all-clear");
acBtn.addEventListener("click", () => {
    a.value = 0;
    a.symbol = "";
    a.done = false;
    a.shown = true;
    a.canBeOverWritten = false;
    a.symbol = "+";
    
    const screen = document.querySelector(".input-output");
    screen.textContent = 0;
    updateFontSize();

    b.value = 0;
    b.symbol = "";
    b.done = false;
    b.shown = false;
    b.symbol = "+";

    operator = "";

    pointBtn = document.querySelector(".point");
    pointBtn.classList.remove('active');
    operatorBtns.forEach(btn => btn.classList.remove('active')); 
})

symbolBtn = document.querySelector(".symbol");
symbolBtn.addEventListener("click", () => {
    if (!a.done && a.canBeOverWritten) {
        a.value = 0;
        a.canBeOverWritten = false;
        a.symbol = "-";
        a.shown = false;
        updateScreen(); 
    }else if (!a.done){
            switch(a.symbol) {
            case "-": 
                a.symbol = "+";
                a.shown = false;
                updateScreen();
                break;
            case "+":
                a.symbol = "-";
                a.shown = false;
                updateScreen();
                break;
        } 
    } else {
        switch(b.symbol) {
            case "-": 
                b.symbol = "+";
                b.shown = false;
                updateScreen();
                break;
            case "+":
                b.symbol = "-";
                b.shown = false;
                updateScreen();
                break;
        }
    }
});

pointBtn = document.querySelector(".point");
pointBtn.addEventListener("click", (event) => {
    if(!event.target.classList.contains("active")) {
        if(!a.done && a.canBeOverWritten) {
            a.value = "0.";
            a.symbol = "+";
            a.canBeOverWritten = false;
            a.shown = false;
            updateScreen();
        } else if(!a.done) {
            a.value = parseInt(a.value) + ".";
            a.shown = false;
            updateScreen();
        } else {
            b.value = parseInt(b.value) + ".";
            b.shown = false;
            updateScreen();
        }

        event.target.classList.add("active");
    }
});

function normalizeSign(obj) {
    if (parseInt(obj.value) < 0) {
        obj.symbol = "-";
        obj.value = Math.abs(parseFloat(obj.value));
    } else {
        obj.symbol = "+";
    }
}

function roundResult(value) {
    const str = value.toString();
    if (str.includes('.') && str.split('.')[1].length > 14) {
        return parseFloat(value.toFixed(14));
    }
    return value;
}

updateNumber();