# HTO - GPT Integration for Terminal Commands `How to`.

This script helps users query terminal command syntax, interactively decide actions, and even execute terminal commands directly. It leverages OpenAI's GPT model to provide accurate and quick command suggestions.

## Features

- Query terminal commands based on natural language input.
- Interactive mode to choose actions like copying commands to clipboard.
- Option to execute commands directly.
- Debug mode for more detailed output.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/EsmaeelNabil/hto
   cd hto
   ```

2. **Install dependencies**:
   ```sh
   bun install
   ```

3. **Add your OpenAI API Key**:
   - Create a `.env` file in the root directory of your project in case of development.
   - Or Add it in your `.zshrc` or `.bashrc` or even `export API_KEY=your_api_key_here` in your terminal before running the script. 
   - To Add your API Key:
     ```sh
     API_KEY=your_api_key_here
     ```

4. **generate an executable**:
   - To generate `hto` in your project directory, run the following command:
     ```sh
     ./release.sh
     ```

## Usage

### Basic Usage

To query terminal commands using natural language input:

```sh
./hto "How to list files in macOS"
```

### Interactive Mode

For an interactive session where you can choose actions such as copying commands to the clipboard:

```sh
./hto -i
```

Follow the prompts to input your question and select the desired action.

### Execute Mode

To execute the terminal command suggested by the script:

```sh
./hto -e "How to list files in macOS"
```

### Debug Mode

For additional debug information:

```sh
./hto -d "How to list files in macOS"
```

### Example Commands

- Basic usage:
  ```sh
  ./hto "How to list directories in Linux"
  ```

- Interactive mode:
  ```sh
  ./hto -i
  ```

- Execute mode:
  ```sh
  ./hto -e "How to remove a directory in Linux"
  ```

- Debug mode:
  ```sh
  ./hto -d "How to change directory in Windows"
  ```

### Development Mode
If you want to try the script in development mode, use `bun run main.js` instead of `hto`:

```sh
bun run main.js "How to list files in macOS"
```

### Contribution

Feel free to fork the project, open issues, or submit pull requests to improve this project.

## License

This project is licensed under the MIT License.

## Releases

You can find the latest release [here](https://github.com/esmaeelnabil/hto/releases).
