#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
async function main() {
    //Game Variables
    let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
    let maxEnemyHealth = 75;
    let enemyAttackDamage = 25;
    //players variable
    let health = 100;
    let attackDamage = 50;
    let numHealthPotions = 3;
    let healthPotionHealAmount = 30;
    let healthPotionDropChance = 50; //percenatge
    let running = true;
    console.log(chalk.bold(`\t\tWelcome To The Dungeon `));
    GAME: while (running) {
        console.log(chalk.red(`-------------------------------------------`));
        let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
        let enemy = enemies[Math.floor(Math.random() * enemies.length)];
        console.log(chalk.blue(`\t# ${enemy} has Appeared #\n`));
        while (enemyHealth > 0) {
            console.log(chalk.blackBright(`\t Your HP: ${health}`));
            console.log(chalk.blackBright(`\t ${enemy}'s HP: ${enemyHealth}`));
            console.log(`\n\t What Would You Like To do?`);
            console.log(`\t 1.Attack`);
            console.log(`\t 2.Drink Health Potion`);
            console.log(`\t 3.Run!`);
            let input = await inquirer.prompt([{
                    type: "input",
                    name: "number",
                }]);
            if (input.number == "1") {
                let damageDealt = Math.floor(Math.random() * attackDamage);
                let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
                enemyHealth -= damageDealt;
                health -= damageTaken;
                console.log(chalk.blueBright(`\t> You strike the ${enemy} for ${damageDealt} damage`));
                console.log(chalk.blueBright(`\t> You receive ${damageTaken} in retaliation!`));
                if (health < 1) {
                    console.log(chalk.blueBright(`You have taken too much damage,you are too weak to go on`));
                    break;
                }
            }
            else if (input.number === "2") {
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    numHealthPotions--;
                    console.log(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.`
                        + `\n\t> You have now ${health} HP.`
                        + `\n\t>You have ${numHealthPotions} health potions left.\n`);
                }
                else {
                    console.log(chalk.redBright("\t> You have no health potions left! Defeat enemies for a chance to get one."));
                }
            }
            else if (input.number === "3") {
                console.log(chalk.cyan(`\t> You run away from the ${enemy}!`));
                continue GAME;
            }
            else {
                console.log(chalk.red("\tInvalid command!"));
            }
        }
        if (health < 1) {
            console.log(chalk.red("You limp out of Dungeon, weak from battle."));
            break;
        }
        console.log(chalk.gray("------------------------------------------------"));
        console.log(chalk.cyan(`# ${enemy} was defeated #`));
        console.log(chalk.yellow(`You have ${health} HP left.#`));
        if (Math.random() * 100 < healthPotionDropChance) {
            numHealthPotions++;
            console.log(chalk.green(`# The ${enemy} dropped a health potion! #`));
            console.log(chalk.green(`You now have ${numHealthPotions} health potions. #`));
            console.log(chalk.gray("------------------------------------------------"));
            console.log("What would you like to do now?");
            console.log(chalk.blueBright("1. Continue fighting"));
            console.log(chalk.blueBright("2. Exit Dungeon"));
            let input1 = await inquirer.prompt([{
                    type: "input",
                    name: "numbers"
                }]);
            while ((input1.numbers !== "1") && (input1.numbers !== "2")) {
                console.log(chalk.red("invalid command!"));
                input1 = await inquirer.prompt([{
                        type: "input",
                        name: "numbers"
                    }]);
            }
            if (input1.numbers === "1") {
                console.log(`You continue on your adventure!`);
            }
            else if (input1.numbers === "2") {
                console.log(`You exit the dungeon, successful from your adventures!`);
                break;
            }
        }
    }
    console.log(chalk.blue(`######################`));
    console.log(chalk.blue(`# Thanks for playing #`));
    console.log(chalk.blue(`######################`));
}
main();
