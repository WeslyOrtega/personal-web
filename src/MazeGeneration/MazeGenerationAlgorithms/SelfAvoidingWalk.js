const animTime = 10;

export default function SelfAvoidingWalk(grid) {
    const rowCount = grid.length;
    const colCount = grid[0].length;

    var counter = setUpGrid(grid, rowCount, colCount);

    const cellStack = [{ row: 1, col: 1 }];

    while (cellStack.length > 0) {
        const currPos = cellStack[cellStack.length - 1];
        const currCell = grid[currPos.row][currPos.col];

        setTimeout(
            currCell.animateRemoveWall,
            animTime * counter++,
        );

        currCell.isVisited = true;
        currCell.isWall = false;

        const neighbors = getFreeNeighbors(grid, currPos.row, currPos.col);

        if (neighbors.length === 0) {
            cellStack.pop();
            continue;
        }

        const randNeighborPos = neighbors[getRand(neighbors.length)];

        const wallBetweenPos = {
            row: currPos.row + ((randNeighborPos.row - currPos.row) / 2),
            col: currPos.col + ((randNeighborPos.col - currPos.col) / 2)
        };
        const wallBetweenCell = grid[wallBetweenPos.row][wallBetweenPos.col];
        setTimeout(
            wallBetweenCell.animateRemoveWall,
            animTime * counter++
        )
        wallBetweenCell.isWall = false;
        cellStack.push(randNeighborPos);
    }

    clearVisited(grid);

    return (counter) * animTime;
}

function getRand(max) {
    return Math.floor(Math.random() * max);
}

function setUpGrid(grid, rows, cols) {
    var counter = 0;
    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {
            if (grid[i][j].isStart || grid[i][j].isFinish) {
                continue;
            }

            setTimeout(
                () => {
                    grid[i][j].animateSetWall();
                    grid[i][j].isWall = true;
                },
                animTime * counter
            );
        }
        counter++;
    }

    return counter;
}

function getFreeNeighbors(grid, row, col) {
    const neighbors = []
    const rowCount = grid.length;
    const colCount = grid[0].length;
    // Check up
    if (row > 1 && !grid[row - 2][col].isVisited) {
        neighbors.push({ row: row - 2, col: col });
    }

    // Check down
    if (row < rowCount - 2 && !grid[row + 2][col].isVisited) {
        neighbors.push({ row: row + 2, col: col });
    }

    // Check right
    if (col < colCount - 2 && !grid[row][col + 2].isVisited) {
        neighbors.push({ row: row, col: col + 2 });
    }

    // Check left
    if (col > 1 && !grid[row][col - 2].isVisited) {
        neighbors.push({ row: row, col: col - 2 });
    }
    return neighbors;
}

function clearVisited(grid) {
    const rowCount = grid.length;
    const colCount = grid[0].length;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            grid[i][j].isVisited = false;
        }
    }
}