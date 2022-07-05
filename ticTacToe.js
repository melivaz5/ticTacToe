let board;
let playerX = "X";
let player0= "0";
let winner;
let currentPlayer = playerX;
let gameOver= false;

window.onload = function () {
    setGame();
}

    function setGame() {
        board = [
            [' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' '],
        ]
        
        for (let row = 0; row < 3; row ++) {
            for(let column = 0; column < 3; column ++){
                //<div id="0-0"></div>
                let tile = document.createElement("div");
                tile.id = row.toString() + "-" + column.toString();
                tile.classList.add("tile");
                if(row == 0 || row == 1){
                    tile.classList.add("horizontal-line");
                }
                if(column == 0 || column == 1){
                    tile.classList.add("vertical-line");
                }
                tile.addEventListener("click", setTile);
                document.getElementById("board").append(tile);
            }
        }
    }

    function setTile () {
        if (gameOver) {
            return;                       // si es true hacemos los tile unclickeable y salimos de la funcion.
        }
        let coords = this.id.split ("-")  // "1-1" ->  ("1" , "1")     // this   se refiere a la tile que clickee.
        let row = parseInt (coords[0]);
        let column = parseInt (coords[1]);

        if (board[row][column] != ' '){
            return;
        }
        board[row][column] = currentPlayer;
        this.innerText = currentPlayer;   // Cambia el HTML

        if(currentPlayer == playerX){
            currentPlayer = player0;
        } 
        else {
            currentPlayer = playerX;
        }
        checkWinner();
    }

    function checkWinner() {
        // horizontally
        for(let row = 0; row < 3; row ++){
            if (board[row][0] == board[row][1] && board[row][1] == board[row][2] && board[row][0] != ' '){
                for(let i = 0; i < 3; i++){
                    let tile = document.getElementById(row.toString() + "-" + i.toString());
                    tile.classList.add("winner");
                }
                gameOver = true;
                return;
            }
        }

        // vertically
        for(let column = 0; column < 3; column ++){
            if(board[0][column] == board[1][column] && board[1][column] == board[2][column] && board[0][column] != ' '){
                for(let i = 0; i < 3; i ++){
                    let tile = document.getElementById(i.toString() + "-" + column.toString());
                    tile.classList.add("winner");
                }
                gameOver = true;
                return;
            }
        }
        // diagonally
        if(board[0][0] == board[1][1] && board [1][1] == board[2][2] && board [0][0] != ' '){
            let tile = document.getElementById("0-0");
            tile.classList.add("winner");

            tile = document.getElementById("1-1");
            tile.classList.add("winner");

            tile = document.getElementById("2-2");
            tile.classList.add("winner");

            gameOver = true;
            return;
        }

        //anti-diagonally
        if(board[0][2] == board[1][1] && board [1][1] == board[2][0] && board [0][2] != ' '){
            let tile = document.getElementById("0-2");
            tile.classList.add("winner");

            tile = document.getElementById("1-1");
            tile.classList.add("winner");

            tile = document.getElementById("2-0");
            tile.classList.add("winner");

            gameOver = true;
            return;
        }
    }