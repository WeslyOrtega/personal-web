import "./MazeGeneration.scss"

import Navbar from "../../Home/Components/Navbar/Navbar";
import MazeGenerationVizualizer from "../../MazeGeneration/Components/MazeGenerationVisualizer/MazeGenerationVisualizer";

function MazeGeneration() {
    return (
        <div className="maze-page-container">
            <Navbar />
            <MazeGenerationVizualizer />
        </div>
    );
}

export default MazeGeneration;