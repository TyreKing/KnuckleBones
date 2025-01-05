let turn = 0;
let hasRolled = false;
let p1Board = {
    "c0": [],
    "c1": [],
    "c2": []
};
let p2Board = {
    "c0": [],
    "c1": [],
    "c2": []
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
        "c2": []
    };
    p2Board = {
        "c0": [],
        "c1": [],
        "c2": []
    };
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
        for (let row = 2; row >=0; row--) {
           const currRow =  table[row].getElementsByTagName('td')
            if (!currRow[column].innerHTML) {
                switch(column) {
                    case 0:
                        p1Board.c0.push(dieNumber);
                        break;
                    case 1:
                        p1Board.c1.push(dieNumber);
                        break;
                    default:
                        p1Board.c2.push(dieNumber);
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
                switch(column) {
                    case 0:
                        p2Board.c0.push(dieNumber);
                        break;
                    case 1:
                        p2Board.c1.push(dieNumber);
                        break;
                    default:
                        p2Board.c2.push(dieNumber);
                        break;
                }
                currRow[column].innerHTML = dieNumber;
                break;
            }
        }
        turn = 1;
        console.log(p1Board);
        console.log(p2Board);
    }
    hasRolled = false;


}

function updateColumn(p1Column, p2Column) {
    const p1Table = document.querySelectorAll('table.p1-table tbody tr td');
    const p2Table = document.querySelectorAll('table.p2-table tbody tr td');

    let c1 = [];
    const counts = {};
    for (const num of c1) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

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