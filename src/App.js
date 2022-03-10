import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import MazeGeneration from "./Pages/MazeGeneration/MazeGeneration";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/maze-generation" element={<MazeGeneration />} />
            </Routes>
        </Router>
    );
}

export default App;
