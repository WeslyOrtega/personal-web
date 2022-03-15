export default function AStarSearch(startCell, finishCell) {
    const animTime = 20;
    startCell.g = 0;
    var cellQueue = [startCell];

    var i = 0;
    var currCell;
    while (cellQueue.length > 0) {
        currCell = cellQueue.shift();

        if (currCell.isFinish) {
            break;
        }

        if (currCell.isWall) {
            continue;
        }

        setTimeout(currCell.animateVisited, animTime * i);
        currCell.setVisited();

        let neighbors = currCell.getNeighbors();
        let freeNeighbors = neighbors.filter((c) => !c.isFree);
        for (let i = 0; i < freeNeighbors.length; i++) {
            var neighbor = freeNeighbors[i];
            let existsing = findMatch(neighbor, cellQueue);

            if (existsing !== undefined) {
                neighbor = existsing;
            }

            if (neighbor.isVisited) {
                continue;
            }

            if (neighbor.f === undefined) {
                neighbor.g = currCell.g + 1;
                neighbor.h = neighbor.getDistanceToExit();
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.prevCell = currCell;
                cellQueue.push(neighbor);
            } else {
                let newG = currCell.g + 1;
                if (newG > neighbor.g) {
                    neighbor.g = newG;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.prevCell = currCell;
                }
            }
        }

        cellQueue.sort((a, b) => a.f - b.f);
        i += 1;
    }

    if (!currCell.isFinish) {
        return;
    }

    animatePath(currCell, animTime, i);
}

function findMatch(cell, q) {
    return q.find((c) => cell.id === c.id);
}

function animatePath(currCell, animTime, i) {
    while (currCell !== undefined) {
        setTimeout(currCell.animatePath, animTime * i);
        i += 1;
        currCell = currCell.prevCell;
    }
}
