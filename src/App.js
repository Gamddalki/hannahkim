import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Projects from "./Routes/Projects";
import Publications from "./Routes/Publications";
import Arts from "./Routes/Arts";
import Details from "./Routes/Details";
import ScrollToTop from "./Components/ScrollToTop";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // false로 바꾸기
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/arts" element={<Arts />} />
          <Route path="/:category/:id" element={<Details />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />{" "}
      </Router>
    </ThemeProvider>
  );
}

export default App;
