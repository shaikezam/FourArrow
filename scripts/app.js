'use strict';

$.when(
    $.getScript("../scripts/game.js"),
    $.getScript("../scripts/player.js")
).done(function(Game, Player) {

    var fnGame = function(click, cellElement, headerElementID, p1Class, p2Class, sGameEnd, sPlayer1Name, sPlayer2Name) {

        var fnClick = function(oEvent) {
            playerTurn(oEvent.target.getAttribute("name"));
        }.bind(this);

        var fnEndGame = function(player) {
            $(cellElement).off(click, fnClick);
            $(headerElementID).html(player + " is the winner!!! " + sGameEnd);
        };

        function error(sMessage) {
            console.error(sMessage);
        };

        function log(sMessage) {
            console.log(sMessage);
        };

        var checkForWin = function(player) {
            let game = this.game;
            let oGameBoard = game.gameBoard;
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
        }.bind(this);

        var playerTurn = function(cell) {
            if (!cell) {
                error("cell isn't found");
                return;
            }
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
                    $(headerElementID).html(game.playerTurn + " turn");
                    checkForWin(aColumn[i]);
                    return;
                }
            }
        }.bind(this);

        var initBoardGame = function() {
            $(headerElementID).html(sPlayer1Name + " turn");
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
            };
        }.bind(this);

        initBoardGame();

        if (!($(cellElement).data('events'))) {
            $(cellElement).on(click, fnClick);
        }


    }.bind(this);

    function fnClearTable() {
        $("td").each((index, td) => {
            $(td).removeClass();
        });
    };

    $(document).ready((oEvent) => {
        window.temp = '123';
        $(".panel-body").hide();
        $("#start_game").on("click", (oEvent) => {
            let p1 = $("#p1").val();
            let p2 = $("#p2").val();
            if ((p1 && p2) && (p1 !== p2)) {
                fnClearTable();
                let oTable = $(".panel-body");
                if (!oTable.is(":visible")) {
                    oTable.show("slow");
                }
                $("td").off("click");
                fnGame("click", "td", "#header", "p1", "p2", "Game over", p1, p2);
            }
        });
        $("#new_game").on("click", (oEvent) => {
            location.reload();
        });
    });

}.bind(this));