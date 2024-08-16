import {
  args,
  promptUser,
  userActionSelector,
  copyToClipboard,
  executeShellCommand,
} from "./util.js";

import { getChatResponse } from "./openaiClient.js";

/**
 * Main function to process the user's request.
 *
 * @param {string} command - The terminal command.
 */
async function processCommand(command) {
  if (!command) {
    console.error("No command received from API");
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
 * Handle user actions in interactive mode.
 *
 * @param {string} command - The terminal command.
 */
async function handleUserActions(command) {
  const answers = await userActionSelector(
    `Available actions for this command: ${command}`,
  );
  if (answers.actions === "Copy to Clipboard") {
    copyToClipboard(command);
  } else {
    console.log("Action canceled.");
  }
  process.exit(0);
}

/**
 * hto entry point.
 */
(async () => {
  if (args.interactive) {
    const input = await promptUser(
      "Enter your question to the terminal Expert.",
    );
    const response = await getChatResponse(input.query);
    await processCommand(response.command);
  } else if (args._[0]) {
    const response = await getChatResponse(args._[0]);
    await processCommand(response.command);
  } else {
    console.log(
      'Usage:\n- hto "How to list files in macOS"\n- hto -i for interactive mode.',
    );
    process.exit(0);
  }
})();
