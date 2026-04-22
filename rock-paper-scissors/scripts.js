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


// 0 = tie; 1 = wins; -1 = loses
function playerWins(player, machine) {
    switch (player) {
        case "rock":
            if (machine==="rock") {
                return 0
            } else if (machine=="paper") {
                return -1
            } else {
                return 1
            }
            
        case "paper":
            if (machine==="paper") {
                return 0
            } else if (machine=="scissors") {
                return -1
            } else {
                return 1
            }

        case "scissors":
            if (machine==="scissors") {
                return 0
            } else if (machine=="rock") {
                return -1
            } else {
                return 1
            }

    }

}