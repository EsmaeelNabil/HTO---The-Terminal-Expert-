import { args, logDebug, logGreen, getUserQuery } from "./util.js";

import { getChatResponse } from "./openaiClient.js";
import { hto_config } from "./configReader.js";

const apps = hto_config["apps"];
/**
 * main
 * Main function that orchestrates the flow of the script.
 * It handles user input, interacts with the chat API, and processes the response.
 *
 * @returns {Promise<void>} - A Promise that resolves when the main function completes.
 */
const main = async () => {
  try {
    // Get the app configuration based on the user input or use the default app.
    let app = apps[`${args.app}`];
    if (!app) {
      echo`App '${args.app}' not found in the config file. so will use the default app 'terminal_expert'`;
      app = "terminal_expert";
    }

    // Etracting specific configurations for the terminal chat application.
    const model = app["defaultModel"];
    const systemMessage = app["systemMessage"];
    const reponseMode = app["responseMode"];

    // Log the model and system message being used for debugging purposes.
    logDebug(
      `Using model: ${model} \nand systemMessage: ${systemMessage}\n and responseMode: ${reponseMode}`,
    );

    // Determine the mode of user input.
    const interactiveMode = args.interactive;
    const commandLineArg = args._[0];

    // Get the user's query based on the input mode.
    const userQuery = await getUserQuery(interactiveMode, commandLineArg);

    const response = await getChatResponse(
      userQuery,
      model,
      systemMessage,
      reponseMode,
    );

    logGreen(response);
  } catch (error) {
    // Log the error and exit the process with a status code of 1.
    console.error(`Error occurred: ${error.message}`);
    process.exit(1);
  }
};

// Execute the main function.
main();
