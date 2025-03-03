import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EdgeDetection from "./components/EdgeDetection1";
import EdgeDetection2 from "./components/EdgeDetection2";
import Nurons from "./components/Neurons";
import Home from "./components/main";
import Functions from "./components/functions";
import Networks from "./components/networks";
import ColorSegmentation from "./components/Segmentation"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/neurons" element={<Nurons />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/networks" element={<Networks />} />
        <Route path="/Segmentation" element={<ColorSegmentation />} />
        <Route path="/edge-detection" element={<EdgeDetection />} />
        <Route path="/edge-detection-2" element={<EdgeDetection2 />} />
      </Routes>
    </Router>
  );
}

export default App;