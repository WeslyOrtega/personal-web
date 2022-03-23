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
]

export default function MazeGenerationVizualizer() {

    const [genAlgo, setGenAlgo] = useState("SelfAvoidingWalk");
    const [searchAlgo, setSearchAlgo] = useState("AStarSearch");

    var genFunc = undefined;
    var searchFunc = undefined;

    const algos = {};
    useEffect(() => {
        algos.gen = generationAlgorithms.find(it => it.value === genAlgo);
        algos.search = searchAlgorithms.find(it => it.value === searchAlgo);
    }, [genAlgo, searchAlgo]);

    return (
        <>
            <div className="option-panel-container">
                <DropdownMenu label="Search Algorithm" value={searchAlgo} options={searchAlgorithms} onChange={setSearchAlgo} />
                <button onClick={() => genFunc(algos.gen.algo)}> Go </button>
                <DropdownMenu label="Generation Algorithm" value={genAlgo} options={generationAlgorithms} onChange={setGenAlgo} />
                <button onClick={() => searchFunc(algos.search.algo)}> Go </button>
            </div>
            <CellGrid saveStartGen={(f) => genFunc = f} saveStartSearch={(f) => searchFunc = f} />
        </>
    );
}

