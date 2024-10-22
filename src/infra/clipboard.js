import clipboard from "clipboardy";
import { logGreen } from "./logging.js";

export const copyToClipboard = (content) => {
    clipboard.writeSync(content);
    logGreen("Command copied to clipboard.");
};