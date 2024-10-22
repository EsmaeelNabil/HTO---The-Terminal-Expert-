import { exec } from "child_process";
import { logCyan, logGreen, logRed } from "./logging.js";

export const executeShellCommand = (command) => {
    logCyan(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) return logRed(`Error executing command: ${error}`);
        if (stderr) return logRed(`stderr: ${stderr}`);
        logGreen(stdout);
    });
};