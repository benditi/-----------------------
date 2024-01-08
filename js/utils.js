'use strict';

//render mat
function renderMat(mat) {
    var strHTML = '';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cellClass = '';
            cellClass = 'blank'
            var tdId = `cell-${i}-${j}`;
            strHTML += `<td class="${cellClass}" id="${tdId}" onclick="cellClicked(this,${i},${j})"
            oncontextmenu="cellMarked(${i},${j})"></td>`
        }
        strHTML += '</tr>'
    }
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}

//oncontextmenu="cellMarked()"



// render cell location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

//return random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// get empty cell
function getEmptyCell() {
    var emptyCells = getEmptyCells();
    var idx = getRandomIntInclusive(0, emptyCells.length - 1);
    var emptyCell = emptyCells[idx];
    return emptyCell;
}


// get empty cells
function getEmptyCells(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isShown ===false){
                emptyCells.push({ i:i, j:j });
            }
        }
    }
    return emptyCells;
}

// random number inclusive max
function getRandomIntegerInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// random number NOT inclusive max
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// copy mat
function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        // newMat[i] = mat[i].slice();
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

// Neighbors loop
function getNegs(cellI, cellJ, board) {
    var negs = [];
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === cellI && j === cellJ) continue
            negs.push({i:i, j:j});
        }
    }
    return negs;
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

// Sort the numbers in ascending order
// points.sort(function (a, b) { return a - b });

// timer
function startTimer() {
    renderTimer();
    gStartTime = Date.now();
    gTimerInterval = setInterval(function () {
        var msDiff = Date.now() - gStartTime;
        var secs = '' + parseInt((msDiff / 1000) % 60);
        if (secs.length === 1) secs = '0' + secs;

        var min = '' + parseInt(msDiff / 1000 / 60);
        if (min.length === 1) min = '0' + min;

        var strMsDiff = '' + msDiff;

        var miliSecs = strMsDiff.charAt(strMsDiff.length - 3) +
            strMsDiff.charAt(strMsDiff.length - 2);

        if (miliSecs.length === 1) miliSecs = '0' + miliSecs;
        console.log(miliSecs);

        var passedTime = `${min}:${secs}.${miliSecs}`;
        var elTimer = document.querySelector('.timer');
        elTimer.innerText = passedTime;
    },
        10);
}

function createMat(rowsIdx, colsIdx){
    var newMat = []
    for (var i = 0; i < rowsIdx; i++) {
        newMat[i] = [];
        for (var j = 0; j < colsIdx; j++) {
            newMat[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
    return newMat;
}

