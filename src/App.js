import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Routes/Home";
import Hannah from "./Routes/Hannah";
import Projects from "./Routes/Projects";
import Publications from "./Routes/Publications";
import Details from "./Routes/Details";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hannah" element={<Hannah />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/:category/:id" element={<Details />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
