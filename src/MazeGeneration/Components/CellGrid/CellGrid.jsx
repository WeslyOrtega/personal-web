import { Component } from "react";
import "./CellGrid.scss"

import Cell from "../Cell/Cell"

class CellGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            rows: 20,
            cols: 50,
        };
    };

    componentDidMount() {
        const grid = []
        for (var i = 0; i < this.state.rows; i++) {
            const currRow = [];
            for (var j = 0; j < this.state.cols; j++) {
                currRow.push(
                    {
                        isStart: i === 1 & j === 0,
                        isFinish: i === 1 && j === this.state.cols - 1,
                    }
                );
            }
            grid.push(currRow);
        }
        this.setState({ grid });
    }

    render() {
        const { grid } = this.state;

        return (
            <div className="grid-container"> {
                grid.map((row, rowId) => {
                    return (
                        <div className="row" key={rowId}> {
                            row.map((cell, colId) => <Cell key={colId} isFinish={cell.isFinish} isStart={cell.isStart} />)
                        } </div>
                    )
                })
            }
            </div>
        );
    }

}

export default CellGrid;