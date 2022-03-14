export default function DepthFirstSearch(startCell, finishCell) {
    const animTime = 20;
    var cellQueue = startCell.getNeighbors();

    var i = 0;
    while (cellQueue.length > 0) {
        let cell = cellQueue.shift();

        if (cell.isVisited || cell.isWall) {
            continue;
        }

        setTimeout(cell.animateVisited, animTime * i);
        cell.setVisited();
        cellQueue = cellQueue.concat(cell.getNeighbors());
        i += 1;
    }
}
