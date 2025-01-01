import React from "react";
import "../styling/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <p>© 2024 Kevin Yang. All Rights Reserved.</p>
        <p>
          <a
            href={`${process.env.PUBLIC_URL}/misc/Resume.pdf`}
            download="Resume.pdf"
          >
            Download Resume
          </a>
        </p>
        <p>Last Updated: December 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
