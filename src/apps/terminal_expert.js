import {getAiResponse} from "../infra/openaiService.js";
import {logDebug, logGreen} from "../infra/logging";
import {getUserQuery, processCommand} from "../infra/utils";
import {args} from "../infra/cli";
import {apps_config} from "../infra/config";

// Extracting specific configurations for the terminal expert application.
const model = apps_config.apps.terminal_expert.defaultModel;
const systemMessage = apps_config.apps.terminal_expert.systemMessage;
const responseMode = apps_config.apps.terminal_expert.responseMode;


try {
    logDebug(
        `Using model: ${model} \nand systemMessage: ${systemMessage}\n and responseMode: ${responseMode}`,
    );

    const interactiveMode = args.interactive;
    const commandLineArg = args._[0];
    const userQuery = await getUserQuery(interactiveMode, commandLineArg);
    const response = await getAiResponse(
        userQuery,
        model,
        systemMessage,
        responseMode,
    );

    if (response.command) {
        if (args.verbose) {
            logGreen(response.description + "\n");
        }
        logGreen(response.command);
    } else {
        logGreen(response);
    }

} catch (error) {
    console.error(`Error occurred: ${error.message}`);
    process.exit(1);
}