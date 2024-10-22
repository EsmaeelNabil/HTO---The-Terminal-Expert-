import yargs from "yargs";
import {hideBin} from "yargs/helpers";

export const args = yargs(hideBin(process.argv))
    .options({
        model: {alias: "m", type: "string", default: "gpt-4o-mini", description: "Specify the model to use"},
        debug: {alias: "d", type: "boolean", description: "Debug mode"},
        interactive: {alias: "i", type: "boolean", description: "Interactive mode"},
        verbose: {alias: "v", type: "boolean", description: "Verbose mode"},
        app: {
            alias: "a",
            type: "string",
            description: "Specify the app to use from .config hto.yaml",
            default: "terminal_chat"
        },
        execute: {alias: "e", type: "boolean", description: "Execute the command"},
    }).argv;