import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Header.css";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsExpanded(false);
  };

  // Add event listener to close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded]);

  return (
    <nav className="navbar">
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Links */}
      <div id="nav-options" className={isExpanded ? "expanded" : ""}>
        <ul id="left-options">
          <li onClick={() => handleNavigation("/")}>
            <div className="nav-item">Home</div>
          </li>
          <li onClick={() => handleNavigation("/education")}>
            <div className="nav-item">Education</div>
          </li>
          <li onClick={() => handleNavigation("/skills")}>
            <div className="nav-item">Skills</div>
          </li>
          <li onClick={() => handleNavigation("/experience")}>
            <div className="nav-item">Experience</div>
          </li>
          <li onClick={() => handleNavigation("/hobbies")}>
            <div className="nav-item">Hobbies</div>
          </li>
        </ul>
        <ul id="right-options">
          <li onClick={() => handleNavigation("/contact")}>
            <div className="nav-item">Contact</div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
