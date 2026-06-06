function sum(num1, num2) {
    return num1 + num2;
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

function displayData(data) {
    const display = document.querySelector('.display');
    display.textContent = data;
}

function processInput(input) {
    const operators = '+-*/';
    const numbers = '0123456789';

    if (!operator && !num2 && (numbers.includes(input) || input=='-' || input=='.')) {
        if (input=='-' && !num1) {
            num1 += input;
        };

        if (num1 && input=='.' && numbers.includes(num1[num1.length-1]) && !num1.includes('.')) {
            num1 += input;
        };

        if(numbers.includes(input)) {
            num1 += input;
        };
        
        displayData(num1);
        return;
    } else if (num1 && operator && (numbers.includes(input) || input=='-' || input=='.')) {
        if (numbers.includes(input)) {
            num2 += input;
        };

        if (!num2 && input == '-') {
            num2 += input;
        };

        if (input=='.' && numbers.includes(num2[num2.length-1]) && !num2.includes('.')) {
            num2  += input;
        };

        displayData(num2);

        return;
    } else if (Number(num1) && !num2 && operators.includes(input)) {
        operator = input;
        displayData(num1);
        return;
    } else if (num1 && operator && num2 && operators.includes(input)) {
        const firstEquationResult = operate(operator, num1, num2);
        num1 = firstEquationResult;
        operator = input;
        num2 = '';

        return;
    }

};