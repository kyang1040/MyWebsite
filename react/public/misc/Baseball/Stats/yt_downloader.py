from pytubefix import YouTube
import os
import subprocess


def sanitize_filename(filename):
    """Sanitize file names to avoid OS errors."""
    return "".join(c if c.isalnum() or c in " ._-" else "_" for c in filename)


def download_and_merge_video_audio(thelink, path):
    """Download highest resolution video and audio, then combine them."""
    try:
        yt = YouTube(thelink)
        print(f"Downloading: {yt.title} ({yt.views} views)")
        yt_title = sanitize_filename(yt.title)

        # Video and audio streams
        video_stream = yt.streams.filter(progressive=False, file_extension="mp4").order_by("resolution").last()
        audio_stream = yt.streams.get_audio_only()

        # Filenames for video and audio
        video_filename = os.path.join(path, f"{yt_title}_video.mp4")
        audio_filename = os.path.join(path, f"{yt_title}_audio.mp3")
        output_filename = os.path.join(path, f"{yt_title}.mp4")

        # Download video and audio streams
        if video_stream:
            video_stream.download(output_path=path, filename=f"{yt_title}_video.mp4")
            print(f"Video downloaded: {video_filename}")
        if audio_stream:
            audio_stream.download(output_path=path, filename=f"{yt_title}_audio.mp3")
            print(f"Audio downloaded: {audio_filename}")

        # Merge video and audio using ffmpeg
        if os.path.exists(video_filename) and os.path.exists(audio_filename):
            print(f"Merging video and audio for: {yt.title}")
            merge_command = [
                "ffmpeg", "-i", video_filename, "-i", audio_filename, "-c:v", "copy", "-c:a", "aac", "-strict", "experimental", output_filename
            ]
            subprocess.run(merge_command, check=True)
            print(f"Merged video saved as: {output_filename}")

            # Clean up intermediate files
            os.remove(video_filename)
            os.remove(audio_filename)
            print(f"Cleaned up intermediate files for: {yt.title}")

    except Exception as e:
        print(f"Failed to process {thelink}. Error: {e}")


def download_videos_from_file(file_path, download_path):
    """Process a file with multiple YouTube links and download videos."""
    try:
        # Ensure the download directory exists
        if not os.path.exists(download_path):
            os.makedirs(download_path)

        # Read the file containing YouTube video links
        with open(file_path, "r") as file:
            video_links = [line.strip() for line in file if line.strip()]

        print(f"Found {len(video_links)} links in {file_path}.")

        # Download each video
        for idx, link in enumerate(video_links, start=1):
            print(f"Processing {idx}/{len(video_links)}: {link}")
            download_and_merge_video_audio(link, download_path)

        print(f"Finished processing all videos in {file_path}.")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    # Specify the paths to the .txt files containing YouTube video links
    file_paths = [
        "yt_videos_singles.txt",
        "yt_videos_doubles.txt",
        "yt_videos_triples.txt",
        "yt_videos_homeruns.txt",
    ]

    # Specify the directories where videos should be downloaded
    download_paths = [
        "/Users/kevinyang/Documents/PersonalWebsite/react/public/misc/Baseball/Singles",
        "/Users/kevinyang/Documents/PersonalWebsite/react/public/misc/Baseball/Doubles",
        "/Users/kevinyang/Documents/PersonalWebsite/react/public/misc/Baseball/Triples",
        "/Users/kevinyang/Documents/PersonalWebsite/react/public/misc/Baseball/Homeruns",
    ]

    # Loop through each pair of file path and download path
    for file_path, download_path in zip(file_paths, download_paths):
        print(f"Downloading videos from {file_path} to {download_path}...")
        download_videos_from_file(file_path, download_path)
