function sum(num1, num2) {
    return +num1 + +num2;
};

function substract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return sum(num1, num2);
            break;
        case '-':
            return substract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    };
};

let operator = '';
let num1 = '';
let num2 = '';

function setErr(text) {
    const errorField = document.querySelector('.error-msg');
    errorField.textContent = text;
};

function displayData(data) {
    const display = document.querySelector('.display');
    display.textContent = data;

    console.log(num1);
    console.log(operator);
    console.log(num2);

    setErr('')

}

function isDividedByZero(num1, num2, operator) {
    if (num1 == 0 && num2 == 0 && operator == "/") {
        return true
    } else {
        return false
    }
}

function processInput(input) {
    const operators = '+-*/';
    const numbers = '0123456789';

    if (!operator && !num2 && (numbers.includes(input) || (num1 != '' && input == '-') || input == '.')) {
        if (input == '-' && !num1) {
            num1 += input;
        };

        if (num1 != '' && input == '.' && numbers.includes(num1[num1.length - 1]) && !num1.includes('.')) {
            num1 += input;
        };

        if (numbers.includes(input)) {
            num1 += input;
        };

        displayData(num1);
        return;
    } else if (num1 != '' && operator && (numbers.includes(input) || (!num2 && input == '-') || input == '.')) {
        if (numbers.includes(input)) {
            num2 += input;
        };

        if (!num2 && input == '-') {
            num2 += input;
        };

        if (input == '.' && numbers.includes(num2[num2.length - 1]) && !num2.includes('.')) {
            num2 += input;
        };

        displayData(num2);

        return;
    } else if (Number(num1) != undefined && !num2 && operators.includes(input)) {
        operator = input;
        displayData(num1);
        return;
    } else if (num1 != undefined && operator && num2 && operators.includes(input)) {
        if (isDividedByZero(num1, num2, operator)) {
            setErr('0 division!!');
            num1 = '';
            num2 = '';
            operator = '';
        } else {
            const firstEquationResult = operate(operator, num1, num2);
            num1 = ''
            operator = input;
            num2 = '';

            displayData(Math.round(firstEquationResult * 100) / 100)
        }

        return;
    } else if (input == "=" && num1 != '' && num2 != '' && operator != '') {
        if (isDividedByZero(num1, num2, operator)) {
            setErr('0 division!!');
            num1 = '';
            num2 = '';
            operator = '';
        } else {
            const equationResult = operate(operator, num1, num2);
            num1 = ''
            operator = '';
            num2 = '';

            displayData(Math.round(equationResult * 100) / 100)
        }
        return;
    } else if (input == "AC") {
        num1 = '';
        operator = '';
        num2 = '';

        displayData(num1);
    }

};


const container = document.querySelector('.container');

container.addEventListener('click', (e) => {
    if (e.target.nodeName == "BUTTON") {

        processInput(e.target.textContent);
    }
})