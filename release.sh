#!/bin/bash
APP_NAME=$1
APP_ENTRY_POINT=$2

if [ -z "$APP_NAME" ]; then
  echo "Please provide the app name!"
  exit 1
fi

if [ -z "$APP_ENTRY_POINT" ]; then
  echo "Please provide the app entry point file path!"
  exit 1
fi

# Build the pkg executable
echo "Building started for" "$APP_NAME" "..."
echo "-----------------------"

if [[ "$OSTYPE" == "darwin"* ]]; then
  bun build --compile --target=bun-darwin-arm64 "$APP_ENTRY_POINT" --outfile "$APP_NAME"
else
  echo "for Linux, MinGW, Cygwin or Windows check https://bun.sh/docs/bundler/executables"
fi

echo "Excutable generated successfully!"
