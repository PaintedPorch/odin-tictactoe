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
            _resetProcedure();
        });
    }

    function _resetProcedure() {
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
    }

    function _threeIndices(index1, index2, index3, array) {
        let resultArray = [];

        if (index1 > index2 || index2 > index3) {
            return "Indices should increment";
        }

        for (let i = 0; i < array.length; i++) {
            if (i == index1) resultArray.push(array[i]);
            else if (i == index2) resultArray.push(array[i]);
            else if (i == index3) resultArray.push(array[i]);
        }

        return resultArray;
    }

    function _valueMatch(array1, array2) {
        let completeMatch = true;

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                completeMatch = false;
            }
        }

        return completeMatch;
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

        // Check horizontal matches ('Y,'Y','Y' || 'X','X','X')

        if (_valueMatch(_threeIndices(0, 1, 2, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";
        else if (_valueMatch(_threeIndices(3, 4, 5, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";
        else if (_valueMatch(_threeIndices(6, 7, 8, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";

        else if (_valueMatch(_threeIndices(0, 1, 2, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";
        else if (_valueMatch(_threeIndices(3, 4, 5, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";
        else if (_valueMatch(_threeIndices(6, 7, 8, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";
        
        // End horizontal row checks
        // Check vertical rows (Y-?-?-Y-?-?-Y-?-? || X-?-?-X-?-?-X-?-?)

        /*
            Idea: extract values 1,4,7 for check one 2,5,8 for check two
            3,6,9 for check three. Make an array of these values and execute
            the _valueMatch function to see if they match Y-Y-Y or X-X-X

            These three checks are separate function calls
        */

        else if (_valueMatch(_threeIndices(0, 3, 6, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";
        else if (_valueMatch(_threeIndices(1, 4, 7, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";
        else if (_valueMatch(_threeIndices(2, 5, 8, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";

        else if (_valueMatch(_threeIndices(0, 3, 6, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";
        else if (_valueMatch(_threeIndices(1, 4, 7, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";
        else if (_valueMatch(_threeIndices(2, 5, 8, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";

        // End vertical checks
        // Check downwards diagonal (Y-?-?-?-Y-?-?-?-Y)

        else if (_valueMatch(_threeIndices(0, 4, 8, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";

        else if (_valueMatch(_threeIndices(0, 4, 8, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";

        // End check downwards diagonal
        // Check upwards diagonal (?-?-Y-?-Y-?-Y-?-?)

        else if (_valueMatch(_threeIndices(2, 4, 6, _movesArray), ['Y','Y','Y']) == true) displayText = "Player Two Wins";

        else if (_valueMatch(_threeIndices(2, 4, 6, _movesArray), ['X','X','X']) == true) displayText = "Player One Wins";

        // End check downwards diagonal

        else {
            displayText = "In Progress"; 
        }
        
        if (moveCount == 9) {
            displayText = "Tie";
        }

        resultText.textContent = displayText;
    }

    // Make function to check if there are 3 Y's or X's next to each other

    return {
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