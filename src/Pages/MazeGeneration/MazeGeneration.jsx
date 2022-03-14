import "./MazeGeneration.scss"

import Navbar from "../../Home/Components/Navbar/Navbar";
import CellGrid from "../../MazeGeneration/Components/CellGrid/CellGrid";

function MazeGeneration() {
    return (
        <div className="maze-page-container">
            <Navbar />
            <CellGrid />
        </div>
    );
}

export default MazeGeneration;