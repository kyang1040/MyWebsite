import React from "react";
import "../styling/Skills.css";

const Skills = () => {
  return (
    <div className="skills-page">
      <h1 className="skills-title">Skills</h1>
      <div className="skills-container">
        <div className="category">
          <div className="category-title">
            <h2>Programming 💻</h2>
          </div>
          <ul className="skills-list">
            <li>Java</li>
            <li>Python</li>
            <li>C++</li>
            <li>C</li>
            <li>Dart</li>
            <li>Protobuf</li>
            <li>Javascript</li>
            <li>Rust</li>
            <li>MIPS Assembly</li>
            <li>ARMv8 Assembly</li>
          </ul>
        </div>
        <div className="category">
          <div className="category-title">
            <h2>Database 🗄️</h2>
          </div>
          <ul className="skills-list">
            <li>PostgreSQL</li>
            <li>SQLite</li>
          </ul>
        </div>
        <div className="category">
          <div className="category-title">
            <h2>Design 🎨</h2>
          </div>
          <ul className="skills-list">
            <li>HTML</li>
            <li>CSS</li>
            <li>Bootstrap</li>
            <li>Latex</li>
          </ul>
        </div>
        <div className="category">
          <div className="category-title">
            <h2>WebApp 🌐</h2>
          </div>
          <ul className="skills-list">
            <li>Render</li>
            <li>Flask</li>
            <li>React</li>
          </ul>
        </div>
        <div className="category">
          <div className="category-title">
            <h2>DevTools 🛠️</h2>
          </div>
          <ul className="skills-list">
            <li>VS Code</li>
            <li>IntelliJ</li>
            <li>Eclipse</li>
            <li>Vim</li>
          </ul>
        </div>
        <div className="category">
          <div className="category-title">
            <h2>Miscellaneous ⚙️</h2>
          </div>
          <ul className="skills-list">
            <li>Git</li>
            <li>Linux</li>
            <li>API</li>
            <li>NumPy</li>
            <li>Pandas</li>
            <li>AutoCAD</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
