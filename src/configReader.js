import { readFileSync } from "fs";
import { load } from "js-yaml";

const os = require("os");
const path = require("path");

// Define the path to the .config file
const configFilePath = path.join(os.homedir(), ".config/hto/", "config.yaml");

/**
 * Read a YAML file and parse it into a JavaScript object.
 * @param {string} filePath - The path to the YAML file.
 * @returns {object|null} - The parsed JavaScript object or null if an error occurs.
 */
export function readYamlFile(filePath) {
  try {
    const fileContents = readFileSync(filePath, "utf8");
    return load(fileContents);
  } catch (e) {
    console.error("Error reading YAML file:", e);
    return null;
  }
}

export const hto_config = readYamlFile(configFilePath);
