const gameBoard = (function () {
    return [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ]
})()

const makePlayer = (name, sign) => {
    return {
        name,
        sign
    }
}

const displayController = (() => {
    return {
        updateDisplay: function () {
            const rows = document.querySelectorAll('.rows');

            rows.forEach((row, rowIndex) => {
                const rowArr = Array.from(row.childNodes)

                rowArr.filter(rowArrVal => rowArrVal.nodeType == 1).map((tile, tileIndex) => {
                    tile.textContent = gameBoard[rowIndex][tileIndex]
                });

            })
        },
        updateInfo: function(message) {
            const info = document.querySelector(".info")

            info.textContent = message
        }
    }
})()

const game = (function () {
    return {
        players: {
            player: makePlayer("", "X"),
            bot: makePlayer("bot", "O")
        },
        currentPlayer: undefined,
        checkIfAlreadyPlaced: function (x, y) {
            if (gameBoard[x][y] == "_") {
                return false
            } else {
                return true
            }
        },
        placeSign: function (player, x, y) {
            gameBoard[x][y] = player.sign
        },
        checkWinner: function () {
            const playerSign = this.players.player.sign
            const botSign = this.players.bot.sign

            const columnsTable = [[], [], []]

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    columnsTable[j].push(gameBoard[i][j])
                }

                if (gameBoard[i].filter((value) => value == playerSign).length == 3) {
                    return this.players.player
                } else if (gameBoard[i].filter((value) => value == botSign).length == 3) {
                    return this.players.bot
                }

            }
            for (let i = 0; i < 3; i++) {

                if (columnsTable[i].filter((value) => value == playerSign).length == 3) {
                    return this.players.player
                } else if (columnsTable[i].filter((value) => value == botSign).length == 3) {
                    return this.players.bot
                }

            }
            const diagonal = [
                [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
                [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]
            ]
            for (let i = 0; i < 2; i++) {

                if (diagonal[i].filter((value) => value == playerSign).length == 3) {
                    return this.players.player
                } else if (diagonal[i].filter((value) => value == botSign).length == 3) {
                    return this.players.bot
                }

            }


            if (gameBoard.map(val => val.join(" ")).join(" ").split(" ").filter(val => val == "X" || val == "O").length == 9) {
                return "tie"
            };

            return false
        },
        pickRandomPlace: function () {
            function randomCords() {
                const toReturn = { x: Math.round(Math.random() * 2), y: Math.round(Math.random() * 2) }
                return toReturn
            }
            let { x, y } = randomCords()

            while (this.checkIfAlreadyPlaced(x, y)) {
                const newRandomCords = randomCords()
                x = newRandomCords.x
                y = newRandomCords.y
            }


            return { x, y }


        },
        makeRender: function () {
            return gameBoard.map(val => val.join(" ")).join("\n")
        },
        askPlayer: function (player) {

            let x = prompt("Enter x")
            let y = prompt("Enter y")

            while (!this.checkIfAlreadyPlaced(x, y)) {
                x = prompt("Enter x");
                y = prompt("Enter y")
            }

            return { x, y }
        },
        clearBoard: () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    gameBoard[i][j] = "_"

                }
            }

        },
        setPlayerName: function(name) {
            if (!name) {
                this.players.player.name = "Unknown"
                return "Unknown"
            } else {
                this.players.player.name = name
                return name
            }
        },
        handleResetButton: function() {
            this.clearBoard()
            displayController.updateInfo(`${this.players.player.name} vs AI`)
            displayController.updateDisplay()
        },
        main: function (x, y) {
            if (this.checkWinner()) {return}

            if(this.players.player.name == "") {
                const promptAnswer  = prompt("Please enter your name")
                
                const newName = this.setPlayerName(promptAnswer)
                displayController.updateInfo(`${newName} vs AI`)
            }

            if (!this.currentPlayer) {
                if (Math.round(Math.random())) {
                    this.currentPlayer = this.players.player

                } else {
                    this.currentPlayer = this.players.bot
                }
            }
            displayController.updateDisplay()

            if (this.currentPlayer == this.players.player && x == undefined && y == undefined) {
                this.currentPlayer = this.players.player

                return
            }

            if (this.currentPlayer == this.players.player) {
                if (!this.checkIfAlreadyPlaced(x, y)) {
                    this.placeSign(this.players.player, x, y)

                    if (this.checkWinner() == "tie")  {
                        displayController.updateInfo("Tie!!!")
                        // this.clearBoard()
                        displayController.updateDisplay()
                        return
                    } else if (this.checkWinner()) {
                        displayController.updateInfo(`Winner: ${this.checkWinner().name}`);
                        // this.clearBoard()
                        displayController.updateDisplay()
                        
                        return
                    }

                    this.currentPlayer = this.players.bot

                    const botPick = this.pickRandomPlace()
                    const botX = botPick.x
                    const botY = botPick.y
                    this.placeSign(this.players.bot, botX, botY)

                    this.currentPlayer = this.players.player
                    displayController.updateDisplay()
                } else {
                    this.currentPlayer = this.players.player

                    displayController.updateDisplay()
                    return
                }

            } else if (this.currentPlayer == this.players.bot) {
                const botPick = this.pickRandomPlace()
                const botX = botPick.x
                const botY = botPick.y
                this.placeSign(this.players.bot, botX, botY)

                this.currentPlayer = this.players.player

                displayController.updateDisplay()
            }

            if (this.checkWinner()) {
                // alert(`Winner: ${this.checkWinner().name}`);
                displayController.updateInfo(`Winner: ${this.checkWinner().name}`)
                // this.clearBoard()
            }
            displayController.updateDisplay()
        }
    }
})()

game.main()

document.addEventListener('click', (event) => {
    if (event.target.classList.contains("tile")) {
        const parentElement = event.target.parentElement
        const parentElementChildren = Array.from(parentElement.children)
        const grandParentElementChildren = Array.from(parentElement.parentElement.children)

        const x = grandParentElementChildren.indexOf(parentElement)
        const y = parentElementChildren.indexOf(event.target)

        game.main(x, y)
    }
})