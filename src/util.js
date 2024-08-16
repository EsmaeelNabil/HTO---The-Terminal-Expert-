import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import clipboard from "clipboardy";
import { exec } from "child_process";

// Load environment variables
dotenv.config();

export const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error(
    "API key is missing. Please set API_KEY in your environment variables.",
  );
  process.exit(1);
}

// Parse command line arguments
export const args = yargs(hideBin(process.argv))
  .option("model", {
    alias: "m",
    type: "string",
    default: "gpt-4o-mini",
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
  .option("execute", {
    alias: "e",
    type: "boolean",
    description: "Execute the command",
  }).argv;

export function logDebug(message) {
  if (args.debug) {
    console.log(message);
  }
}

export function promptUser(message) {
  return inquirer.prompt({
    type: "input",
    name: "query",
    message: message,
  });
}

export function userActionSelector(message) {
  return inquirer.prompt([
    {
      type: "list",
      name: "actions",
      message: message,
      choices: ["Copy to Clipboard", "Cancel"],
    },
  ]);
}

export function copyToClipboard(content) {
  clipboard.writeSync(content);
  console.log("Command copied to clipboard.");
}

export function executeShellCommand(command) {
  console.log(`Executing command: ${command}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(stdout);
  });
}
