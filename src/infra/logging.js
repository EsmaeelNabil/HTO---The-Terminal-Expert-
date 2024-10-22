import chalk from "chalk";
import {args} from "./cli.js";

export const logDebug = (message) => args.debug && console.log(chalk.bgCyanBright(message));
export const logGreen = (message) => console.log(chalk.green(message));
export const logRed = (message) => console.error(chalk.red(message));
export const logCyan = (message) => console.log(chalk.cyan(message));
export const logError = (message) => console.log(chalk.red(message));