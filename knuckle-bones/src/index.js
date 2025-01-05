
function rollDie(player) {

    let turn = isInt(player);
    if (turn) {
        const min = 1;
        const max = 6;
        
        const die = Math.floor(Math.random() * (max - min + 1)) + min;
        if ( player === 1) {
            let element = document.getElementById("p1-board").getElementsByTagName('h2');
            element[0].innerHTML = die;
        }
        else {
            let element = document.getElementById("p2-board").getElementsByTagName('h2');
            element[0].innerHTML = die;
        }
    }
}

function isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}

