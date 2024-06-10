// variables

const announce = document.getElementById('turn');
const scoreBoard = document.getElementById('score');
const result = document.getElementById('result');


// create gameboard

const gameboard = (function() {

    let board = [
        [ "", "", ""],
        [ "", "", ""],
        [ "", "", ""]
    ];

    return { board };

})();


// function to create a player

const createPlayer = function(name, mark) {
    
    let score = 0;

    function win() {

        ++score;

        result.innerText = `${name} win!`;

        if (!result.innerText.includes('WON')) {

            setTimeout(() => {
            result.innerText = '';
        }, 1000);

            gameboard.board = [
                [ "", "", ""],
                [ "", "", ""],
                [ "", "", ""]
            ];

        }

    };

    function getScore() {

        return score;

    };

    return { name, mark, win, getScore };

};


// game functions

const game = (function() {


    // create players one and two

    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    let player;


    // choose random player

    (function() {
        
        playerRandomSel = Math.floor(Math.random() * 2);
        player = playerRandomSel === 0 ? playerOne : playerTwo;

        announce.innerText = `${player.name} Starts`;

    })();


    // show score
    function showScore() {
        scoreBoard.innerText = `Score : ${playerOne.getScore()} - ${playerTwo.getScore()}`;
    };

    showScore();

    
    // alternate players after turn
    
    function switchPlayer() {

        player = player === playerOne ? playerTwo : playerOne;

    };


    // play function choosing row and column

    function play(row, column) {

        const cellRow = gameboard.board[row];

        if (cellRow[column] == "") {

            cellRow[column] = player.mark;

        } else {

            announce.innerText = 'the cell is already taken!';

            setTimeout(() => {announce.innerText = `${player.name} Turn`}, 1000);

            return;

        };

        checkWin();

        if (
            playerOne.getScore() < 3 &&
            playerTwo.getScore() < 3
        ) {

            switchPlayer();

            setTimeout(updateGrid, 1000);

            announce.innerText = `${player.name} Turn`;

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

            result.innerText = 'TIE!';
            setTimeout(() => {
                result.innerText = '';
            }, 1000);
            
            gameboard.board = [
                [ "", "", ""],
                [ "", "", ""],
                [ "", "", ""]
            ];
    
        };

    };


    // show score and who won the game

    function winScore() {

        player.win();

        scoreBoard.innerText = `Score : ${playerOne.getScore()} - ${playerTwo.getScore()}`;

        if (
            playerOne.getScore() > 2 ||
            playerTwo.getScore() > 2
        ) {
            
            setTimeout(() => {result.innerText = `${player.name} WON THE GAME!!!`}, 1000);

            gameDisp.removeEventListener('click', markGrid);

            announce.innerText = '';

            return;

        } else {
            gameboard.board = [
                [ "", "", ""],
                [ "", "", ""],
                [ "", "", ""]
            ];
        }

        return;
    
    }


    // show player marks on grid

    const gameDisp = document.getElementById('gameboard');

    function updateGrid() {
    
        const board = gameboard.board;
    
        let i = 0;
    
        board.map((row) => {
    
            row.map((value) => {
    
                const cell = document.getElementById(`cell${[i+1]}`);
    
                cell.innerText = value;
    
                i++;
    
            });
    
        });
    };

    function markGrid(e) {

        const boardDisp = [
            ['cell1', 'cell2', 'cell3'],
            ['cell4', 'cell5', 'cell6'],
            ['cell7', 'cell8', 'cell9']
        ];

        const target = e.target;

        if (target.innerText == '') {

            target.innerText = player.mark;

        };

        for (i = 0; i < boardDisp.length; i++) {

            const index = boardDisp[i].indexOf(target.id);

            if (index > -1) {

                play(i,index);

            }
        }
    };

    updateGrid();
    

    // listeners

    gameDisp.addEventListener('click', markGrid);
    
})();