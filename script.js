function add(...inputs)
{
    return inputs.reduce((total, element) => total+element, 0);
}

function subtract(...inputs)
{
    return inputs.reduce((total, element) => total - element, inputs[0]*2);
}

function multiply(...inputs)
{
    return inputs.reduce((total, element) => total * element, 1);
}

function divide(...inputs)
{
    return inputs.reduce((total, element) => total/element, inputs[0]*inputs[0]);
}
