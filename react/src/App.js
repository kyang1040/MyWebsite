import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Hobbies from "./pages/Hobbies";
import Contact from "./pages/Contact";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import InvalidRoute from "./pages/InvalidRoute";
import "./styling/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
