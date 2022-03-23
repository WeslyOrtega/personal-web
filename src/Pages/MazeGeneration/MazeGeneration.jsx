import "./MazeGeneration.scss"

import Navbar from "../../Home/Components/Navbar/Navbar";
import MazeGenerationVizualizer from "../../MazeGeneration/Components/MazeGenerationVizualizer/MazeGenerationVizualizer";

function MazeGeneration() {
    return (
        <div className="maze-page-container">
            <Navbar />
            <MazeGenerationVizualizer />
        </div>
    );
}

export default MazeGeneration;