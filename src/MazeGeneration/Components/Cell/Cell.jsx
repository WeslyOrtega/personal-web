import { Component } from "react";

import "./Cell.scss"

export default class Cell extends Component {

    // whether the user started clicking
    static mouseDown = false;

    // the method for toggling walls
    // true -> turn cells into walls
    // false -> turn cells into space
    static placing = true;

    constructor(props) {
        super(props);
        this.state = {
            isStart: props.isStart,
            isFinish: props.isFinish,
            isWall: false,  // all cells start as spaces
        };

        // bind `this` to functions
        this.toggleWall = this.toggleWall.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
    };

    toggleWall() {
        // Do not convert start and finish nodes into walls
        if (this.isStart || this.isFinish) {
            return;
        }

        // Check the current method
        if (Cell.placing) {
            this.setState({ isWall: true });
        } else {
            this.setState({ isWall: false });
        }
    }

    onMouseDown() {
        // set mouse down
        Cell.mouseDown = true;

        // pick the current method depending on the
        // the state of the current cell
        if (this.state.isWall) {
            Cell.placing = false;
        } else {
            Cell.placing = true;
        }

        // change selected cell
        this.toggleWall();
    }

    onMouseEnter() {
        // only change cells if click is pressed
        if (Cell.mouseDown) {
            this.toggleWall();
        }
    }

    onMouseUp() {
        // release click
        Cell.mouseDown = false;
    }

    render() {
        // for CSS styling
        var status = "";
        if (this.state.isStart) {
            status = "start-cell";
        } else if (this.state.isFinish) {
            status = "finish-cell";
        } else if (this.state.isWall) {
            status = "wall";
        }

        return <div
            onMouseDown={this.onMouseDown}
            onMouseEnter={this.onMouseEnter}
            onMouseUp={this.onMouseUp}
            className={"cell " + status}>
        </div>
    }
}
