import "./MazeGenerationVisualizer.scss";

import { useEffect, useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

import AStarSearch from "../../PathfindingAlgorithms/AStartSearch";
import BreadthFirstSearch from "../../PathfindingAlgorithms/BreadthFirstSearch";
import DepthFirstSearch from "../../PathfindingAlgorithms/DepthFirstSearch";

import SelfAvoidingWalk from "../../MazeGenerationAlgorithms/SelfAvoidingWalk";
import CellGrid from "../CellGrid/CellGrid";

const searchAlgorithms = [
    {
        label: "A* Search",
        value: "AStarSearch",
        algo: AStarSearch,
    },
    {
        label: "Depth First Search",
        value: "DepthFirstSearch",
        algo: DepthFirstSearch,
    },
    {
        label: "Breadth First Search",
        value: "BreadthFirstSearch",
        algo: BreadthFirstSearch,
    },
];

const generationAlgorithms = [
    {
        label: "Self Avoiding Walk",
        value: "SelfAvoidingWalk",
        algo: SelfAvoidingWalk,
    },
];

var genFunc = undefined;
var searchFunc = undefined;
const algos = {};

export default function MazeGenerationVizualizer() {

    const [genAlgo, setGenAlgo] = useState("SelfAvoidingWalk");
    const [searchAlgo, setSearchAlgo] = useState("AStarSearch");

    const [cols, setCols] = useState(31);
    const [rows, setRows] = useState(21);
    const [key, setkey] = useState(0);

    useEffect(() => {
        algos.gen = generationAlgorithms.find(it => it.value === genAlgo);
        algos.search = searchAlgorithms.find(it => it.value === searchAlgo);
    }, [genAlgo, searchAlgo]);

    return (
        <div className="visualizer-container">
            <div className="option-panel-container">
                <DimensionsInput label="Number of Rows" value={rows} onChange={(e) => { setRows(e.target.value); setkey(key + 1) }} />
                <DimensionsInput label="Number of Columns" value={cols} onChange={(e) => { setCols(e.target.value); setkey(key + 1) }} />
                <AlgorithmSelector
                    menuLabel="Generation Algorithm"
                    buttonLabel="Generate"
                    value={genAlgo}
                    options={generationAlgorithms}
                    onChange={setGenAlgo}
                    onClick={() => genFunc(algos.gen.algo)}
                />
                <AlgorithmSelector
                    menuLabel="Pathfinding Algorithm"
                    buttonLabel="Search"
                    value={searchAlgo}
                    options={searchAlgorithms}
                    onChange={setSearchAlgo}
                    onClick={() => searchFunc(algos.search.algo)}
                />
            </div>
            <CellGrid key={key} colCount={cols} rowCount={rows} saveStartGen={(f) => genFunc = f} saveStartSearch={(f) => searchFunc = f} />
        </div>
    );
}

function DimensionsInput({ label, value, onChange }) {
    return (
        <label className="dimension-label">
            {label}
            <input className="dimension-input" type="number" value={value} onChange={onChange} />
        </label>
    )
}

function AlgorithmSelector({ menuLabel, buttonLabel, value, options, onChange, onClick }) {
    return (
        <div className="algorithm-selector">
            <DropdownMenu label={menuLabel} value={value} options={options} onChange={onChange} />
            <button className="dropdown-submit" onClick={onClick}> {buttonLabel} </button>
        </div>
    )
}
