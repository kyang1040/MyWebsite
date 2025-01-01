import React from "react";
import "../styling/Experience.css";

const experiences = [
  {
    id: "google",
    title: (
      <span className="google-title">
        <span className="letter" style={{ "--color": "#4285F4" }}>
          G
        </span>
        <span className="letter" style={{ "--color": "#EA4335" }}>
          o
        </span>
        <span className="letter" style={{ "--color": "#FBBC05" }}>
          o
        </span>
        <span className="letter" style={{ "--color": "#4285F4" }}>
          g
        </span>
        <span className="letter" style={{ "--color": "#34A853" }}>
          l
        </span>
        <span className="letter" style={{ "--color": "#EA4335" }}>
          e
        </span>
      </span>
    ),
    subtitle: "Software Engineering Intern",
    location: "Mountain View, CA",
    duration: "May 2024 - August 2024",
    technologies: "Java, Dart, AngularDart, SQL, Protobuffer, HTML, CSS",
    responsibilities: [
      "Launched three features in production for Google Ads, starting from the design document to the launch document.",
      "Restructured full-stack data piping flow for dynamically rendering hotel performance max (pmax) ad previews, leading to an 11% increase in the average ad strength score.",
      "Researched, designed, and implemented full-stack features to enable external preview sharing for Responsive Search Ads in the search ad editor (1M+ views per day), and Retail Pmax and Hotel Pmax in the pmax ad editor (100k+ views per day).",
    ],
  },
  {
    id: "whirlab",
    title: (
      <span className="whirlab-title">
        <span style={{ color: "#000000", fontWeight: "bold" }}>WHIR</span>
        <span style={{ color: "#FF0000", fontWeight: "bold" }}>L</span>
        <span style={{ color: "#000000", fontWeight: "bold" }}>ab</span>
      </span>
    ),
    subtitle: "Machine Learning Intern",
    location: "New Brunswick, NJ",
    duration: "August 2019 - June 2022",
    technologies: "Python, Tensorflow, OpenCV, Java, QGIS",
    responsibilities: [
      "Developed & trained a Fully Convolutional Network model to segment water in images, reaching 73% segmentation precision & 80% bounding box precision; presented at AGU and EarthCube.",
      "Semi-automated monoplotting process to establish a correlation between 100+ flood photos & elevation data; presented at AGU.",
      "Helped implement a Convolutional Neural Network model to predict flood phases from Twitter tweets, achieving 92% precision; published paper to IEEE Xplore.",
    ],
  },
  {
    id: "njgset",
    title: (
      <span className="njgset-title">
        <span style={{ color: "#FF0000", fontWeight: "bold" }}>NJ</span>{" "}
        <span style={{ color: "#1E90FF", fontWeight: "bold" }}>Governor’s</span>{" "}
        <span style={{ color: "#FF0000", fontWeight: "bold" }}>School</span>{" "}
        <span style={{ color: "#1E90FF", fontWeight: "bold" }}>of</span>{" "}
        <span style={{ color: "#FF0000", fontWeight: "bold" }}>
          Engineering
        </span>{" "}
        <span style={{ color: "#1E90FF", fontWeight: "bold" }}>and</span>{" "}
        <span style={{ color: "#FF0000", fontWeight: "bold" }}>Technology</span>{" "}
        <span role="img" aria-label="lightbulb" style={{ marginLeft: "0.5vw" }}>
          💡
        </span>
      </span>
    ),
    subtitle: "Scholar",
    location: "New Brunswick, New Jersey",
    duration: "June 2021 - July 2021",
    technologies: "Python, Jupyter Notebook, Tensorflow, Keras, NumPy, Flask",
    responsibilities: [
      "Implemented, trained, & fine-tuned Convolutional Neural Network model to recognize facial emotion; fused model with tonal-emotion model and achieved 69% testing accuracy.",
      "Published to IEEE Xplore (2022); presented in AI track to 100+ attendees at the IEEE MIT URTC Conference (2021).",
      "1st in Robotics competition, efficiently programmed robots to navigate complex maze.",
    ],
  },
];

const publications = [
  {
    title: "AI Emotion Recognition",
    link: "https://ieeexplore.ieee.org/document/9701627",
  },
  {
    title: "CNN Flooding",
    link: "https://ieeexplore.ieee.org/document/9091866",
  },
  {
    title: "AI Flood Mapping",
    link: "https://agu.confex.com/agu/fm20/meetingapp.cgi/Paper/712171",
  },
  {
    title: "Semantic Segmentation Flooding",
    link: "https://drive.google.com/file/d/1uV9UnH6lrV_NA-iL2j4SqfLX2V326Els/view",
  },
  {
    title: "AI-supported Citizen Science",
    link: "https://agu.confex.com/agu/OVS21/meetingapp.cgi/Paper/787118",
  },
];

const Experience = () => {
  return (
    <div className="experience-section">
      <h1 className="experience-title">Experience</h1>
      {experiences.map((exp) => (
        <div key={exp.id} className={`experience-card ${exp.id}`}>
          <div className="experience-header">
            <h2 className="experience-card-title">{exp.title}</h2>
            <p className="experience-subtitle">{exp.subtitle}</p>
            <p className="experience-location">
              {exp.location} | {exp.duration}
            </p>
            <p className="experience-technologies">
              <strong>Technologies:</strong> {exp.technologies}
            </p>
          </div>
          <div className="responsibilities">
            {exp.responsibilities.map((task, idx) => (
              <div key={idx} className="responsibility-item">
                <span className="responsibility-icon">•</span>{" "}
                {/* Icon for bullet point */}
                <p className="responsibility-text">{task}</p>{" "}
                {/* Task content */}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="publications-section">
        <h2>Publications</h2>
        <ul className="publications-list">
          {publications.map((pub, idx) => (
            <li key={idx}>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="publication-link"
              >
                {pub.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
