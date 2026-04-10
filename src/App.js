import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Works from "./Routes/Works";
import Publications from "./Routes/Publications";
import Studio from "./Routes/Studio";
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
          <Route path="/works" element={<Works />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/:category/:id" element={<Details />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />{" "}
      </Router>
    </ThemeProvider>
  );
}

export default App;
