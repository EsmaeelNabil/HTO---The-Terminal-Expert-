import inquirer from "inquirer";

export const promptUser = (message) => inquirer.prompt({type: "input", name: "query", message});

export const userActionSelector = (message) =>
    inquirer.prompt([{type: "list", name: "actions", message, choices: ["Execute", "Copy to Clipboard", "Cancel"]}]);