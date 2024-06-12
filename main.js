(function() {


    // variables

    const turn = document.getElementById('turn');
    const domScore = document.getElementById('domScore');
    const result = document.getElementById('result');
    const gameArea = document.getElementById('gameArea');
    const domBoard = document.getElementById('domBoard');
    const startBtn = document.getElementById('startBtn');
    const nameForm = document.getElementById('nameForm');
    const nameOne = document.getElementById('nameOne');
    const nameTwo = document.getElementById('nameTwo');
    const restartBtn = document.getElementById('restartBtn');

    let playerOne;
    let playerTwo;
    let player;


    // listeners

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);


    // manage gameboard

    const gameboard = (function() {

        let board = [
            [ "", "", ""],
            [ "", "", ""],
            [ "", "", ""]
        ];

        return { board };

    })();

    function resetBoard() {

        gameboard.board = [
            [ "", "", ""],
            [ "", "", ""],
            [ "", "", ""]
        ];

        updateGrid();

    }


    // function to create player one and two

    const createPlayer = function(name, mark) {
        
        let score = 0;

        function win() {

            ++score;

            result.innerText = `${name} win!`;

            if (!result.innerText.includes('WON')) {

                setTimeout(() => {
                result.innerText = '';
            }, 1000);

            }

        };

        function getScore() {

            return score;

        };

        function resetScore() {
            score = 0;
        }

        return { name, mark, win, getScore, resetScore };

    };
    
    
    // create players and start the game

    function startGame() {
        
        nameForm.style.display = 'none';
        gameArea.style.display = 'flex';

        playerOne = createPlayer(
            nameOne.value == '' ? 'Player One' : nameOne.value,
            'X');
        playerTwo = createPlayer(
            nameTwo.value == '' ? 'Player Two' : nameTwo.value,
            'O');

        randomPlayer();
        showScore();

        domBoard.addEventListener('click', markGrid);
    };

    // reset score and gameboard

    function restartGame() {

        result.innerText = '';

        playerOne.resetScore();
        playerTwo.resetScore();
        resetBoard();
        showScore();
        randomPlayer();

        domBoard.addEventListener('click', markGrid);
                
    };

    // choose random player

    function randomPlayer() {
        
        playerRandomSel = Math.floor(Math.random() * 2);
        player = playerRandomSel === 0 ? playerOne : playerTwo;

        turn.innerText = `${player.name} Starts`;

    };


    // show score
    function showScore() {
        domScore.innerText = `${playerOne.getScore()} - ${playerTwo.getScore()}`;
    };

    
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

            turn.innerText = 'the cell is already taken!';

            setTimeout(() => {turn.innerText = `${player.name} Turn`}, 1000);

            return;

        };

        checkWin();

        if (
            playerOne.getScore() < 3 &&
            playerTwo.getScore() < 3
        ) {

            switchPlayer();

            turn.innerText = `${player.name} Turn`;

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

            domBoard.removeEventListener('click', markGrid);

            setTimeout(() => {
                result.innerText = '';
            }, 1000);
            
            setTimeout(resetBoard, 1000);

            setTimeout(() => domBoard.addEventListener('click', markGrid), 1000);
    
        };

    };


    // show score and who won the game

    function winScore() {

        player.win();

        showScore();

        if (
            playerOne.getScore() > 2 ||
            playerTwo.getScore() > 2
        ) {
            
            setTimeout(() => {result.innerText = `${player.name}
                                                    WON THE GAME!!!`}, 1000);

            domBoard.removeEventListener('click', markGrid);

            turn.innerText = '';

            return;

        } else {
            
            domBoard.removeEventListener('click', markGrid);
            
            setTimeout(() => domBoard.addEventListener('click', markGrid), 1000);

            setTimeout(resetBoard, 1000);

        }

        return;
    
    }


    // show player marks on grid

    function markGrid(e) {

        const boardDisp = [
            ['cell1', 'cell2', 'cell3'],
            ['cell4', 'cell5', 'cell6'],
            ['cell7', 'cell8', 'cell9']
        ];

        const target = e.target;

        if (target.innerText == '' && target.classList.contains('cell')) {

            target.innerText = player.mark;

        };

        for (i = 0; i < boardDisp.length; i++) {

            const index = boardDisp[i].indexOf(target.id);

            if (index > -1) {

                play(i,index);

            }
        }
    };


    // update grid to show array on frontend

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

})();