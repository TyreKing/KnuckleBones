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
        const max = 2;
        
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
        for (let row = 2; row >=0; row--) {
           const currRow =  table[row].getElementsByTagName('td')
            if (!currRow[column].innerHTML) {
                let headers = document.querySelector('table.p1-table tbody tr.headers');
                switch(column) {
                    case 0:
                        p1Board.c0.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c0);
                        removeFromBoard(column, dieNumber)
                        break;
                    case 1:
                        p1Board.c1.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c1);
                        removeFromBoard(column, dieNumber)
                        break;
                    default:
                        p1Board.c2.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p1Board.c2);
                        removeFromBoard(column, dieNumber)
                        break;
                }
                currRow[column].innerHTML = dieNumber;
                
                break;
            }
        }
        turn = 2;
    }
    else if (turn === 2) {
        const table = document.querySelectorAll('table.p2-table tbody tr');
        for (let row = 1; row <= 3; row++) {
           const currRow =  table[row].getElementsByTagName('td')
            if (!currRow[column].innerHTML) {
                let headers = document.querySelector('table.p2-table tbody tr.headers');
                switch(column) {
                    case 0:
                        p2Board.c0.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c0);
                        break;
                    case 1:
                        p2Board.c1.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c1);
                        break;
                    default:
                        p2Board.c2.push(dieNumber);
                        headers.getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c2);
                        break;
                }
                currRow[column].innerHTML = dieNumber;
                break;
            }
        }
        turn = 1;
    }
    hasRolled = false;
}

function removeFromBoard(column, dieNumber) {
    switch (column) {
        case 0:
            if (p2Board.c0.includes(dieNumber)) {
                const temp = p2Board.c0;
                p2Board.c0 = temp.filter(item => item !== dieNumber);
                document.querySelector('table.p2-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c0);
                const p2Col = document.querySelectorAll('table.p2-table tbody tr:not(.headers) td.c0');
                for (let index = 0; index < p2Col.length; index++) {
                    if (p2Board.c0[index]) {
                        p2Col[index].innerHTML = p2Board.c0[index];
                        console.log(p2Col[index]);
                    }
                    else {
                        p2Col[index].innerHTML = '';
                    }
                }
            }
        break;

        case 1:
            if (p2Board.c1.includes(dieNumber)) {
                const temp = p2Board.c1;
                p2Board.c1 = temp.filter(item => item !== dieNumber);
                document.querySelector('table.p2-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c1);
                const p2Col = document.querySelectorAll('table.p2-table tbody tr:not(.headers) td.c1');
                for (let index = 0; index < p2Col.length; index++) {
                    if (p2Board.c1[index]) {
                        p2Col[index].innerHTML = p2Board.c1[index];
                        console.log(p2Col[index]);
                    }
                    else {
                        p2Col[index].innerHTML = '';
                    }
                }
            }
        break;

        default:
            if (p2Board.c2.includes(dieNumber)) {
                const temp = p2Board.c2;
                p2Board.c2 = temp.filter(item => item !== dieNumber);
                document.querySelector('table.p2-table tbody tr.headers').getElementsByTagName("th")[column].innerHTML = getColumnSum(p2Board.c2);
                const p2Col = document.querySelectorAll('table.p2-table tbody tr:not(.headers) td.c2');
                for (let index = 0; index < p2Col.length; index++) {
                    if (p2Board.c2[index]) {
                        p2Col[index].innerHTML = p2Board.c2[index];
                        console.log(p2Col[index]);
                    }
                    else {
                        p2Col[index].innerHTML = '';
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