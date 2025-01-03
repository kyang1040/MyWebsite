import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "../styling/Hobbies.css";

// Make sure to bind modal to your appElement (for accessibility)
ReactModal.setAppElement("#root");

const Hobbies = () => {
  const [stats, setStats] = useState({});
  const [videos, setVideos] = useState({});
  const [error, setError] = useState(null);

  // Tracks which year is expanded (to show sub-options)
  // Example structure: { "2014": true, "2015": false, ... }
  const [yearToggles, setYearToggles] = useState({});

  // We’ll open the same modal for stats, singles, doubles, etc.
  // activeYear: which year is currently shown in the modal
  // activeCategory: "Stats", "Singles", "Doubles", "Triples", or "Homeruns"
  // For College, activeCategory might be "College"
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

  // ------------------- Data Fetching -------------------
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

  // ------------------- Toggle Logic -------------------
  const toggleYear = (year) => {
    // If it’s "College," skip the toggle and open the modal immediately
    if (year === "College") {
      openModal("College", "College");
      return;
    }

    setYearToggles((prev) => {
      const isCurrentlyOpen = !!prev[year];
      return {
        ...prev,
        [year]: !isCurrentlyOpen,
      };
    });
  };

  // ------------------- Modal Logic -------------------
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

  // Returns the actual content (JSX) for the open modal
  const getModalContent = () => {
    if (!activeYear || !activeCategory) return null;

    // College was clicked: show College videos
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

    // For 2014, 2015, 2016 subcategories
    if (activeCategory === "Stats") {
      // Show the lines from stats
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
    } else {
      // Singles, Doubles, Triples, Homeruns
      const videoPathKey = `${activeYear}/${activeCategory}`; // e.g. "2014/Singles"
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
    }
  };

  // ------------------- Rendering -------------------
  return (
    <div className="container">
      {/* 1) Top row of 5 images */}
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

      {/* 2) Row of years, centered */}
      <div className="years-row">
        {years.map((year) => {
          const isOpen = !!yearToggles[year];

          // For 2014, 2015, 2016: we’ll show sub-options if open
          // For College: we skip sub-options
          return (
            <div key={year} className="year-wrapper">
              <button
                className="year-toggle-button"
                onClick={() => toggleYear(year)}
              >
                {isOpen ? "–" : "+"} {year}
              </button>

              {/* Sub-options (vertical list) for 2014, 2015, 2016 only */}
              {year !== "College" && isOpen && (
                <div className="year-sub-options">
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

      {/* 3) React Modal */}
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

      {/* 4) Error Message */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Hobbies;
