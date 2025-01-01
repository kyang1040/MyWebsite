import React, { useState, useEffect } from "react";
import "../styling/Hobbies.css";

const Hobbies = () => {
  const [stats, setStats] = useState({});
  const [videos, setVideos] = useState({});
  const [error, setError] = useState(null);

  const imagePaths = [
    "/misc/Baseball/Images/Little_Pitch.JPG",
    "/misc/Baseball/Images/Cooperstown.JPEG",
    "/misc/Baseball/Images/Westfield_Pitch.JPEG",
    "/misc/Baseball/Images/Team_Pic.PNG",
    "/misc/Baseball/Images/MVP.JPG",
  ];

  // Fetch stats from a file
  const fetchStats = async (path) => {
    console.log(`Fetching stats from: ${path}`); // Log stats path
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to fetch stats from ${path}`);
      const text = await response.text();
      return text.split("\n").filter((line) => line);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      return [];
    }
  };

  // Fetch video data from the JSON file
  const fetchVideoData = async () => {
    console.log(
      "Fetching video data from: /misc/Baseball/video_file_list.json"
    ); // Log JSON path
    try {
      const response = await fetch("/misc/Baseball/video_file_list.json");
      if (!response.ok) throw new Error("Failed to fetch video list.");
      const data = await response.json();
      console.log("Video data loaded:", data); // Log video data
      return data;
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      return {};
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      const years = ["2014", "2015", "2016", "combined"];
      const statsData = {};
      for (const year of years) {
        statsData[year] = await fetchStats(
          `/misc/Baseball/Stats/game_data_${year}_stats.txt`
        );
      }
      console.log("Stats data loaded:", statsData); // Log stats data
      setStats(statsData);

      const videoData = await fetchVideoData();
      console.log("Videos state set:", videoData); // Log final video state
      setVideos(videoData);
    };

    loadContent();
  }, []);

  const LazyVideo = ({ src }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoadedData = () => {
      setIsLoading(false);
      console.log(`Video loaded successfully: ${src}`); // Log successful video load
    };
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      console.error(`Error loading video: ${src}`); // Log video load error
    };

    console.log(`Attempting to load video from path: ${src}`); // Log video path being used

    return (
      <div className="video-wrapper">
        {isLoading && !hasError && (
          <div className="video-loading">Loading video...</div>
        )}
        {hasError ? (
          <div className="video-error">Unable to load video</div>
        ) : (
          <video
            controls
            className="video"
            onLoadedData={handleLoadedData}
            onError={handleError}
          >
            <source src={src} type={`video/${src.split(".").pop()}`} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );
  };

  const renderStats = (year) => (
    <div className="stats">
      <h2>Stats for {year}</h2>
      <ul>
        {stats[year]?.length > 0 ? (
          stats[year].map((line, index) => <li key={index}>{line}</li>)
        ) : (
          <li>Data not available</li>
        )}
      </ul>
    </div>
  );

  const renderVideos = (videoList, basePath) => (
    <div className="videos">
      {videoList?.length > 0 ? (
        videoList.map((video, index) => {
          const fullPath = `${basePath}/${video}`; // Construct the full path
          console.log(`Attempting to load video from path: ${fullPath}`); // Log full path
          return <LazyVideo key={index} src={fullPath} />;
        })
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );

  return (
    <div className="container">
      <div className="image-gallery">
        <h2>Photo Gallery</h2>
        <div className="image-grid">
          {imagePaths.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Photo ${index + 1}`}
              className="gallery-image"
              onError={(e) =>
                (e.target.src = "/misc/Baseball/Images/placeholder.jpg")
              }
            />
          ))}
        </div>
      </div>

      {["2014", "2015", "2016"].map((year) => (
        <div key={year} className="year-section">
          {renderStats(year)}
          <h3>Singles</h3>
          {renderVideos(
            videos[`${year}/Singles`] || [],
            `/misc/Baseball/${year}/Singles`
          )}
          <h3>Doubles</h3>
          {renderVideos(
            videos[`${year}/Doubles`] || [],
            `/misc/Baseball/${year}/Doubles`
          )}
          <h3>Triples</h3>
          {renderVideos(
            videos[`${year}/Triples`] || [],
            `/misc/Baseball/${year}/Triples`
          )}
          <h3>Homeruns</h3>
          {renderVideos(
            videos[`${year}/Homeruns`] || [],
            `/misc/Baseball/${year}/Homeruns`
          )}
        </div>
      ))}

      <div className="college-section">
        <h2>College Videos</h2>
        {renderVideos(videos["College"] || [], "/misc/Baseball/College")}
      </div>

      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

export default Hobbies;
