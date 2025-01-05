let turn = 2;

function rollDie(player) {

    let isNum = isInt(player);
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
    }
}

function insertDie(column) {
    const dieNumber = getDie().innerHTML;
    if (turn == 1) {
        const table = document.querySelectorAll("table.p1-table tbody tr");
        for (let row = 2; row >=0; row--) {
           const currRow =  table[row].getElementsByTagName('td')
            if (!currRow[column].innerHTML) {
                currRow[column].innerHTML = dieNumber;
                break;
            }
        }
    }
    else {
        const table = document.querySelectorAll("table.p2-table tbody tr");
        for (let row = 1; row <= 3; row++) {
           const currRow =  table[row].getElementsByTagName('td')
            if (!currRow[column].innerHTML) {
                currRow[column].innerHTML = dieNumber;
                break;
            }
        }
    }
}

function getColumn() {
}

function getDie() {
    if (turn == 1){
        return document.getElementById("p1-board").getElementsByTagName('h2')[0];
    }
    
    return document.getElementById("p2-board").getElementsByTagName('h2')[0];
}

function isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}

