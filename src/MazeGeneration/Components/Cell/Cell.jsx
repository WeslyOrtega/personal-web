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
            isVisited: false,  // all cells start as not visited
        };

        // bind `this` to functions
        this.setWall = this.setWall.bind(this);
        this.toggleWall = this.toggleWall.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.setVisited = this.setVisited.bind(this);
        this.setPath = this.setPath.bind(this);

        props.saveFuncs({
            setVisited: this.setVisited,
            setPath: this.setPath,
            setWall: this.setWall,
        });
    };

    setWall(val) {
        this.state.setWall(val);
        this.setState({ isWall: val });
    }

    toggleWall() {
        // Do not convert start, finish, and already visited nodes into walls
        if (this.state.isStart || this.state.isFinish || this.state.isVisited) {
            return;
        }

        // Check the current method
        if (Cell.placing) {
            this.setWall(true);
        } else {
            this.setWall(false);
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
        this.setState({ isVisited: true });
    }

    setPath() {
        this.setState({ isPath: true });
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
        } else if (this.state.isPath) {
            status = "path-cell"
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
