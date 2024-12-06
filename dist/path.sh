#!/bin/bash

# Define the path to the executable and the folder to organize
EXE_PATH="./foldersorganiser.exe"
FOLDER_PATH="C:\Users\thoma\Downloads"

# Resolve the absolute path of the folder
ABSOLUTE_PATH="$(cd "$FOLDER_PATH" && pwd)"

# Run the executable with the resolved absolute folder path
"$EXE_PATH" "$ABSOLUTE_PATH"
