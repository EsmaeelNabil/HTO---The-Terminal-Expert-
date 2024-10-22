import OpenAI from "openai";
import ora from "ora";
import chalk from "chalk";
import {OPEN_API_KEY} from "./config";
import {trimStringWithEllipsis} from "./utils";
import {logDebug, logError} from "./logging";

const openai = new OpenAI({apiKey: OPEN_API_KEY});

export async function getAiResponse(prompt, model, systemMessage, responseMode) {
    const spinner = ora(`Thinking about : ${trimStringWithEllipsis(prompt, 50)}\n\n`).start();

    try {
        const response = await openai.chat.completions.create({
            model: model,
            response_format: {
                type: responseMode,
            },
            messages: [
                {role: "system", content: systemMessage},
                {role: "user", content: prompt},
            ],
        });

        logDebug(`Response from OpenAI: ${response.choices[0].message.content}`);
        spinner.succeed();

        let responseContent = response.choices[0].message.content;

        return responseMode.includes("json")
            ? JSON.parse(responseContent)
            : responseContent;
    } catch (error) {
        spinner.fail(chalk.red(error.message));
        logError(`Error making request: ${error}`);
        throw error;
    }
}