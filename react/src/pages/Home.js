import React from "react";
import "../styling/Home.css";
import headshot from "../img/headshot.jpeg";

const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <h5 className="welcome-text">Welcome to My World</h5>
        <h1>
          Hi, I'm <span className="highlight">Kevin Yang</span>, a{" "}
          <span className="highlight no-wrap">Software Engineer</span>.
        </h1>
        <p className="description">
          I am a third-year computer science student at Princeton University
          with a strong background in algorithms and software development. I
          have industry experience at Google, and enjoy using my skills to make
          products that many people use.
        </p>
        <p className="description">
          In my free time, I enjoy playing baseball, skiing, and photography.
        </p>
      </div>
      <div className="image-container">
        <img src={headshot} alt="Kevin Yang" className="profile-image" />
      </div>
    </div>
  );
};

export default Home;
