import {executeShellCommand} from "./commands";
import {userActionSelector} from "./prompts";
import {logCyan, logError} from "./logging";
import {args} from "./cli";


export const trimStringWithEllipsis = (str, maxLength) => (str.length > maxLength ? str.substring(0, maxLength) + ".." : str);

export const printHelp = () => {
    console.log('Usage:\n- hto "How to list files in macOS"\n- hto -i for interactive mode.');
};

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
        process.stdout.write(command.trim() + "\n");
    }
}

export const getUserQuery = async (interactiveMode, commandLineArg) => {
    if (interactiveMode) {
        const input = await promptUser("Enter your question");
        return input.query;
    } else if (commandLineArg) {
        return commandLineArg;
    } else {
        printHelp();
        process.exit(0);
    }
};

export async function handleUserActions(command) {
    const answers = await userActionSelector(`Available actions for this command: ${command}`);
    switch (answers.actions) {
        case "Copy to Clipboard":
            copyToClipboard(command);
            break;
        case "Execute":
            executeShellCommand(command);
            break;
        default:
            logCyan("Action canceled.");
    }
    process.exit(0);
}
