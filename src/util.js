import dotenv from "dotenv"; // Importing dotenv to handle environment variables.
import yargs from "yargs"; // Importing yargs for command line argument parsing.
import { hideBin } from "yargs/helpers"; // Helper for yargs to handle process argument bin.
import inquirer from "inquirer"; // Importing inquirer for user prompts.
import clipboard from "clipboardy"; // Importing clipboardy for clipboard operations.
import { exec } from "child_process"; // Importing exec from child_process to execute shell commands.
import { hto_config } from "./configReader"; // Configuration reader for the application settings.
import chalk from "chalk"; // Importing chalk for colored console output.

// Load environment variables from a .env file into process.env
dotenv.config();

// Retrieve the API key from environment variables and log error if missing.
export const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error(
    "API key is missing. Please set API_KEY in your environment variables.",
  );
  process.exit(1);
}

// Parse command line arguments using yargs and set default options
export const args = yargs(hideBin(process.argv))
  .option("model", {
    alias: "m",
    type: "string",
    default: hto_config.apps.terminal_expert.defaultModel || "gpt-4o-mini",
    description: "Specify the model to use",
  })
  .option("debug", {
    alias: "d",
    type: "boolean",
    description: "Debug mode",
  })
  .option("interactive", {
    alias: "i",
    type: "boolean",
    description: "Interactive mode",
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Verbose mode",
  })
  .option("execute", {
    alias: "e",
    type: "boolean",
    description: "Execute the command",
  }).argv;

// Logging functions with different colors for different log levels.
export function logDebug(message) {
  if (args.debug) {
    console.log(chalk.bgGray(message));
  }
}

export function logGreen(message) {
  console.log(chalk.green(message));
}

export function logYellow(message) {
  console.log(chalk.yellow(message));
}

export function logRed(message) {
  console.log(chalk.red(message));
}

export function logError(message) {
  console.error(chalk.red(message));
}

export function logCyan(message) {
  console.log(chalk.cyan(message));
}

// Function to prompt the user for input and return their response.
export function promptUser(message) {
  return inquirer.prompt({
    type: "input",
    name: "query",
    message: message,
  });
}

// Function to present action choices to the user and return their selection.
export function userActionSelector(message) {
  return inquirer.prompt([
    {
      type: "list",
      name: "actions",
      message: message,
      choices: ["Execute", "Copy to Clipboard", "Cancel"],
    },
  ]);
}

// Function to copy a given content to the clipboard and notify the user.
export function copyToClipboard(content) {
  clipboard.writeSync(content);
  console.log(chalk.green("Command copied to clipboard."));
}

// Function to execute a shell command and log the output or errors.
export function executeShellCommand(command) {
  console.log(`Executing command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      logError(`Error executing command: ${error}`);
      return;
    }
    if (stderr) {
      logError(`stderr: ${stderr}`);
      return;
    }
    logGreen(stdout);
  });
}

// Function to print usage instructions.
export function printHelp() {
  logCyan(
    'Usage:\n- hto "How to list files in macOS"\n- hto -i for interactive mode.',
  );
}

/**
 * processCommand
 * Main function to process the user's request.
 *
 * @param {string} command - The terminal command to process.
 */
export async function processCommand(command) {
  if (!command) {
    logError("Error: No command received from API");
    process.exit(1);
  }

  if (args.interactive) {
    await handleUserActions(command);
  } else if (args.execute) {
    executeShellCommand(command);
  } else {
    // Print to stdout for piping capabilities
    process.stdout.write(command.toString().trim() + "\n");
  }
}

/**
 * handleUserActions
 * Handle user actions in interactive mode.
 *
 * @param {string} command - The terminal command to process interactively.
 */
export async function handleUserActions(command) {
  const answers = await userActionSelector(
    `Available actions for this command: ${command}`,
  );
  if (answers.actions === "Copy to Clipboard") {
    copyToClipboard(command);
  } else if (answers.actions === "Execute") {
    executeShellCommand(command);
  } else {
    conosle.log("Action canceled.");
  }
  process.exit(0);
}
