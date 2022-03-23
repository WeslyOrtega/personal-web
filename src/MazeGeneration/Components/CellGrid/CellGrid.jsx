import { Component } from "react";
import "./CellGrid.scss";

import Cell from "../Cell/Cell";
import BreadthFirstSearch from "../../PathfindingAlgorithms/BreadthFirstSearch";
import DepthFirstSearch from "../../PathfindingAlgorithms/DepthFirstSearch";
import AStarSearch from "../../PathfindingAlgorithms/AStartSearch";

import SelfAvoidingWalk from "../../MazeGenerationAlgorithms/SelfAvoidingWalk";

class CellGrid extends Component {

    constructor(props) {
        super(props);
        this.grid = [];
        this.state = {
            rows: 21,
            cols: 51,
            startRow: 1,
            startCol: 0,
            finishRow: 19,
            finishCol: 50,
        };
        this.saveFuncs = this.saveFuncs.bind(this);
        this.getCellNeighbors = this.getCellNeighbors.bind(this);
        this.click = this.click.bind(this);
        this.setGrid = this.setGrid.bind(this);

        this.setGrid();
    };

    setGrid() {
        const grid = []
        for (let i = 0; i < this.state.rows; i++) {
            const currRow = [];
            for (let j = 0; j < this.state.cols; j++) {
                currRow.push(
                    {
                        id: (i * this.state.cols) + j,
                        isStart: i === this.state.startRow && j === this.state.startCol,
                        isFinish: i === this.state.finishRow && j === this.state.finishCol,
                        isVisited: false,
                        isWall: false,
                        setVisited: () => this.grid[i][j].isVisited = true,
                        getNeighbors: () => this.getCellNeighbors(i, j),
                        getDistanceToExit: () => Math.abs(i - this.state.finishRow) + Math.abs(j - this.state.finishCol)
                    }
                );
            }
            grid.push(currRow);
        }
        this.grid = grid;
    }

    saveFuncs(row, col, funcs) {
        let cell = this.grid[row][col];
        const { setVisited, setPath, setWall } = funcs;
        this.grid[row][col] = {
            ...cell,
            animateVisited: setVisited,
            animatePath: setPath,
            animateSetWall: () => setWall(true),
            animateRemoveWall: () => setWall(false),
        };
    }

    getCellNeighbors(i, j) {
        let neighbors = [];
        if (i > 0) {
            neighbors.push(this.grid[i - 1][j]);
        }
        if (i < this.state.rows - 1) {
            neighbors.push(this.grid[i + 1][j]);
        }
        if (j > 0) {
            neighbors.push(this.grid[i][j - 1]);
        }
        if (j < this.state.cols - 1) {
            neighbors.push(this.grid[i][j + 1]);
        }
        return neighbors;
    }

    click() {
        const delayTime = SelfAvoidingWalk(this.grid);

        setTimeout(
            () => AStarSearch(
                this.grid[this.state.startRow][this.state.startCol],
                this.grid[this.state.finishRow][this.state.finishCol]
            ),
            delayTime
        )
    }

    render() {
        return (
            <>
                <button onClick={this.click}>a</button>
                <div className="grid-container"> {
                    this.grid.map((row, rowId) => {
                        return (
                            <div className="row" key={rowId}> {
                                row.map((cell, colId) => <Cell
                                    key={colId}
                                    isFinish={cell.isFinish}
                                    isStart={cell.isStart}
                                    setWall={(w) => this.grid[rowId][colId].isWall = w}
                                    saveFuncs={(funcs) => this.saveFuncs(rowId, colId, funcs)}
                                />)
                            } </div>
                        )
                    })
                }
                </div>
            </>
        );
    }

}

export default CellGrid;