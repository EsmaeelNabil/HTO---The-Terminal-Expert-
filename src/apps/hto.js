import {getAiResponse} from "../infra/openaiService.js";
import {args} from "../infra/cli";
import {getUserQuery} from "../infra/utils";
import {logDebug, logGreen} from "../infra/logging";
import {apps_config} from "../infra/config";

// Apps from ~/.config/hto/config.yaml.
const apps = apps_config["apps"];

// entry point of the application
const main = async () => {
    try {
        // Get the app configuration based on the user input or use the default app.
        let app = apps[`${args.app}`];
        if (!app) {
            echo`App '${args.app}' not found in the config file. so will use the default app 'terminal_expert'`;
            // using terminal_chat as default app
            app = "terminal_chat";
        }

        // Extracting specific configurations for the terminal chat application in this case from ~/.config/hto/config.yaml.
        const model = app["defaultModel"];
        const systemMessage = app["systemMessage"];
        const responseMode = app["responseMode"];

        // Log the model and system message being used for debugging purposes.
        logDebug(
            `Using model: ${model} \nand systemMessage: ${systemMessage}\n and responseMode: ${responseMode}`,
        );

        // Determine the mode of user input.
        const isInteractive = args.interactive;
        // or if the user has provided a text input.
        const textInput = args._[0];

        // Get the user's query based on the input mode.
        const userQuery = await getUserQuery(isInteractive, textInput);

        // Get the AI response based on the user query, model, system message, and response mode[json or text] as in the config.yaml.
        const response = await getAiResponse(
            userQuery,
            model,
            systemMessage,
            responseMode,
        );

        // log the response but here you can add more logic to handle the response based on the app.
        logGreen(response);

    } catch (error) {
        // Log the error and exit the process with a status code of 1.
        console.error(`Error occurred: ${error.message}`);
        process.exit(1);
    }
};

// Execute the main function.
main();
