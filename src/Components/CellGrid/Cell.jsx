import { Component } from "react";

import "./Cell.scss"

export default class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isStart: props.isStart,
            isFinish: props.isFinish,
            isWall: false,
        };
        this.toggleWall = this.toggleWall.bind(this)
    };

    toggleWall() {
        this.setState({ isWall: !this.state.isWall });
        console.log(this.state.isWall);
    }

    render() {
        var status = "";
        if (this.state.isStart) {
            status = "start-cell";
        }
        else if (this.state.isFinish) {
            status = "finish-cell";
        } else if (this.state.isWall) {
            status = "wall"
        }
        return <div onClick={this.toggleWall} className={"cell " + status}></div>
    }
}
