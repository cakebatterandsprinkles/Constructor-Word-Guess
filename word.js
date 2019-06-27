const Letter = require("./letter.js");

var Word = function (str) {
    this.letters = [];
    for (var i = 0; i < str.length; i++) {
        const letter = new Letter(str[i]);
        this.letters.push(letter);
    }
};

Word.prototype.print = function () {
    let lineToPrint = '';
    this.letters.forEach(function (item) {
        if (item.isRevealed) {
            lineToPrint = lineToPrint + item.char + " ";
        } else {
            lineToPrint = lineToPrint + "_" + " ";
        }
    });
    console.log(lineToPrint);
};

Word.prototype.revealAll = function() {
    this.letters.forEach(function(letter) {
        letter.reveal();
    });
    this.print();
};

Word.prototype.reveal = function (char) {
    let hit = false;
    this.letters.forEach(function (letter) {
        if (letter.char.toLowerCase() === char.toLowerCase()) {
            letter.reveal();
            hit = true;
        }
    });

    this.print();
    return hit;
};

Word.prototype.allRevealed = function () {

    let allRevealed = true; 

    this.letters.forEach(function(letter) {
        if(!letter.isRevealed) {
            allRevealed = false;
        }
    });

    return allRevealed;


//Another way of doing this:
    // for (let i = 0; i < this.letters.length; i++) {
    //     if (!this.letters[i].isRevealed) {
    //         return false;
    //     }
    // }

    // return true;
};

module.exports = Word;