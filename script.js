let calcInputs = "";

function add(...inputs)
{
    return inputs.reduce((total, element) => total + +element, 0);
}

function subtract(...inputs)
{
    return inputs.reduce((total, element) => total - +element, inputs[0]*2);
}

function multiply(...inputs)
{
    return inputs.reduce((total, element) => total * +element, 1);
}

function divide(...inputs)
{
    return inputs.reduce((total, element) => total/+element, inputs[0]*inputs[0]);
}

function operate(...inputs)
{
    if(inputs.length == 1)
    {
        inputs = Array.from(inputs[0]);
    }

    const operator = inputs.find(element => {return element.match(/[+\-*\/]/) != null});
    inputs = inputs.join("").split(operator);

    switch(operator)
    {
        case '+':
            return add(inputs[0], inputs[1]);
        case '-':
            return subtract(inputs[0], inputs[1]);
        case '*':
            return multiply(inputs[0], inputs[1]);
        case '/':
            return divide(inputs[0], inputs[1]);
    }
}

function printResult(result)
{
    calcInputs += '=' + result;
}

function removeExtraDecimalPoints(number)
{
    return number.split('.').reduce((newString, currentString, currentIndex) => {return currentIndex == 0 ? newString + currentString + '.' : newString + currentString}, '')
}

function separateFirstHalfOfOperation(problem)
{
    return [problem.slice(0, problem.search(/[+\-x\/]/)), problem.slice(problem.search(/[+\-x\/]/)+1, problem.length)];
}

function separateSecondHalfOfOperation(problem)
{
    problem[2] = problem[1].slice(secondOperator, problem[1].length);
    problem[1] = problem[1].slice(0, secondOperator);
    return problem;
}

function solveProblem(problem)
{
    operator = problem.toString().match(/[+\-x\/]/);
    if(operator == 'x') operator = '*';
    if(operator == null) return printResult(problem);

    problem = separateFirstHalfOfOperation(problem);
    problem[0] = removeExtraDecimalPoints(problem[0]);
    console.log(problem[0]);
    
    const secondOperator = problem[1].search(/[+\-x\/]/);
    if(secondOperator != -1)
    {
        problem = separateSecondHalfOfOperation(problem);
        problem[1] = removeExtraDecimalPoints(problem[1]);
        console.log(problem[1]);
        problem = operate(problem[0] + operator + problem[1]) + problem[2];
    }
    else
    {
        problem[1] = removeExtraDecimalPoints(problem[1]);
        problem = operate(problem[0] + operator + problem[1]);
    }
    
    solveProblem(problem)
}

const outputText = document.getElementById('output-text');

function input(e, input)
{
    switch(input)
    {
        case 'C':
            calcInputs = "";
        break;
        case '=':
            let problem = calcInputs.lastIndexOf('=') == -1 ? calcInputs : calcInputs.slice(calcInputs.lastIndexOf('=')+1, calcInputs.length);
            solveProblem(problem);
        break;
        case '•':
            calcInputs += '.';
        break;
        default:
            calcInputs += input;
        break;
    }

    const maxOutputLength = 15;
    if(calcInputs.length > maxOutputLength)
    {
        outputText.textContent = "..."+calcInputs.substring(calcInputs.length, calcInputs.length-maxOutputLength);
    }
    else
    {
        outputText.textContent = calcInputs;
    }
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {button["data-input"] = button.textContent; button.addEventListener('click', (e) => input(e, button["data-input"]));});
