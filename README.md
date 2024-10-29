<br>
<br>

# 🟡 Archived and Moved to [Rust impl here](https://github.com/EsmaeelNabil/h2o) 🟡

<br>
<br>

<img width="1512" alt="image" src="https://github.com/user-attachments/assets/e764d88d-2ab8-4024-99e7-ce1779c913ab">

This project is helpful for creating a one shot ai calls based apps, also provides piping from/to other terminal tools.

## Features

- Ai apps in the terminal with OpenAI's models.
- Customizable `models`, `systemMessages`, and `responseType` for function calling support.

## Prerequisites

- [OpenAI API Key](https://platform.openai.com/api-keys)
- [Bun](https://bun.sh/)

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
    - Create a `.env` with the `OPEN_API_KEY`, Add it in your `.zshrc` or `.bashrc` or export it
      `export OPEN_API_KEY=your_api_key_here` in your terminal before running the binaries or the apps.
      ```sh
      OPEN_API_KEY=your_api_key_here
      ```

4. **Configuration**:
    - Rename [config_example.yaml](config_example.yaml) to [config.yaml](config.yaml) and move it to
      ```~/.config/hto/config.yaml```.
```yaml
apps:
  terminal_expert:
    defaultModel: 'gpt-4o-mini'
    responseMode: 'json_object'
    systemMessage: 'You are an Expert in terminal commands, and a helpful assistant designed to output JSON'
  terminal_chat:
    defaultModel: 'gpt-4o-mini'
    responseMode: 'text'
    systemMessage: 'You are an Expert in Software engineer, with an experience of 50 years and the knowledge of all the programming languages, do not escape anything for browsers'
  joker:
    defaultModel: 'gpt-4o-mini'
    responseMode: 'text'
    systemMessage: 'You are a joker, you make fun of everyone and everything, your response has to contain emojies and a lot of jokes and laughters, and you also sound a bit crazy'
  socrates:
    defaultModel: 'gpt-4o-mini'
    responseMode: 'text'
    systemMessage: 'You are socrates, reply with the personality of him, be as convensing as much as you can, and use emojis'
```

5. **Generate an executable/binary**: for now only `macOS` is supported.
    - Follow one of the examples in `src/apps/` for example [hto.js](src/apps/hto.js).
    - To generate `hto` in your project directory, run the following command:
      ```sh
      ./release.sh "app_name" "src/apps/hto"
      ```

## Usage

### Basic Usage

To query terminal commands using natural language input:

```sh
./hto "How to list files in macOS"
```

### A specific app

```sh
hto "How to list files in macOS" --app "terminal_chat"
```

### Debug Mode

- For additional debug information:

```sh
./hto -d "How to list files in macOS"
```

### Use specific Model

- To use a specific model, use the `-m` key.

```sh
./hto "How to list directories in Linux" -m "gpt-4o"
```

---

### Development Mode

If you want to try the script in development mode:

```sh
bun run src/apps/hto.js "How to list files in macOS"
```

### Contribution

Feel free to fork the project, open issues, or submit pull requests to improve this project.

## License

This project is licensed under the MIT License.
