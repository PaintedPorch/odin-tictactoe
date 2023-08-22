const boardSpots = document.querySelectorAll(".space");
const resetBoard = document.querySelector(".reset");
const whoStartsText = document.querySelector(".currentStarter");
const resultText = document.querySelector(".results");

const gameBoard = (function() {
    "use strict";

    let _movesArray = [' ',' ',' ',' ',' ',' ',' ',' ',' ']; // length 9
    let moveCount = 0;

    function _displayMoves() {
        for (let i = 0; i < _movesArray.length; i++) {
            _checkScores();

            if (_movesArray[i] == 'X') {
                boardSpots[i].innerHTML = `<div class="blackPiece"></div>`; 
            }
            else if (_movesArray[i] == 'Y') {
                boardSpots[i].innerHTML = `<div class="whitePiece"></div>`;
            }
            console.log(boardSpots[i].textContent);
        }

        _placePawn();
    }

    // Add gamecount, if gamecount % 2 == 1, playerOne starts true, else false
    // generate random number of index not yet taken for computer mode

    let whoStartsPlayer = 0;

    function _placePawn() {
        let playerOne = true;

        for (let j = 0; j < _movesArray.length; j++) {
            boardSpots[j].addEventListener("click", function() {
                if (_movesArray[j] == ' ' && playerOne == true) {
                    moveCount++;

                    console.log(moveCount);

                    _movesArray[j] = 'X';
                    _displayMoves();

                    whoStartsText.textContent = "";

                    playerOne = false;
                }
                else if (_movesArray[j] == ' ' && playerOne == false) {
                    moveCount++;

                    console.log(moveCount);

                    _movesArray[j] = 'Y';
                    _displayMoves();

                    whoStartsText.textContent = "";

                    playerOne = true;
                }
            });
        }
    }

    function _resetField() {
        resetBoard.addEventListener("click", function() {
            _movesArray = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
            whoStartsPlayer++;
            moveCount = 0;

            if (whoStartsPlayer % 2 == 0) {
                whoStartsText.textContent = "Player One Starts";
            }
            else if (whoStartsPlayer % 2 == 1) {
                whoStartsText.textContent = "Player Two Starts";
            }
            
            for (let i = 0; i < _movesArray.length; i++) {
                boardSpots[i].innerHTML = ``; 
            }
            
            console.clear();
        });
    }

    function _checkScores() {
        /* 
            If _movesArray indicates three in a row, such as with:
            Y-Y-Y or Y-?-?-Y-?-?-Y-?-? or Y-?-?-?-Y-?-?-?-Y or
            ?-?-Y-?-Y-?-Y-?-? or Y-?-?-Y-?-?-Y-?-? or ?-Y-?-?-Y-?-?-Y-? or
            ?-?-Y-?-?-Y-?-?-Y

            else Tie
        */

        let displayText = "";

        if (_movesArray.slice(0, 3) === ['Y', 'Y', 'Y']) displayText = "Player Two Wins";
        else if (_movesArray.slice(3, 6) == ['Y','Y','Y']) displayText = "Player Two Wins";
        else if (_movesArray.slice(6, 9) == ['Y','Y','Y']) displayText = "Player Two Wins";

        else if (_movesArray.slice(1, 3) == ['X','X','X']) displayText = "Player One Wins";
        else if (_movesArray.slice(3, 6) == ['X','X','X']) displayText = "Player One Wins";
        else if (_movesArray.slice(6, 9) == ['X','X','X']) displayText = "Player One Wins";
        
        else {
            console.log(_movesArray.slice(0, 3));
            displayText = "In Progress"; 
        }
        
        if (moveCount == 9) {
            displayText = "Tie";
        }

        resultText.textContent = displayText;
    }

    // Make function to check if there are 3 Y's or X's next to each other

    return {
        movesArray: _movesArray,
        displayMoves: _displayMoves,
        resetField: _resetField,
    };
})();

gameBoard.displayMoves();
gameBoard.resetField();

const displayController = (function() {
    "use strict";

})();

const player = () => {

};