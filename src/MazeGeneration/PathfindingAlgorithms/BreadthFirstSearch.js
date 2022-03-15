export default function BreadthFirstSearch(startCell, finishCell) {
    const animTime = 20;
    var cellQueue = [startCell];

    var i = 0;
    var currCell;
    while (cellQueue.length > 0) {
        currCell = cellQueue.shift();

        if (currCell.isVisited || currCell.isWall) {
            continue;
        }

        if (currCell.isFinish) {
            break;
        }

        setTimeout(currCell.animateVisited, animTime * i);
        currCell.setVisited();

        let cellNeighbors = currCell.getNeighbors();
        let freeNeighbors = cellNeighbors.filter((n) => !n.isVisited);
        for (let i = 0; i < freeNeighbors.length; i++) {
            freeNeighbors[i].prevCell = currCell;
        }

        cellQueue = cellQueue.concat(freeNeighbors);
        i += 1;
    }

    if (!currCell.isFinish) {
        return;
    }

    while (currCell !== undefined) {
        setTimeout(currCell.animatePath, animTime * i);
        currCell = currCell.prevCell;
        i += 1;
    }
}
