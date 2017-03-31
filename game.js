(function(arg1, click, arg3) {
    var initBoardGame = function(sPlayer1Name, sPlayer2Name) {
        $("td").on(click, function(oEvent) {
            console.log(oEvent.target.getAttribute("name"));
        }.bind(this))
        this.game = {
            player: [sPlayer1Name, sPlayer2Name],
            gameBoard: {
                r0: [null, null, null, null, null, null, null],
                r1: [null, null, null, null, null, null, null],
                r2: [null, null, null, null, null, null, null],
                r3: [null, null, null, null, null, null, null],
                r4: [null, null, null, null, null, null, null],
                r5: [null, null, null, null, null, null, null],
                r6: [null, null, null, null, null, null, null]
            }
        }
    }.bind(this)
    initBoardGame("A1", "B2")
    console.log(this.game);
}(document, "click"))