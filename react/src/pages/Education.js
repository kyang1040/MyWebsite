import React from "react";
import "../styling/Education.css";
import princeton from "../img/princeton.jpg";

const courseworkLinks = [
  {
    name: "Advanced Programming Techniques",
    url: "https://www.cs.princeton.edu/courses/archive/fall24/cos333/index.html",
  },
  {
    name: "Algorithms and Data Structures",
    url: "https://www.cs.princeton.edu/courses/archive/fall24/cos226/",
  },
  {
    name: "Introduction to Programming Systems",
    url: "https://www.cs.princeton.edu/courses/archive/fall24/cos217/info.php",
  },
  {
    name: "Computer Architecture and Organization",
    url: "https://www.cs.princeton.edu/courses/archive/fall15/cos375/",
  },
  {
    name: "Operating Systems",
    url: "https://www.cs.princeton.edu/courses/archive/fall20/cos318/index.html",
  },
  {
    name: "Introduction to Machine Learning",
    url: "https://www.cs.princeton.edu/courses/archive/spring19/cos324/",
  },
  {
    name: "Natural Language Processing",
    url: "https://princeton-nlp.github.io/cos484/",
  },
  {
    name: "Computer Vision",
    url: "https://3dvision.princeton.edu/courses/COS429/2014fa/",
  },
];

const Education = () => {
  return (
    <div className="education-section">
      <h1 className="education-title">Education</h1>
      <div className="education-content-container">
        <div className="education-card">
          <div className="education-header">
            <div className="education-header-left">
              <h2>Princeton University</h2>
              <p className="graduation-date">Expected May 2026</p>
            </div>
            <p className="gpa-top">
              <strong>GPA:</strong> 3.89
            </p>
          </div>
          <div className="education-content">
            <p className="degree">
              <strong>Bachelor of Science in Engineering</strong> in Computer
              Science
            </p>
            <p className="minor">
              <strong>Minor:</strong> Statistics and Machine Learning
            </p>
            <div className="coursework">
              <strong>Relevant Coursework:</strong>
              <ul className="coursework-list">
                {courseworkLinks.map((course) => (
                  <li key={course.name}>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {course.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="education-image">
          <img src={princeton} alt="Princeton University" />
        </div>
      </div>
    </div>
  );
};

export default Education;
