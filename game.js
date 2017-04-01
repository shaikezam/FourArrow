(function(arg1, click, cellElement, headerElementID, p1Class, p2Class) {
    var playerTurn = function(cell) {
        if (!cell) {
            error("cell isn't found");
            return;
        }
        let iRow = parseInt(cell / 10);
        let iCol = cell % 10;
        let aColumn = this.game.gameBoard[iCol];
        let game = this.game;
        for (let i = aColumn.length - 1; i >= 0; i--) {
            if (!aColumn[i]) {
                aColumn[i] = game.playerTurn;
                let sClassName = (game.playerTurn === game.player[0]) ? p1Class : p2Class;
                $('[name="' + i + "" + iCol + '"]').addClass(sClassName);
                game.playerTurn = (game.playerTurn === game.player[0]) ? game.player[1] : game.player[0];
                checkForWin();
                return;
            }
        }
    }.bind(this);

    var initBoardGame = function(sPlayer1Name, sPlayer2Name) {
        $(headerElementID).html(sPlayer1Name);
        this.game = {
            player: [sPlayer1Name, sPlayer2Name],
            gameBoard: [
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
            playerTurn: sPlayer1Name
        }
    }.bind(this)
    var checkForWin = function() {
        let oGameBoard = this.game.gameBoard;
        for (let i = 0 ; i < oGameBoard.length ; i ++) {
            for (let j = 0 ; j < oGameBoard[i].length ; j ++) {
                console.log(oGameBoard[i][j]);
            }
        }
    }.bind(this)
    function error(sMessage) {
        console.error(sMessage);
    };

    initBoardGame("P1", "P2");
    $(cellElement).on(click, function(oEvent) {
        playerTurn(oEvent.target.getAttribute("name"));
    }.bind(this));
}(document, "click", "td", "#header", "p1", "p2"))