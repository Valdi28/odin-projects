const gameBoard = (function () {
    return [["", "", ""], ["", "", ""], ["", "", ""]]
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
    }
}
}) ()
console.log(game.players);
