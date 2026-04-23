// 1) ask the user for input and store it in a variable

function askUser() {
    const validOptions = ["rock", "paper", "scissors"]

    while (true) {
        const input = prompt("Which one you decide: Rock, Paper or Scissors?");

        if (validOptions.includes(input.toLowerCase()))  return input.toLowerCase()
    }
};

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

function playRound(playerPick, machinePick) {
    if(playerWins(playerPick, machinePick) === 1) {
        playerScore++;
        alert(`Machine pick: ${machinePick}. You win, ${playerScore}-${machineScore}`);

    } else  if(playerWins(playerPick, machinePick) === -1) {
        machineScore++;
        alert(`Machine pick: ${machinePick}. You lose, ${playerScore}-${machineScore}`);

    } else {
        alert(`Machine pick: ${machinePick}. It's a tie, ${playerScore}-${machineScore}`);
    }
}

let playerScore = 0
let machineScore = 0

const pointsToWin = 5

function playGame(pointsToWin) {
    while (machineScore < pointsToWin && playerScore < pointsToWin) {
        playRound(askUser(), randomPick());
        console.log(playerScore, machineScore);
    };

    if (playerScore === pointsToWin) {
        alert('You won the game!')
    } else if (machineScore === pointsToWin) {
        alert('You lost the game')
    }
}

playGame(5);