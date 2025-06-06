import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nurons from "./components/Neurons";
import Home from "./components/main";
import Functions from "./components/functions";
import Networks from "./components/networks";
import Architecture from "./components/architecture"
import Convolution  from "./components/convolution";
import ConvolutionCalculator  from "./components/calc";
import Edges  from "./components/edges";
import Treshold  from "./components/treshold";
import Filters  from "./components/filters";
import Final  from "./components/final";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/neurons" element={<Nurons />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/networks" element={<Networks />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/convolution" element={<Convolution />} />
        <Route path="/calc" element={<ConvolutionCalculator />} />
        <Route path="/edges" element={<Edges />} />
        <Route path="/treshold" element={<Treshold />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/final" element={<Final />} />
        
      </Routes>
    </Router>
  );
}

export default App;