'use strict';

var fnGame = function (click, cellElement, headerElementID, p1Class, p2Class, sGameEnd, sPlayer1Name, sPlayer2Name) {
    var fnClick = function (oEvent) {
        playerTurn(oEvent.target.getAttribute("name"));
    }.bind(this);

    var fnEndGame = function (player) {
        //$(cellElement).off(click, fnClick);
        //$(headerElementID).html(player + " is the winner!!! " + sGameEnd);
        window.endGameTime = new Date().getTime();
        $.post("../server/end_game.php", {
            winner: player,
            duration: ((window.endGameTime - window.startGameTime) / 1000)
        }, function (result) {
            result = JSON.parse(result);
            let oTable = $(".panel-body");
            if (result.status === 'ERROR') {
                alert(result.message);
            } else {
                $(cellElement).off(click, fnClick);
                $(headerElementID).html(result.winner + " is the winner!!!<br>Game duration = " + result.duration + '<br>' + sGameEnd);
            }
        });
    };

    function error(sMessage) {
        console.error(sMessage);
    };

    function log(sMessage) {
        console.log(sMessage);
    };

    var checkForWin = function (player) {
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

    var playerTurn = function (cell) {
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

    var initBoardGame = function () {
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
    this.playerTurn = playerTurn;
    return this;
}.bind(this);

function fnClearTable() {
    $("td").each((index, td) => {
        $(td).removeClass();
    });
};

function updateModal(sTitle, sContent) {
    $('.modal-title').html(sTitle);
    $('.modal-body').html(sContent);
    $('#my-modal').modal('show');
    $('#submit-button').on('click', function (oEvent) {
        $('.modal-title').html('');
        $('.modal-body').empty();
    }.bind(this));
}

$(".panel-body").hide();
$("#start_game").on("click", (oEvent) => {
    let p1 = $("#p1").val();
    let p2 = $("#p2").val();
    let p1Pass = $("#p1-pass").val();
    let p2Pass = $("#p2-pass").val();
    $.post("../server/sign_players.php", {
        p1: p1,
        p1Pass: p1Pass,
        p2: p2,
        p2Pass: p2Pass
    }, function (result) {
        result = JSON.parse(result);
        fnClearTable();
        let oTable = $(".panel-body");
        if (result.status === 'ERROR') {
            updateModal(result.status, result.message);
            oTable.hide();
        } else {
            if (!oTable.is(":visible")) {
                oTable.show("slow");
            }
            window.startGameTime = new Date().getTime();
            $("td").off("click");
            fnGame("click", "td", "#header", "p1", "p2", "Game over", p1, p2);
        }
    });
});
$("#new_game").on("click", (oEvent) => {
    location.reload();
});
$("#top5").on("click", (oEvent) => {
    $.get("../server/top_5.php", function (result) {
        result = JSON.parse(result);
        let oTable = $(".panel-body");
        if (result.status === 'ERROR') {
            updateModal(result.status, result.message);
            oTable.hide();
        } else {
            updateModal('Top 5', result.message);
        }
    });
});
$("#fastets_game").on("click", (oEvent) => {
    $.get("../server/fastets_game.php", function (result) {
        result = JSON.parse(result);
        let oTable = $(".panel-body");
        if (result.status === 'ERROR') {
            updateModal(result.status, result.message);
            oTable.hide();
        } else {
            updateModal('Fastest game', result.message);
        }
    });
});
$("#all_games").on("click", (oEvent) => {
    $.get("../server/all_games.php", function (result) {
        result = JSON.parse(result);
        let oTable = $(".panel-body");
        if (result.status === 'ERROR') {
            updateModal(result.status, result.message);
            oTable.hide();
        } else {
            updateModal('All games', result.message);
        }
    });
});
var app = this;
