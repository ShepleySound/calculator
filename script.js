function roundToFive(num){
    return Math.round(num * 100000 + Number.EPSILON) / 100000
}

function add(x, y){
    x = parseFloat(x)
    y = parseFloat(y)
    return roundToFive(x + y);
}

function subtract(x, y){
    x = parseFloat(x)
    y = parseFloat(y)
    return roundToFive(x - y)
}

function multiply(x, y){
    x = parseFloat(x)
    y = parseFloat(y)
    return roundToFive(x * y)
}

function divide(x, y){
    x = parseFloat(x)
    y = parseFloat(y)
    if (y === 0){
        alert("DO NOT DIVIDE BY ZERO")
        console.log("Are you trying to destroy the universe?")
        return 0
    }
    return roundToFive(x / y)
}

function operate(operator, x, y){
    switch (operator){
        case "add":
            return add(x, y)
        case "subtract":
            return subtract(x, y)
        case "multiply":
            return multiply(x, y)
        case "divide":
            return divide(x, y)
    }
}

// Ensures that the resultWindow does not overflow/grow.
function limitResults(resultWindow){
    if (resultWindow.childElementCount >= 5){
        resultWindow.removeChild(resultWindow.firstChild)
    }
}

// Adds a result to the resultWindow
function createResult(result, resultWindow){
    const newResult = document.createElement("div")
    newResult.innerText = result
    newResult.classList.add("result")
    resultWindow.appendChild(newResult)
    limitResults(resultWindow)
}

const resultWindow = document.querySelector(".result-window") // Window that results get placed in.
const typingWindow = document.querySelector(".typing-window") // Window that pressed buttons get entered into.
const digits = document.querySelectorAll(".digit")
const operators = document.querySelectorAll(".operator")
const operatorCheckArray = ["+", "-", "×", "÷"]
const clearButton = document.querySelector("#clear")
const equalsButton = document.querySelector("#equals")
const decimalButton = document.querySelector("#decimal")
let firstNumber = ""
let secondNumber = ""
let currentOperator = "" // Holds the sign of the operator, not the name/title.
let isOperator = false

digits.forEach(digit => digit.addEventListener("click", function(e){
    typingWindow.innerText += e.target.value
    if (isOperator){
        secondNumber += e.target.value
    }

}))

operators.forEach(operator => operator.addEventListener("click", function(e){
    if (typingWindow.innerText === ""){

    }
    else if (!operatorCheckArray.some(operator => typingWindow.innerText.slice(1).includes(operator))){
        isOperator = true
        firstNumber = typingWindow.innerText
        currentOperator = e.target.id
        typingWindow.innerText += e.target.innerText
    }
    else if (secondNumber === ""){
        typingWindow.innerText = typingWindow.innerText.slice(0, -1) + e.target.innerText
        currentOperator = e.target.id
    }
    else{
        firstNumber = operate(currentOperator, firstNumber, secondNumber)
        currentOperator = e.target.id
        secondNumber = ""
        typingWindow.innerText = firstNumber + e.target.innerText
        createResult(firstNumber, resultWindow)
    }
}))

decimalButton.addEventListener("click", function(e){

    if (secondNumber.includes(".")){
        return
    }
    else if (isOperator){
        secondNumber += "."
    }
    else if (typingWindow.innerText.includes(".")){
        return
    }
    typingWindow.innerText += "."
})


// Sets all necessary variables to empty/false. Mainly clears the typing window OR the result window.
clearButton.addEventListener("click", function(){
    // Clears the result window if pressed when nothing is present in the typing window.
    if (typingWindow.innerText === ""){
        while (resultWindow.firstChild){
            resultWindow.removeChild(resultWindow.firstChild)
        }
    }
    typingWindow.innerText = ""
    firstNumber = ""
    secondNumber = ""
    currentOperator = ""
    isOperator = false
})

// Runs the operate function and clears up the secondNumber for future use.
equalsButton.addEventListener("click", function(){
    if (!isOperator || secondNumber === ""){
        return
    }
    firstNumber = operate(currentOperator, firstNumber, secondNumber)
    secondNumber = ""
    typingWindow.innerText = firstNumber
    isOperator = false
    createResult(firstNumber, resultWindow)
})
