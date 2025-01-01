import os
import subprocess

def convert_videos_to_mp4(base_path):
    """
    Converts all video files in the College folder (under the base path) to .mp4.

    Args:
        base_path (str): Path to the base directory (react/public).
    
    Returns:
        None
    """
    # Define the College folder path
    college_folder = os.path.join(base_path, "misc/Baseball/College")

    if not os.path.exists(college_folder):
        print(f"Error: The directory {college_folder} does not exist.")
        return

    # Get a list of all files in the College folder
    files = [f for f in os.listdir(college_folder) if os.path.isfile(os.path.join(college_folder, f))]

    if not files:
        print("No video files found in the College directory.")
        return

    for file_name in files:
        input_path = os.path.join(college_folder, file_name)
        output_path = os.path.join(college_folder, f"{os.path.splitext(file_name)[0]}.mp4")

        # Skip if the file is already an .mp4 file
        if input_path.lower().endswith('.mp4'):
            print(f"Skipping {file_name}: Already an .mp4 file.")
            continue

        # Check if the output file already exists
        if os.path.exists(output_path):
            print(f"Skipping {file_name}: {output_path} already exists.")
            continue

        print(f"Converting {file_name} to {output_path}...")
        try:
            # Execute the ffmpeg command
            subprocess.run(
                ["ffmpeg", "-i", input_path, "-vcodec", "h264", "-acodec", "aac", output_path],
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            print(f"Successfully converted: {file_name}")
        except subprocess.CalledProcessError as e:
            print(f"Error converting {file_name}: {e.stderr.decode('utf-8')}")
        except Exception as e:
            print(f"Unexpected error while converting {file_name}: {e}")

if __name__ == "__main__":
    # Adjust base_path to reflect the absolute path to "react/public"
    script_dir = os.path.dirname(os.path.abspath(__file__))  # Current script directory
    base_path = os.path.join(script_dir)  # react/public assumed as the current directory
    convert_videos_to_mp4(base_path)
