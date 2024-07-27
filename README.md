<img width="1277" alt="image" src="https://github.com/user-attachments/assets/b984b06b-6506-4031-848a-d68c164d86fe">

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
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/aacc7c5a-fe5c-4fcb-8577-d7d27d37d36e">

For an interactive session where you can choose actions such as copying commands to the clipboard:

```sh
./hto -i
```

Follow the prompts to input your question and select the desired action.

### Execute Mode

To execute the terminal command suggested by the script:
<img width="896" alt="image" src="https://github.com/user-attachments/assets/4766cb67-fb89-4436-acb6-dd39f706dc63">

```sh
./hto -e "How to list files in macOS"
```

### Debug Mode

For additional debug information:
<img width="480" alt="image" src="https://github.com/user-attachments/assets/e4d2062c-d852-4672-95aa-a3058bf1519c">

```sh
./hto -d "How to list files in macOS"
```

### Use specific Model

To use a specific model, use the `-m` key.

<img width="735" alt="image" src="https://github.com/user-attachments/assets/0b9d8f51-13bd-463f-b5fb-d7a05454bb97">

```sh
./hto "How to list directories in Linux" -m "gpt-4o" -d
```
---

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
