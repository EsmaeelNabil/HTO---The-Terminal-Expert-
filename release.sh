#!/bin/bash

# Ensure necessary files exist
if [ ! -f package.json ]; then
  echo "package.json not found!"
  exit 1
fi

if [ ! -f src/main.js ]; then
  echo "src/main.js not found!"
  exit 1
fi

# Build the pkg executable
echo "Building started ..."
echo "-----------------------"
if [[ "$OSTYPE" == "linux-gnu" ]]; then
  echo "for Linux check https://bun.sh/docs/bundler/executables"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  bun build --compile --target=bun-darwin-arm64 src/main.js --outfile hto
elif [[ "$OSTYPE" == "cygwin" ]]; then
  echo "for Cygwin (Windows) check https://bun.sh/docs/bundler/executables"
elif [[ "$OSTYPE" == "msys" ]]; then
  echo "for MinGW (Windows) check https://bun.sh/docs/bundler/executables"
elif [[ "$OSTYPE" == "win32" ]]; then
  echo "for Windows check https://bun.sh/docs/bundler/executables"
else
  echo "Unknown OS, check https://bun.sh/docs/bundler/executables"
fi
echo "Excutable generated successfully!"
