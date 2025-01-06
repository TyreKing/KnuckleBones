let turn = 0;
let hasRolled = false;
let p1Board = {
    "c0": [],
    "c1": [],
    "c2": [],
    "ct": 0
};
let p2Board = {
    "c0": [],
    "c1": [],
    "c2": [],
    "ct": 0
};

function start() {
    turn = 1;
    const startBtn = document.getElementById('start');
    startBtn.hidden = true;

    const restartBtn = document.getElementById('restart');
    restartBtn.hidden = false;
}

function restart() {
    clearDice();
    turn = 0;
    const startBtn = document.getElementById('start');
    startBtn.hidden = false;

    const restartBtn = document.getElementById('restart');
    restartBtn.hidden = true;

    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.innerHTML = ''
    });
    p1Board = {
        "c0": [],
        "c1": [],
        "c2": [],
        "ct": 0
    };
    p2Board = {
        "c0": [],
        "c1": [],
        "c2": [],
        "ct": 0
    };

    let headers = document.querySelectorAll('table tbody tr.headers th');
    headers.forEach(header => {
        header.innerHTML = 0;
    });

    hasRolled = false;
    document.getElementById("p1-score").innerHTML = 0;
    document.getElementById("p2-score").innerHTML = 0;
}

function clearDice(){
    turn = 1;
    getDie().innerHTML = 'DICE';
    turn = 2;
    getDie().innerHTML = 'DICE';
}

function rollDie(player) {
    let isNum = isInt(player);
    if(hasRolled === true) {
        alert('You can only roll once per turn.');
        return;
    }
    if (isNum && turn == player) {
        const min = 1;
        const max = 6;
        
        const die = Math.floor(Math.random() * (max - min + 1)) + min;
        if ( player === 1) {
            let element = getDie();
            element.innerHTML = die;
        }
        else {
            let element = getDie();
            element.innerHTML = die;
        }
        hasRolled = true
    }
}

function insertDie(column) {
    if (turn === 0) {
        alert('Please start the game');
        return;
    }
    if (hasRolled === false) {
        alert('You must roll first.');
        return;
    }
    const dieNumber = getDie().innerHTML;
    if (turn === 1) {
        const table = document.querySelectorAll('table.p1-table tbody tr');
        let turnTaken = false;
        for (let row = 2; row >=0; row--) {
           const currRow =  table[row].getElementsByTagName('td')
            if (!currRow[column].innerHTML) {
                let headers = document.querySelector('table.p1-table tbody tr.headers');
                switch(column) {
                    case 0:
                        p1Board.c0.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c0);
                        removeFromBoard(column, dieNumber);
                        break;
                    case 1:
                        p1Board.c1.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c1);
                        removeFromBoard(column, dieNumber);
                        break;
                    default:
                        p1Board.c2.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c2);
                        removeFromBoard(column, dieNumber);
                        break;
                }
                currRow[column].innerHTML = dieNumber;
                turnTaken = true;
                break;
            }
        }
        if (!turnTaken) {
            alert("Column is full. \n Select a different column.");
        }
        else {
            turn = 2;
            hasRolled = false;
        }
    }
    else if (turn === 2) {
        const table = document.querySelectorAll('table.p2-table tbody tr');
        let turnTaken = false;
        for (let row = 1; row <= 3; row++) {
           const currRow =  table[row].getElementsByTagName('td')
            if (!currRow[column].innerHTML) {
                let headers = document.querySelector('table.p2-table tbody tr.headers');
                switch(column) {
                    case 0:
                        p2Board.c0.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c0);
                        removeFromBoard(column, dieNumber);
                        break;
                    case 1:
                        p2Board.c1.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c1);
                        removeFromBoard(column, dieNumber);
                        break;
                    default:
                        p2Board.c2.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c2);
                        removeFromBoard(column, dieNumber);
                        break;
                }
                currRow[column].innerHTML = dieNumber;
                turnTaken = true;
                break;
            }
        }
        if (!turnTaken) {
            alert("Column is full. \n Select a different column.");
        }
        else {
            turn = 1;
            hasRolled = false;
        }
    }
    const p1Score = setScore(document.querySelectorAll('table.p1-table tbody tr.headers th'), document.getElementById("p1-score"));
    const p2Score = setScore(document.querySelectorAll('table.p2-table tbody tr.headers th'), document.getElementById("p2-score"));
    if (GameStatus()) {
        const winnerMessage = p1Score > p2Score ? 'Player 1 WINS \n Score: ' + p1Score : 'Player 2 WINS \n Score: ' + p2Score;
        alert(winnerMessage);
        turn = 0;
    }
}

function setScore(headers, playerScoreElement) {
   // const headers = document.querySelectorAll('table.p1-table tbody tr.headers th')
    let score = 0;
    headers.forEach(columnScore => {
        score += parseInt(columnScore.innerHTML);
    });
    playerScoreElement.innerHTML = score;
    return score;
}

function GameStatus() {
    if (p1Board.c0.length === 3 && p1Board.c1.length === 3 && p1Board.c2.length === 3) {
        return true;
    }

    if (p2Board.c0.length === 3 && p2Board.c1.length === 3 && p2Board.c2.length === 3) {
        return true;
    }

    return false;
}

function removeFromBoard(column, dieNumber) {
    switch (column) {
        case 0:
            if(turn === 1) {
                if (p2Board.c0.includes(dieNumber)) {
                    const temp = p2Board.c0;
                    p2Board.c0 = temp.filter(item => item !== dieNumber);
                    document.querySelector('table.p2-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c0);
                    const p2Col = document.querySelectorAll('table.p2-table tbody tr:not(.headers) td.c0');
                    for (let index = 0; index < p2Col.length; index++) {
                        if (p2Board.c0[index]) {
                            p2Col[index].innerHTML = p2Board.c0[index];
                        }
                        else {
                            p2Col[index].innerHTML = '';
                        }
                    }
                }
            }
            else {
                if (p1Board.c0.includes(dieNumber)) {
                    const temp = p1Board.c0;
                    p1Board.c0 = temp.filter(item => item !== dieNumber);
                    document.querySelector('table.p1-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c0);
                    const p1Col = Array.from(document.querySelectorAll('table.p1-table tbody tr:not(.headers) td.c0')).reverse();
                    for (let index = 0; index < p1Col.length; index++) {
                        if (p1Board.c0[index]) {
                            p1Col[index].innerHTML = p1Board.c0[index];
                        }
                        else {
                            p1Col[index].innerHTML = '';
                        }
                    }
                }
            }
            
        break;

        case 1:
            if (turn === 1) {
                if (p2Board.c1.includes(dieNumber)) {
                    const temp = p2Board.c1;
                    p2Board.c1 = temp.filter(item => item !== dieNumber);
                    document.querySelector('table.p2-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c1);
                    const p2Col = document.querySelectorAll('table.p2-table tbody tr:not(.headers) td.c1');
                    for (let index = 0; index < p2Col.length; index++) {
                        if (p2Board.c1[index]) {
                            p2Col[index].innerHTML = p2Board.c1[index];
                        }
                        else {
                            p2Col[index].innerHTML = '';
                        }
                    }
                }
            }
            else {
                if (p1Board.c1.includes(dieNumber)) {
                    const temp = p1Board.c1;
                    p1Board.c1 = temp.filter(item => item !== dieNumber);
                    document.querySelector('table.p1-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c1);
                    const p1Col = Array.from(document.querySelectorAll('table.p1-table tbody tr:not(.headers) td.c1')).reverse();
                    for (let index = 0; index < p1Col.length; index++) {
                        if (p1Board.c1[index]) {
                            p1Col[index].innerHTML = p1Board.c1[index];
                        }
                        else {
                            p1Col[index].innerHTML = '';
                        }
                    }
                }
            }
        break;

        default:
            if (turn === 1) {
                if (p2Board.c2.includes(dieNumber)) {
                    const temp = p2Board.c2;
                    p2Board.c2 = temp.filter(item => item !== dieNumber);
                    document.querySelector('table.p2-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c2);
                    const p2Col = document.querySelectorAll('table.p2-table tbody tr:not(.headers) td.c2');
                    for (let index = 0; index < p2Col.length; index++) {
                        if (p2Board.c2[index]) {
                            p2Col[index].innerHTML = p2Board.c2[index];
                        }
                        else {
                            p2Col[index].innerHTML = '';
                        }
                    }
                }
            }
            else {
                if (p1Board.c2.includes(dieNumber)) {
                    const temp = p1Board.c2;
                    p1Board.c2 = temp.filter(item => item !== dieNumber);
                    document.querySelector('table.p1-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c2);
                    const p1Col = Array.from(document.querySelectorAll('table.p1-table tbody tr:not(.headers) td.c2')).reverse();
                    for (let index = 0; index < p1Col.length; index++) {
                        if (p1Board.c2[index]) {
                            p1Col[index].innerHTML = p1Board.c2[index];
                        }
                        else {
                            p1Col[index].innerHTML = '';
                        }
                    }
                }
            }
        break;
    }
    
}

function getColumnSum(column) {
    const p1Occurances = {};
    for (const num of column) {
        p1Occurances[num] = p1Occurances[num] ? p1Occurances[num] + 1 : 1;
    }

    let p1Sum = 0;
    for (const num of column) {
        p1Sum += num * p1Occurances[num];
    }

    return p1Sum;
}


function getDie() {
    if (turn == 1){
        return document.getElementById('p1-board').getElementsByTagName('h2')[0];
    }
    
    return document.getElementById('p2-board').getElementsByTagName('h2')[0];
}

function isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}