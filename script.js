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

const outputText = document.getElementById('output-text');

function input(e, input)
{
    if(e.srcElement.id == 'clear')
    {
        calcInputs = "";
    }
    else
    {
        calcInputs += input;
    }
    
    outputText.textContent = calcInputs;
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {button["data-input"] = button.textContent; button.addEventListener('click', (e) => input(e, button["data-input"]));});
