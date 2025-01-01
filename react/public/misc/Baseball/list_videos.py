import os
import json

def list_files_in_directory(base_directory):
    """
    Recursively lists all file names in each specified subdirectory,
    ignoring .DS_Store files.
    """
    file_lists = {}
    for root, dirs, files in os.walk(base_directory):
        # Get the relative path from the base directory
        relative_path = os.path.relpath(root, base_directory)
        # Skip the base directory itself
        if relative_path == ".":
            continue
        # Filter out .DS_Store files
        filtered_files = [file for file in files if file != ".DS_Store"]
        # Add files to the corresponding subdirectory list
        file_lists[relative_path] = filtered_files
    return file_lists

def main():
    base_directory = "."  # Set the base directory to the current directory
    output_file = "video_file_list.json"

    file_lists = list_files_in_directory(base_directory)

    # Save the file lists to a JSON file
    with open(output_file, "w") as json_file:
        json.dump(file_lists, json_file, indent=4)

    print(f"File lists have been saved to {output_file}")

if __name__ == "__main__":
    main()
