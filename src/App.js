import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Footer from "./Components/Footer";
import Details from "./Routes/Details";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<Details />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
