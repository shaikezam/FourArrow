(function(arg1, arg2, arg3) {

    var initBoardGame = function(sPlayer1Name, sPlayer2Name) {
        this.game = {
            player: [sPlayer1Name, sPlayer2Name],
            gameBoard: {
                r0: [],
                r1: [],
                r2: [],
                r3: [],
                r4: [],
                r5: [],
                r6: []
            }
        }
    }.bind(this)
    initBoardGame("A1", "B2")
    console.log(this.game);
}(document, "getElementBy", "oncClick"))