
import prompts from "prompts";
import chalk from "chalk";
import { randomInt } from "node:crypto";

const MAX_NUMBER = 10;
const MAX_ATTEMPTS = 3;

const secretNumber = randomInt(1, MAX_NUMBER + 1);

console.log(chalk.magenta.bold("GUESS THE NUMBER!"));
console.log(chalk.white("Guess a number between 1 and 10."));
console.log(chalk.yellow(`You have ${MAX_ATTEMPTS} attempts!`));
console.log(chalk.cyan("Rules:"));
console.log(chalk.white("1. Enter a whole number from 1 to 10."));
console.log(chalk.white("2. Follow the hints after each guess."));
console.log(chalk.white("3. Try to guess the secret number before you run out of attempts."));
console.log("");

async function startGame() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const response = await prompts({
      type: "number",
      name: "guess",
      message: `Attempt ${attempt}/${MAX_ATTEMPTS}: Enter a number between 1 and 10`
    });

    console.log(`You entered: ${response.guess}`);

    if (response.guess === secretNumber) {
      console.log(chalk.green.bold("Correct! You guessed the number!"));
      return;
    }

    console.log(
      response.guess < secretNumber
        ? chalk.yellow("Too low!")
        : chalk.yellow("Too high!")
    );
  }

  console.log(chalk.red.bold("GAME OVER!"));
  console.log(`The secret number was ${secretNumber}.`);
}

await startGame();