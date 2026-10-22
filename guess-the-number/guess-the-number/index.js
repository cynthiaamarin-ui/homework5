import prompts from "prompts";
import chalk from "chalk";
import { randomInt } from "node:crypto";
import { appendFileSync, writeFileSync } from "node:fs";


const MAX_NUMBER = 10;
const MAX_ATTEMPTS = 3;
const LOG_FILE = "game-output.txt";


writeFileSync(LOG_FILE, "");


function display(message = "") {
 console.log(message);
 appendFileSync(LOG_FILE, `${message}\n`);
}


async function playGame() {
 const secretNumber = randomInt(1, MAX_NUMBER + 1);


 display(chalk.magenta.bold("GUESS THE NUMBER!"));
 display(chalk.white("Guess a number between 1 and 10."));
 display(chalk.yellow(`You have ${MAX_ATTEMPTS} attempts!`));


 let attempts = 0;
 let won = false;


 while (attempts < MAX_ATTEMPTS && !won) {
   const response = await prompts({
     type: "text",
     name: "guess",
     message: `Attempt ${attempts + 1}/${MAX_ATTEMPTS}: Enter your guess`
   });


   try {
     if (response.guess === undefined || response.guess.trim() === "") {
       throw new Error("A guess is required.");
     }


     const guess = Number(response.guess.trim());


     if (!Number.isInteger(guess)) {
       throw new Error("Please enter a whole number.");
     }


     if (guess < 1) {
       throw new Error("Guess must be at least 1.");
     }


     if (guess > MAX_NUMBER) {
       throw new Error("Guess cannot exceed 10.");
     }


     attempts++;


     if (guess === secretNumber) {
       display(chalk.green.bold("CORRECT! You guessed the number!"));
       won = true;
     } else if (guess < secretNumber) {
       display(chalk.yellow("Too low!"));
     } else {
       display(chalk.yellow("Too high!"));
     }
   } catch (error) {
     display(chalk.red(error.message));
   }
 }


 if (!won) {
   display("");
   display(chalk.red.bold("GAME OVER!"));
   display(`The secret number was ${secretNumber}.`);
 }


 display("");
 display(chalk.magenta.bold("Thanks for playing!"));
}


try {
 await playGame();
} catch (error) {
 display(chalk.red(`Game error: ${error.message}`));
} finally {
}