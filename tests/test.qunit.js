requirejs(["../game/scripts/app.js"], function () {
    let game = app.fnGame("click", "td", "#header", "p1", "p2", "Game over", "ShayZambrovski", "MaayanDagan");
    let expcetedGameBoard = {
        player: ["ShayZambrovski", "MaayanDagan"],
        gameBoard: [
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
        playerTurn: "ShayZambrovski"
    };
    QUnit.test("Test creation of game board, players moves, and winning", function (assert) {
        assert.deepEqual(expcetedGameBoard, app.game, "game board is created");
        
        expcetedGameBoard.gameBoard[0][5] = "ShayZambrovski"; //first player played
        expcetedGameBoard.playerTurn = 'MaayanDagan';
        game.playerTurn('00');
        assert.deepEqual(expcetedGameBoard, app.game, "Test player move and playerTurn name is changed");
        
        expcetedGameBoard.gameBoard[1][5] = "MaayanDagan"; //second player played
        expcetedGameBoard.playerTurn = 'ShayZambrovski';
        game.playerTurn('21');
        assert.deepEqual(expcetedGameBoard, app.game, "Test player move and playerTurn name is changed");
        
        expcetedGameBoard.gameBoard[0][4] = "ShayZambrovski"; //first player played
        expcetedGameBoard.playerTurn = 'MaayanDagan';
        game.playerTurn('10');
        assert.deepEqual(expcetedGameBoard, app.game, "Test player move and playerTurn name is changed");
        
        expcetedGameBoard.gameBoard[1][4] = "MaayanDagan"; //second player played
        expcetedGameBoard.playerTurn = 'ShayZambrovski';
        game.playerTurn('31');
        assert.deepEqual(expcetedGameBoard, app.game, "Test player move and playerTurn name is changed");
        
        expcetedGameBoard.gameBoard[0][3] = "ShayZambrovski"; //first player played
        expcetedGameBoard.playerTurn = 'MaayanDagan';
        game.playerTurn('20');
        assert.deepEqual(expcetedGameBoard, app.game, "Test player move and playerTurn name is changed");
        
        expcetedGameBoard.gameBoard[1][3] = "MaayanDagan"; //second player played
        expcetedGameBoard.playerTurn = 'ShayZambrovski';
        game.playerTurn('41');
        assert.deepEqual(expcetedGameBoard, app.game, "Test player move and playerTurn name is changed");
        
        expcetedGameBoard.gameBoard[0][2] = "ShayZambrovski"; //first player played
        expcetedGameBoard.playerTurn = 'MaayanDagan';
        game.playerTurn('30');
        assert.deepEqual(expcetedGameBoard, app.game, "Test player move and playerTurn name is changed");
    });
});
