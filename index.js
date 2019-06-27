//require inquirer
const inquirer = require('inquirer');
//require axios
const axios = require('axios');
//require chalk, give error messages red color
const chalk = require('chalk');
//require word.js file
const Word = require("./word.js");

//define randomLog arrays

let randomLogWin = ["To become Hokage is my dream!", "Dattebayo!", "Okashi ga suki desu!", "Konnichiwa!", "Itadakimasu!", "suki desu"];
let randomLogLose = ["Gomennasai", "Wakarimasen", "dame desu", "O genki de", "dame desu", "Shitsurei Shimasu"];

//define a randomMovie array
let randomMovie = ["life is beautiful", "the godfather", "pulp fiction", "the dark knight", "spirited away", "casablanca",
    "doctor strangelove", "jaws", "moonlight", "the terminator", "a clockwork orange", "no country for old men", "forrest gump",
    "one flew over the cuckoos nest", "howls moving catsle", "inception", "seven samurai", "pans labirynth", "the big lebowski",
    "the sixth sense", "the usual suspects", "raiders of the lost ark", "gladiator", "titanic", "memento", "garden state",
    "good will hunting", "a beautiful mind", "prates of the carribbean", "braveheart"
];


let randomNumber = 0;
let isWon;
let wins = 0;
let losses = 0;

// write a function to generate a random number between 0-6
function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 7);
}

//inquire the user to keep playing or stop after each finished game
function randomLog() {
    randomNumber = generateRandomNumber();
    if (isWon) {
        chalk.yellow(console.log(randomLogWin[randomNumber]));
    } else if (!isWon) {
        chalk.red(console.log(randomLogLose[randomNumber]));
    }
}

let guessesRemaining = 10;
let movieIndex = 0;
let currentMovie = new Word(randomMovie[movieIndex]);
currentMovie.print();

function nextWord() {
    movieIndex++;
    if(movieIndex === randomMovie.length) {
        if(wins > losses) {
            console.log("YOU WIN!!!");
        } else {
            console.log("YOU LOST :(");
        }
        return;
    }
    currentMovie = new Word(randomMovie[movieIndex]);
    currentMovie.print();
    guessesRemaining = 10;
}

function askForInput() {
    inquirer.prompt([{
        type: "input",
        message: "GUESS A LETTER (Enter 'exit' to end game):",
        name: "guessedLetter"
    }]).then(function (response) {
        const char = response.guessedLetter;
        if(char.toLowerCase() === "exit") {
            return;
        }
        if (char.length !== 1) {
            askForInput();
        } else {
            console.log("YOU GUESSED: " + char);

            let correctGuess = currentMovie.reveal(char);

            if (correctGuess) {
                console.log(chalk.green("CORRECT!!!"));
            } else {
                guessesRemaining--;
                console.log(chalk.red("INCORRECT!!!"));
                console.log(guessesRemaining + " guesses remaining!!");
            }

            if (currentMovie.allRevealed()) {
                console.log("You got it right!! Next word!");
                wins++;
                nextWord();
            } else if (guessesRemaining === 0) {
                currentMovie.revealAll();
                console.log("You couldn't guess it!! Next word!");
                losses++;
                nextWord();
            }

            askForInput();
        }
    });
}

askForInput();