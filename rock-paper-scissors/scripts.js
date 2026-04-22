// 1) ask the user for input and store it in a variable

function askUser() {
    const input = prompt("Which one you decide: Rock, Paper or Scissors?");

    return input.toLowerCase(input)
};

function validatePick(pick) {
    const validOptions = ["rock", "paper", "scissors"]

    return validOptions.includes(pick)
}


function randomPick() {
    const validOptions = ["rock", "paper", "scissors"]
    
    const index = Math.floor(Math.random()*3)

    return validOptions[index]
}