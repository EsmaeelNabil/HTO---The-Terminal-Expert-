import OpenAI from "openai";
import { API_KEY, logDebug, args } from "./util.js";

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: API_KEY });

/**
 * Send chat request to OpenAI to get the terminal command.
 *
 * @param {string} prompt - User's query.
 */
export async function getChatResponse(prompt) {
  logDebug(`Using model: ${args.model}`);

  try {
    const response = await openai.chat.completions.create({
      model: args.model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'You are an Expert in terminal commands, and a helpful assistant designed to output JSON. Using only this scheme as an example you must follow: { "command": "ls -d */", "description": "This command lists all directories (folders) in the current directory." }',
        },
        { role: "user", content: prompt },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error making request:", error);
  }
}
