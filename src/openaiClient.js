import OpenAI from "openai"; // Importing the OpenAI client library.
import { API_KEY, logDebug } from "./util.js"; // Importing API key and logging utility functions.
import ora from "ora"; // Importing ora for a loading spinner.
import chalk from "chalk"; // Importing chalk for colored console output.

// Initialize the OpenAI client using the API key.
const openai = new OpenAI({ apiKey: API_KEY });

/**
 * getChatResponse
 * Sends a chat request to OpenAI to get the terminal command based on the user's prompt.
 *
 * @param {string} prompt - The user's query to be processed by the model.
 * @param {string} model - The model to be used for generating the response.
 * @param {string} systemMessage - The system message to provide context to the model.
 * @returns {Promise<Object>} - A Promise that resolves to the JSON-parsed response from the model.
 */
export async function getChatResponse(prompt, model, systemMessage) {
  // Initialize and start the spinner with a message indicating the prompt being processed.
  const spinner = ora(`Thinking about : ${prompt}...`).start();

  try {
    // Send a request to OpenAI to generate a response based on the provided prompt, model, and system message.
    const response = await openai.chat.completions.create({
      model: model,
      response_format: {
        type: "json_object", // Ensure the response is in JSON format.
      },
      messages: [
        {
          role: "system",
          content: systemMessage, // System context message.
        },
        {
          role: "user",
          content: prompt, // User's query.
        },
      ],
    });

    // Log the response from OpenAI for debugging purposes.
    logDebug(`Response from OpenAI: ${response.choices[0].message.content}`);

    // Update the spinner status to indicate success.
    spinner.succeed();

    // Parse and return the JSON content of the response message.
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    // Handle any errors that occur during the request by updating the spinner and logging the error.
    spinner.fail(chalk.red("Error!"));
    console.error("Error making request:", error);
    throw error; // Re-throw the error after logging.
  }
}
