import React from "react";
import "../styling/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1 className="title">Let's Connect!</h1>
        <div className="contact-info">
          <a href="mailto:ky6374@princeton.edu" className="info-item">
            <span className="icon">📧</span>
            <span className="info-link">Email</span>
          </a>
          <a href="tel:+19086745409" className="info-item">
            <span className="icon">📱</span>
            <span className="info-link">Phone Number</span>
          </a>
          <a
            href="https://linkedin.com/in/kyang1040"
            target="_blank"
            rel="noopener noreferrer"
            className="info-item"
          >
            <span className="icon">💼</span>
            <span className="info-link">LinkedIn</span>
          </a>
          <a
            href="https://github.com/ky6374"
            target="_blank"
            rel="noopener noreferrer"
            className="info-item"
          >
            <span className="icon">🐙</span>
            <span className="info-link">GitHub</span>
          </a>
          <a
            href="https://instagram.com/kevinyang0416"
            target="_blank"
            rel="noopener noreferrer"
            className="info-item"
          >
            <span className="icon">📸</span>
            <span className="info-link">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
