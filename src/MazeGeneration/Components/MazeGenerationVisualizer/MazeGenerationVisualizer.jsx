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

    const [cols, setCols] = useState(51);
    const [rows, setRows] = useState(21);
    const [key, setkey] = useState(0);

    useEffect(() => {
        algos.gen = generationAlgorithms.find(it => it.value === genAlgo);
        algos.search = searchAlgorithms.find(it => it.value === searchAlgo);
    }, [genAlgo, searchAlgo]);

    return (
        <>
            <div className="option-panel-container">
                <DropdownMenu label="Generation Algorithm" value={genAlgo} options={generationAlgorithms} onChange={setGenAlgo} />
                <label>Number of Rows</label><input type="number" value={rows} onChange={(e) => { setRows(e.target.value); setkey(key + 1) }}></input>
                <label>Number of Columns</label><input type="number" value={cols} onChange={(e) => { setCols(e.target.value); setkey(key + 1) }}></input>
                <button onClick={() => genFunc(algos.gen.algo)}> Generate </button>
                <DropdownMenu label="Search Algorithm" value={searchAlgo} options={searchAlgorithms} onChange={setSearchAlgo} />
                <button onClick={() => searchFunc(algos.search.algo)}> Go </button>
            </div>
            <CellGrid key={key} colCount={cols} rowCount={rows} saveStartGen={(f) => genFunc = f} saveStartSearch={(f) => searchFunc = f} />
        </>
    );
}

