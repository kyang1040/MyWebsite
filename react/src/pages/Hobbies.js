import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "../styling/Hobbies.css";

// Make sure to bind modal to your appElement (for accessibility)
ReactModal.setAppElement("#root");

const Hobbies = () => {
  const [stats, setStats] = useState({});
  const [videos, setVideos] = useState({});
  const [error, setError] = useState(null);
  const [yearToggles, setYearToggles] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeYear, setActiveYear] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // 5 Images at the top
  const imagePaths = [
    "/misc/Baseball/Images/Little_Pitch.JPG",
    "/misc/Baseball/Images/Cooperstown.JPEG",
    "/misc/Baseball/Images/Westfield_Pitch.JPEG",
    "/misc/Baseball/Images/Team_Pic.PNG",
    "/misc/Baseball/Images/MVP.JPG",
  ];

  const years = ["2014", "2015", "2016", "College"];

  // Data Fetching Functions
  const fetchStats = async (path) => {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to fetch stats from ${path}`);
      const text = await response.text();
      return text.split("\n").filter((line) => line);
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const fetchVideoData = async () => {
    try {
      const response = await fetch("/misc/Baseball/video_file_list.json");
      if (!response.ok) throw new Error("Failed to fetch video list.");
      return await response.json();
    } catch (err) {
      setError(err.message);
      return {};
    }
  };

  // Initial Data Loading
  useEffect(() => {
    const loadContent = async () => {
      const statsData = {};
      // Only fetch stats for 2014, 2015, 2016
      for (const year of years.filter((y) => y !== "College")) {
        statsData[year] = await fetchStats(
          `/misc/Baseball/Stats/game_data_${year}_stats.txt`
        );
      }
      setStats(statsData);

      const videoData = await fetchVideoData();
      setVideos(videoData);
    };
    loadContent();
  }, []);

  // Toggle Year Function
  const toggleYear = (year) => {
    if (year === "College") {
      openModal("College", "College");
      return;
    }

    setYearToggles((prev) => ({
      // Close all other years when opening a new one
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [year]: !prev[year],
    }));
  };

  // Modal Functions
  const openModal = (year, category) => {
    setActiveYear(year);
    setActiveCategory(category);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveYear(null);
    setActiveCategory(null);
  };

  // Modal Content Function
  const getModalContent = () => {
    if (!activeYear || !activeCategory) return null;

    // College Content
    if (activeYear === "College" && activeCategory === "College") {
      const videoList = videos["College"] || [];
      return (
        <div className="modal-content">
          <h2>College Videos</h2>
          <div className="modal-videos-row">
            {videoList.length > 0 ? (
              videoList.map((vid, idx) => (
                <video
                  key={idx}
                  className="video"
                  controls
                  src={`/misc/Baseball/College/${vid}`}
                />
              ))
            ) : (
              <p>No videos available</p>
            )}
          </div>
        </div>
      );
    }

    // Stats Content
    if (activeCategory === "Stats") {
      const textLines = stats[activeYear] || [];
      return (
        <div className="modal-content">
          <h2>Stats for {activeYear}</h2>
          {textLines.length > 0 ? (
            <ul>
              {textLines.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>No stats available</p>
          )}
        </div>
      );
    }

    // Videos Content (Singles, Doubles, Triples, Homeruns)
    const videoPathKey = `${activeYear}/${activeCategory}`;
    const videoList = videos[videoPathKey] || [];
    return (
      <div className="modal-content">
        <h2>
          {activeCategory} for {activeYear}
        </h2>
        <div className="modal-videos-row">
          {videoList.length > 0 ? (
            videoList.map((vid, idx) => (
              <video
                key={idx}
                className="video"
                controls
                src={`/misc/Baseball/${videoPathKey}/${vid}`}
              />
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="hobbies-container">
      {/* Image Gallery */}
      <div className="image-gallery">
        {imagePaths.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Photo ${index + 1}`}
            className="gallery-image"
          />
        ))}
      </div>

      {/* Years Row */}
      <div className="years-row">
        {years.map((year) => {
          const isOpen = !!yearToggles[year];

          return (
            <div key={year} className="year-wrapper">
              <button
                className="year-toggle-button"
                onClick={() => toggleYear(year)}
              >
                {isOpen ? "–" : "+"} {year}
              </button>

              {year !== "College" && (
                <div className={`year-sub-options ${isOpen ? "expanded" : ""}`}>
                  <button
                    onClick={() => openModal(year, "Stats")}
                    className="sub-option-button"
                  >
                    + Stats
                  </button>
                  <button
                    onClick={() => openModal(year, "Singles")}
                    className="sub-option-button"
                  >
                    + Singles
                  </button>
                  <button
                    onClick={() => openModal(year, "Doubles")}
                    className="sub-option-button"
                  >
                    + Doubles
                  </button>
                  <button
                    onClick={() => openModal(year, "Triples")}
                    className="sub-option-button"
                  >
                    + Triples
                  </button>
                  <button
                    onClick={() => openModal(year, "Homeruns")}
                    className="sub-option-button"
                  >
                    + Homeruns
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "80vw",
            height: "80vh",
            margin: "auto",
            border: "2px solid #2196f3",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          },
        }}
        contentLabel="Modal"
      >
        <button className="close-modal-button" onClick={closeModal}>
          X
        </button>
        {getModalContent()}
      </ReactModal>

      {/* Error Message */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Hobbies;
