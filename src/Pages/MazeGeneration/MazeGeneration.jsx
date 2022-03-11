import "./MazeGeneration.scss"

import Navbar from "../../Components/Navbar/Navbar";
import CellGrid from "../../Components/CellGrid/CellGrid";

function MazeGeneration() {
    return (
        <div className="maze-page-container">
            <Navbar />
            <CellGrid />
        </div>
    );
}

export default MazeGeneration;