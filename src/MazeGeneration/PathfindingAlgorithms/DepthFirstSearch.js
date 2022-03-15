export default function DepthFirstSearch(startCell, finishCell) {
    const animTime = 20;
    var count = 0;

    function helper(cell) {
        if (cell.isVisited) {
            return false;
        }

        if (cell.isFinish) {
            //console.log(cell);
            animatePath(cell, count, animTime);
            return true;
        }

        cell.setVisited();
        setTimeout(cell.animateVisited, animTime * count);
        count += 1;

        let children = cell.getNeighbors();
        let freeChildren = children.filter((c) => !c.isVisited);
        for (let i = 0; i < freeChildren.length; i++) {
            let child = freeChildren[i];
            child.prevCell = cell;
            if (helper(child)) {
                return true;
            }
        }

        return false;
    }

    helper(startCell);
}

function animatePath(cell, count, animTime) {
    while (cell !== undefined) {
        setTimeout(cell.animatePath, animTime * count);
        cell = cell.prevCell;
    }
}
