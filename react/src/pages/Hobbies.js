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

  /**
   * Toggle the specified year:
   * 1) If year is currently open, close it.
   * 2) If year is closed, close all others, then open this one.
   * 3) If it's "College," open the modal and close all toggles.
   */
  const toggleYear = (year) => {
    setYearToggles((prev) => {
      // Was this year currently open?
      const wasOpen = !!prev[year];

      // Create a blank "close all" object
      const newToggles = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // If year is "College," open the modal & return (closing all toggles)
      if (year === "College") {
        openModal("College", "College");
        return newToggles; // everything remains closed
      }

      // If year wasn't open before, open it now
      if (!wasOpen) {
        newToggles[year] = true;
      }
      return newToggles;
    });
  };

  const openModal = (year, category) => {
    setActiveYear(year);
    setActiveCategory(category);
    setModalIsOpen(true);
    // document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveYear(null);
    setActiveCategory(null);
    // Untoggle all on close
    setYearToggles({});
    document.body.style.overflow = "unset"; // unlock scroll
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
          {years.map((year) => {
            const isOpen = !!yearToggles[year];
            return (
              <div key={year} className="year-card">
                <button
                  onClick={() => toggleYear(year)}
                  className={`year-button ${isOpen ? "active" : ""}`}
                >
                  <span>{year}</span>
                  {/* Show up/down chevron for 2014/2015/2016 only */}
                  {year !== "College" &&
                    (isOpen ? <ChevronUp /> : <ChevronDown />)}
                </button>

                {year !== "College" && isOpen && (
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
            );
          })}
        </div>

        {/* Modal */}
        {modalIsOpen && (
          <div className="modal-overlay">
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
