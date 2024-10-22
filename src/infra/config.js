import dotenv from "dotenv";
import {readFileSync} from "fs";
import {load} from "js-yaml";
import {homedir} from "os";
import {join} from "path";

dotenv.config();

export const OPEN_API_KEY = process.env.API_KEY;

if (!OPEN_API_KEY) {
    console.error("API key is missing. Please set API_KEY in your environment variables.");
    process.exit(1);
}


// Define the path to the .config file
const configFilePath = join(homedir(), ".config/hto/", "config.yaml");

/**
 * Read a YAML file and parse it into a JavaScript object.
 *
 * @param {string} filePath - The path to the YAML file.
 * @returns {object|null} - The parsed JavaScript object or null if an error occurs.
 */
export function readYamlFile(filePath) {
    try {
        const fileContents = readFileSync(filePath, "utf8");
        return load(fileContents);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error("The YAML file was not found:", error);
        } else if (error.code === 'EISDIR') {
            console.error("Provided path is a directory, not a file:", error);
        } else {
            console.error("Unexpected error reading YAML file:", error);
        }
        return null;
    }
}

export const apps_config = readYamlFile(configFilePath);