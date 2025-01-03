// Hobbies.js

import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import "../styling/Hobbies.css";

const Hobbies = () => {
  const [stats, setStats] = useState({});
  const [videos, setVideos] = useState({});
  const [error, setError] = useState(null);
  const [yearToggles, setYearToggles] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeYear, setActiveYear] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const imagePaths = [
    "/misc/Baseball/Images/Little_Pitch.JPG",
    "/misc/Baseball/Images/Cooperstown.JPEG",
    "/misc/Baseball/Images/Westfield_Pitch.JPEG",
    "/misc/Baseball/Images/Team_Pic.PNG",
    "/misc/Baseball/Images/MVP.JPG",
  ];

  const years = ["2014", "2015", "2016", "College"];

  useEffect(() => {
    const loadContent = async () => {
      try {
        const statsData = {};
        // Fetch stats only for 2014, 2015, 2016
        for (const year of years.filter((y) => y !== "College")) {
          statsData[year] = await fetchStats(
            `/misc/Baseball/Stats/game_data_${year}_stats.txt`
          );
        }
        setStats(statsData);

        const videoData = await fetchVideoData();
        setVideos(videoData);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

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

  // 1) If a year is toggled open and we click "College",
  //    it closes the toggled year, just like toggling from 2014->2015.
  const toggleYear = (year) => {
    // Same "close all" logic for any year
    setYearToggles((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );

    if (year === "College") {
      // Open the modal immediately
      openModal("College", "College");
      return;
    }
    // Otherwise, open that year's dropdown
    setYearToggles((prev) => ({
      ...prev,
      [year]: true,
    }));
  };

  // 2) Opening the modal locks body scroll
  const openModal = (year, category) => {
    setActiveYear(year);
    setActiveCategory(category);
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  // 2) & 5) On close, untoggle year + re-enable body scroll
  const closeModal = () => {
    setModalIsOpen(false);
    setActiveYear(null);
    setActiveCategory(null);
    // All years get untoggled on close
    setYearToggles({});
    document.body.style.overflow = "unset";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading baseball memories...</p>
      </div>
    );
  }

  return (
    <div className="hobbies-container">
      <div className="content-wrapper">
        <h1 className="main-title">Baseball Throughout the Years...</h1>

        {/* Image Gallery */}
        <div className="image-gallery">
          {imagePaths.map((image, index) => (
            <div
              key={index}
              className="image-card"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`Baseball moment ${index + 1}`} />
              <div className="image-overlay">
                <span>View</span>
              </div>
            </div>
          ))}
        </div>

        {/* Years Grid */}
        <div className="years-grid">
          {years.map((year) => (
            <div key={year} className="year-card">
              <button
                onClick={() => toggleYear(year)}
                className={`year-button ${yearToggles[year] ? "active" : ""}`}
              >
                <span>{year}</span>
                {/* Show up/down chevron for 2014/2015/2016 only */}
                {year !== "College" &&
                  (yearToggles[year] ? (
                    <ChevronUp className="icon" />
                  ) : (
                    <ChevronDown className="icon" />
                  ))}
              </button>

              {/* Sub-options appear if toggled (and not College) */}
              {year !== "College" && yearToggles[year] && (
                <div className="dropdown-menu">
                  {["Stats", "Singles", "Doubles", "Triples", "Homeruns"].map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => openModal(year, category)}
                        className="dropdown-item"
                      >
                        <span className="plus-icon">+</span>
                        <span>{category}</span>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 3) & 5) Modal only closes with "X"; user can scroll the content inside */}
        {modalIsOpen && (
          <div className="modal-overlay">
            {/* 
              pointer-events: none on the overlay or removing
              onClick here ensures we can't close by clicking outside 
            */}
            <div
              className="modal-content"
              // Stop click from closing; user can only press "X"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <X />
              </button>
              <div className="modal-body">
                <ContentSection
                  year={activeYear}
                  category={activeCategory}
                  stats={stats}
                  videos={videos}
                />
              </div>
            </div>
          </div>
        )}

        {/* Lightbox for images */}
        {selectedImage && (
          <div className="lightbox" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Enlarged view" />
          </div>
        )}

        {error && <div className="error-toast">{error}</div>}
      </div>
    </div>
  );
};

const ContentSection = ({ year, category, stats, videos }) => {
  if (year === "College" && category === "College") {
    const videoList = videos["College"] || [];
    return (
      <div className="content-section">
        <h2>College Highlights</h2>
        <div className="video-grid">
          {videoList.map((vid, idx) => (
            <div key={idx} className="video-wrapper">
              <video controls src={`/misc/Baseball/College/${vid}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category === "Stats") {
    const textLines = stats[year] || [];
    return (
      <div className="content-section">
        <h2>{year} Statistics</h2>
        <div className="stats-list">
          {textLines.map((line, idx) => (
            <div key={idx} className="stat-item">
              {line}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const videoPathKey = `${year}/${category}`;
  const videoList = videos[videoPathKey] || [];
  return (
    <div className="content-section">
      <h2>
        {category} - {year}
      </h2>
      <div className="video-grid">
        {videoList.map((vid, idx) => (
          <div key={idx} className="video-wrapper">
            <video controls src={`/misc/Baseball/${videoPathKey}/${vid}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;
