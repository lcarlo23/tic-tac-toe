// create gameboard

const gameboard = (function() {

    let board = [
        [ "", "X", "O"],
        [ "O", "X", "X"],
        [ "X", "O", "O"]
    ];

    return { board };

})();


// create players

const createPlayer = function(name, mark) {
    
    let score = 0;

    function win() {

        ++score;

        console.log(`${name} win!`);

        gameboard.board = [
            [ "", "", ""],
            [ "", "", ""],
            [ "", "", ""]
        ];

    };

    function getScore() {

        return score;

    };

    return { name, mark, win, getScore };

};


// game functions

const game = (function() {


    // create players

    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    let player;


    // choose random player

    (function() {

        playerRandomSel = Math.floor(Math.random() * 2);

        player = playerRandomSel === 0 ? playerOne : playerTwo;

        console.log(`${player.name} Starts`);
        console.log(`to choose cell, run command: "game.play(row,column)"`)
        console.table(gameboard.board);

    })();


    // alternate players after turn
    
    function switchPlayer() {

        player = player === playerOne ? playerTwo : playerOne;

        console.log(`${player.name} Turn`);

    };


    // play function choosing row and column

    function play(row, column) {

        const cellRow = gameboard.board[row];

        if (cellRow[column] === "") {

            cellRow[column] = player.mark;

        } else {

            console.log('the cell is already taken');
            console.table(gameboard.board);

            return;

        };

        console.table(gameboard.board);

        checkWin();

        if (
            playerOne.getScore() < 3 &&
            playerTwo.getScore() < 3
        ) {
                    
            switchPlayer();

        };

    };


    // win if diagonal, row and column equal marks

    function checkWin() {

        const board = gameboard.board;
        const centerCell = board[1][1];


        // diagonal win

        if (
            centerCell != "" &&
            (
                (
                    centerCell === board[0][0] &&
                    centerCell === board[2][2]
                ) || (
                    centerCell === board[0][2] &&
                    centerCell === board[2][0]
                )
            )
        ) {

            winScore();

        };


        // line or row win

        for (let i = 0; i < board.length; i++) {

            if (
                (
                    board[i].every(cell => cell === board[i][0]) &&
                    board[i].every(cell => cell !== "")
                ) || (
                    board[0][i] === board[1][i] &&
                    board[0][i] === board[2][i] &&
                    board[0][i] !== ""
                )
            ) {
                
                winScore();

            }

        };


        // check tie

        if (
            board[0].every( i => i !== "") &&
            board[1].every( i => i !== "") &&
            board[2].every( i => i !== "")
        ) {

            gameboard.board = [
                [ "", "", ""],
                [ "", "", ""],
                [ "", "", ""]
            ];

            console.log('TIE!');
    
        };

    };


    // show score and who won the game

    function winScore() {

        player.win();

        console.log(`Score : ${playerOne.getScore()} - ${playerTwo.getScore()}`);

        if (
            playerOne.getScore() > 2 ||
            playerTwo.getScore() > 2
        ) {
            
            console.log(
                `${player.name} WON THE GAME!!!`
            );

            return;

        };

        console.table(gameboard.board);

        return;
    
    }

    return { play };
    
})();