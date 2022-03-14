import { Component } from "react";
import "./CellGrid.scss";

import Cell from "../Cell/Cell";
import DepthFirstSearch from "../../PathfindingAlgorithms/DepthFirstSearch";

class CellGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
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
    };

    componentDidMount() {
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
                        setVisited: () => this.state.grid[i][j].isVisited = true,
                        getNeighbors: () => this.getCellNeighbors(i, j),
                    }
                );
            }
            grid.push(currRow);
        }
        this.setState({ grid });
    }

    setFuncs(row, col, funcs) {
        let cell = this.state.grid[row][col];
        const { setVisited } = funcs;
        this.state.grid[row][col] = {
            ...cell,
            animateVisited: setVisited,
        };
    }

    getCellNeighbors(i, j) {
        let neighbors = [];
        if (i > 0) {
            neighbors.push(this.state.grid[i - 1][j]);
        }
        if (i < this.state.rows - 1) {
            neighbors.push(this.state.grid[i + 1][j]);
        }
        if (j > 0) {
            neighbors.push(this.state.grid[i][j - 1]);
        }
        if (j < this.state.cols - 1) {
            neighbors.push(this.state.grid[i][j + 1]);
        }
        return neighbors;
    }

    click() {
        DepthFirstSearch(
            this.state.grid[this.state.startRow][this.state.startCol],
            this.state.grid[this.state.finishRow][this.state.finishCol]
        );
    }

    render() {
        const { grid } = this.state;

        return (
            <>
                <button onClick={this.click}>a</button>
                <div className="grid-container"> {
                    grid.map((row, rowId) => {
                        return (
                            <div className="row" key={rowId}> {
                                row.map((cell, colId) => <Cell
                                    key={colId}
                                    isFinish={cell.isFinish}
                                    isStart={cell.isStart}
                                    setWall={(w) => this.state.grid[rowId][colId].isWall = w}
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