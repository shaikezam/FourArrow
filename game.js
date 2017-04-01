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
                let bWhatPlayerIsit = game.playerTurn === game.player[0];
                let sClassName = (bWhatPlayerIsit) ? p1Class : p2Class;
                $('[name="' + i + "" + iCol + '"]').addClass(sClassName);
                game.playerTurn = (bWhatPlayerIsit) ? game.player[1] : game.player[0];
                $(headerElementID).html(game.playerTurn);
                checkForWin(aColumn[i]);
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

    var checkForWin = function(player) {
        let game = this.game;
        let oGameBoard = game.gameBoard;
        let tempCounter = 0;
        for (let i = 0; i < oGameBoard.length; i++) {
            for (let j = 0; j < oGameBoard[i].length; j++) {
                if (i <= oGameBoard.length - 4 && oGameBoard[i][j] === player && oGameBoard[i + 1][j] === player && oGameBoard[i + 2][j] === player && oGameBoard[i + 3][j] === player) {
                    log("Winner");
                    fnEndGame(player);
                    return;
                } else if (j <= oGameBoard[i].length - 4 && oGameBoard[i][j] === player && oGameBoard[i][j + 1] === player && oGameBoard[i][j + 2] === player && oGameBoard[i][j + 3] === player) {
                    log("Winner");
                    fnEndGame(player);
                    return;
                } else if (j <= oGameBoard[i].length - 4 && i <= oGameBoard.length - 4 && oGameBoard[i][j] === player && oGameBoard[i + 1][j + 1] === player && oGameBoard[i + 2][j + 2] === player && oGameBoard[i + 3][j + 3] === player) {
                    log("Winner");
                    fnEndGame(player);
                    return;
                } else if (i <= oGameBoard.length - 4 && oGameBoard[i][j] === player && oGameBoard[i + 1][j - 1] === player && oGameBoard[i + 2][j - 2] === player && oGameBoard[i + 3][j - 3] === player) {
                    log("Winner");
                    fnEndGame(player);
                    return;
                }
            }
        }
    }.bind(this)

    var fnEndGame = function(player) {
        

        $(cellElement).off(click, fnClick);
        alert(player + " is the winner!!!");
    }

    function error(sMessage) {
        console.error(sMessage);
    };

    function log(sMessage) {
        console.log(sMessage);
    };

    initBoardGame("P1", "P2");
    var fnClick = function(oEvent) {
        playerTurn(oEvent.target.getAttribute("name"));
    }.bind(this);
    $(cellElement).on(click, fnClick);

}(document, "click", "td", "#header", "p1", "p2"))