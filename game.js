(function(arg1, click, cellElement) {
    var playerTurn = function(cell) {
        if (!cell) {
            error("cell isn't found");
            return;
        }
        let iRow = parseInt(cell / 10);
        let iCol = cell % 10;
        $('[name="' + cell + '"]').addClass("p1");
    }.bind(this);
    var initBoardGame = function(sPlayer1Name, sPlayer2Name) {
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
    function error(sMessage) {
        console.error (sMessage);
    };
    initBoardGame("A1", "B2");
    $(cellElement).on(click, function(oEvent) {
        playerTurn(oEvent.target.getAttribute("name"));
    }.bind(this));
}(document, "click", "td"))