function Letter(char) {
    this.char = char;
    this.isRevealed = false;

    if(char === ' ') {
        this.isRevealed = true;
    }
}

Letter.prototype.reveal = function() {
    this.isRevealed = true;
};

module.exports = Letter;