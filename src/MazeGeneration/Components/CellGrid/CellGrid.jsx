import { Component } from "react";
import "./CellGrid.scss";

import Cell from "../Cell/Cell";
import BreadthFirstSearch from "../../PathfindingAlgorithms/BreadthFirstSearch";

class CellGrid extends Component {

    constructor(props) {
        super(props);
        this.grid = [];
        this.state = {
            rows: 21,
            cols: 51,
            startRow: 10,
            startCol: 10,
            finishRow: 10,
            finishCol: 41,
        };
        this.setFuncs = this.setFuncs.bind(this);
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
                        isStart: i === this.state.startRow && j === this.state.startCol,
                        isFinish: i === this.state.finishRow && j === this.state.finishCol,
                        isVisited: false,
                        isWall: false,
                        setVisited: () => this.grid[i][j].isVisited = true,
                        getNeighbors: () => this.getCellNeighbors(i, j),
                    }
                );
            }
            grid.push(currRow);
        }
        this.grid = grid;
    }

    setFuncs(row, col, funcs) {
        let cell = this.grid[row][col];
        const { setVisited, setPath } = funcs;
        this.grid[row][col] = {
            ...cell,
            animateVisited: setVisited,
            animatePath: setPath,
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
        BreadthFirstSearch(
            this.grid[this.state.startRow][this.state.startCol],
            this.grid[this.state.finishRow][this.state.finishCol]
        );
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
                                    setFuncs={(funcs) => this.setFuncs(rowId, colId, funcs)}
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