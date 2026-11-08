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
        sign,
        score: 0
    }
}

const game = (function () {
    return {
        players: {
            player: makePlayer("player", "X"),
            bot: makePlayer("bot", "O")
        },
        currentPlayer: undefined,
        setCurrentPlayer() {
            if (!this.currentPlayer) {
                this.currentPlayer = (Math.round(Math.random()) ? this.players.player : this.players.bot)
                return this.currentPlayer
            }

            if (this.currentPlayer == this.players.player) {
                this.currentPlayer = this.players.bot
                
            } else{
                this.currentPlayer = this.players.player
                
            }
            
            return this.currentPlayer
        },
        checkIfAlreadyPlaced: function (x, y) {
            if (gameBoard[x - 1][y - 1] == "_") {
                return true
            } else {
                return false
            }
        },
        placeSign: function (player, x, y) {
            gameBoard[x - 1][y - 1] = player.sign
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


            return false
        },
        pickRandomPlace: function () {
            function randomCords() {
                const toReturn = { x: Math.round(Math.random() * 2 + 1), y: Math.round(Math.random() * 2 + 1) }
                return toReturn
            }
            let { x, y } = randomCords()

            while (!this.checkIfAlreadyPlaced(x, y)) {
                const newRandomCords = randomCords()
                x = newRandomCords.x
                y = newRandomCords.y
            }

            return { x, y }


        },
        makeRender: function() {
            return gameBoard.map(val => val.join(" ")).join("\n")
        },
        askPlayer: function (player) {

            let x = prompt("Enter x")
            let y = prompt("Enter y")

            while (!this.checkIfAlreadyPlaced(x, y)) {
                x = prompt("Enter x");
                y = prompt("Enter y")
            }

            return {x, y}
        },
        clearBoard: () => {
            for (let i = 0; i<3; i++) {
                for (let j = 0; j<3; j++) {
                    gameBoard[i][j] = "_"
                    console.log(gameBoard[i][j]);
                    
                }
            }
            console.log(gameBoard);
            
        },
        main: function() {
            this.setCurrentPlayer()
            
            while (!this.checkWinner()) {
                console.log(this.makeRender());
                console.log(this.currentPlayer);
                
                
                if (this.currentPlayer == this.players.player) {
                    const {x, y} = this.askPlayer(this.players.player)
                    this.placeSign(this.players.player, x, y)
                } else {
                    const {x, y} = this.pickRandomPlace()
                    this.placeSign(this.players.bot, x, y)
                }
                this.setCurrentPlayer()
            }

            console.log(`Winner is... ${this.checkWinner().name}`);
            this.checkWinner().score++

            this.clearBoard()
            this.main()
            
        }
    }
})()
console.log(game.main());
