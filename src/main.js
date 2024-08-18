import {
  args,
  promptUser,
  printHelp,
  logDebug,
  processCommand,
  logGreen,
} from "./util.js";

import { getChatResponse } from "./openaiClient.js";
import { hto_config } from "./configReader.js";

// Extracting specific configurations for the terminal expert application.
const model = hto_config.apps.terminal_expert.defaultModel;
const systemMessage = hto_config.apps.terminal_expert.systemMessage;

/**
 * getUserQuery
 * Retrieves the user query either via an interactive prompt or command line argument.
 *
 * @param {boolean} interactiveMode - Flag to determine if the user input should be interactive.
 * @param {string} commandLineArg - Command line argument provided by the user.
 * @returns {Promise<string>} - The user's query.
 */
const getUserQuery = async (interactiveMode, commandLineArg) => {
  if (interactiveMode) {
    const input = await promptUser("Enter your question");
    return input.query; // Return the query obtained from the user prompt.
  } else if (commandLineArg) {
    return commandLineArg; // Return the query obtained from the command line argument.
  } else {
    printHelp(); // Print help information if no query was provided.
    process.exit(0); // Exit the process with a status code of 0.
  }
};

/**
 * handleResponse
 * Processes the response from the chat API and logs additional information if verbose mode is enabled.
 *
 * @param {object} response - The response object containing the command and description.
 * @param {boolean} verbose - Flag to determine if additional information should be logged.
 * @returns {Promise<void>} - A Promise that resolves when the command has been processed.
 */
const handleResponse = async (response, verbose) => {
  if (verbose) {
    logGreen(`Explanation: ${response.description}`); // Log the explanation in green if verbose mode is enabled.
  }
  await processCommand(response.command); // Process the command provided in the response.
};

/**
 * main
 * Main function that orchestrates the flow of the script.
 * It handles user input, interacts with the chat API, and processes the response.
 *
 * @returns {Promise<void>} - A Promise that resolves when the main function completes.
 */
const main = async () => {
  try {
    // Log the model and system message being used for debugging purposes.
    logDebug(`Using model: ${model} \nand systemMessage: ${systemMessage}\n`);

    // Determine the mode of user input.
    const interactiveMode = args.interactive;
    const commandLineArg = args._[0];

    // Get the user's query based on the input mode.
    const userQuery = await getUserQuery(interactiveMode, commandLineArg);

    // Get the response from the chat API using the user's query.
    const response = await getChatResponse(userQuery, model, systemMessage);

    // Handle the response from the chat API.
    await handleResponse(response, args.verbose);
  } catch (error) {
    // Log the error and exit the process with a status code of 1.
    console.error(`Error occurred: ${error.message}`);
    process.exit(1);
  }
};

// Execute the main function.
main();
