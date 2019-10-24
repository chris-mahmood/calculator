
//initialize variables
let intDisplay = 0;
let btn = document.querySelectorAll(".btn");
let btnOp = document.querySelectorAll(".btnOp");

document.getElementById("btnEquals").disabled=true;
for (let i = 0; i < btnOp.length; i++) {
    btnOp[i].disabled = true;
}


//basic operations 
let add = (a, b) => parseInt(a) + parseInt(b);
let subtract = (a, b) => parseInt(a) - parseInt(b);
let multiply = (a, b) => parseInt(a) * parseInt(b);
let divide = (a, b) => {
    if (b == 0) {
        document.getElementById("container").classList.add("divideByZero");
        setTimeout(clear,2000);
        return "ʕ º ᴥ ºʔ NOPE";
        
    }
    let x=parseInt(a) / parseInt(b);
    if (Number.isInteger(x)){return x}
    else{
        return parseFloat(x.toFixed(4));
    }
  

}

//buttons------------------------

//numbers
btn.forEach((button) => {
    button.addEventListener("click", () => {
        display(button.textContent);
        for (let i = 0; i < btnOp.length; i++) {
            btnOp[i].disabled = false;
        }
        document.getElementById("btnEquals").disabled=false;
    });
});
//operators 
btnOp.forEach((button) => {
    button.addEventListener("click", () => {
        display(button.textContent);
        for (let i = 0; i < btnOp.length; i++) {
            btnOp[i].disabled = true;
        }
        document.getElementById("btnEquals").disabled=true;


    });
});

//equals
document.getElementById("btnEquals").addEventListener("click", () => {
    equalPress();

});
//clear
document.getElementById("btnClear").addEventListener("click", () => {
    clear();
});

//backspace
document.getElementById("btnBackspace").addEventListener("click", () => {

    backspace();
});
//functions-----------------------

//clear display/arrays, as well as disable function buttons
function clear() {
    document.getElementById("numDisplay").textContent = "";
    intDisplay = 0;
    for (let i = 0; i < btnOp.length; i++) {
        btnOp[i].disabled = true;
    }
    document.getElementById("container").classList.remove("divideByZero");

}

//backspace
function backspace() {
    intDisplay = intDisplay.substr(0, intDisplay.length - 1);
    document.getElementById("numDisplay").textContent = intDisplay;
}


//operate on a single operater-value-value set 
function operate(op, a, b) {
    switch (op) {
        case "+":
            return add(a, b);
            break;
        case "−":
            return subtract(a, b);
            break;
        case "×":
            return multiply(a, b);
            break;
        case "÷":
            return divide(a, b)
            break;
    }
}
//update display on button press
function display(x) {
    intDisplay = document.getElementById("numDisplay").textContent += x;
}

function equalPress() {
    let arrFinalEq = [];
    intDisplay = intDisplay.split(/([÷+×\/−])/);
    for (let i = 0; i < intDisplay.length; i++) {
        if (intDisplay[i] === "×" || intDisplay[i] === "÷") {
            let result = operate(intDisplay[i], intDisplay[i - 1], intDisplay[i + 1])
            intDisplay.splice(i - 1, 3, result);
            i = i - 1;
        }
    }
    for (let i = 0; i < intDisplay.length; i++) {
        if (intDisplay[i] === "+" || intDisplay[i] === "−") {
            let result = operate(intDisplay[i], intDisplay[i - 1], intDisplay[i + 1])
            intDisplay.splice(i - 1, 3, result);
            i = i - 1;
        }

    }

    document.getElementById("numDisplay").textContent = intDisplay.join("");
    if (isNaN(intDisplay.join(""))) {
        document.getElementById("numDisplay").textContent = "ERROR ᶘಠᴥಠᶅ"
    }
}
