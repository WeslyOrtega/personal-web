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
            setWall: props.setWall,
            isWall: false,  // all cells start as spaces
            isVisited: false,
        };

        // bind `this` to functions
        this.toggleWall = this.toggleWall.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.setVisited = this.setVisited.bind(this);

        props.setFuncs({ setVisited: this.setVisited });
    };

    toggleWall() {
        // Do not convert start, finish, and already visited nodes into walls
        if (this.state.isStart || this.state.isFinish || this.state.isVisited) {
            return;
        }

        // Check the current method
        if (Cell.placing) {
            this.state.setWall(true);
            this.setState({ isWall: true });
        } else {
            this.state.setWall(false);
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

    setVisited() {
        this.setState({ isVisited: true })
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
        } else if (this.state.isVisited) {
            status = "visited-cell"
        }

        return <div
            onMouseDown={this.onMouseDown}
            onMouseEnter={this.onMouseEnter}
            onMouseUp={this.onMouseUp}
            className={"cell " + status}>
        </div>
    }
}
