const animTime = 10;

export default function SelfAvoidingWalk(grid) {
    const rowCount = grid.length;
    const colCount = grid[0].length;

    // Set grid up. Get counter for animation delay
    var counter = setUpGrid(grid, rowCount, colCount);

    // Create a stack for back tracking. Add cell at 1, 1
    const cellStack = [{ row: 1, col: 1 }];

    // Continue creation until the stack is empty
    while (cellStack.length > 0) {
        // Stack contains positions to the grid
        const currPos = cellStack[cellStack.length - 1];
        const currCell = grid[currPos.row][currPos.col];

        // Animate wall removal
        setTimeout(
            currCell.animateRemoveWall,
            animTime * counter++,
        );

        // Update grid
        currCell.isVisited = true;
        currCell.isWall = false;

        // Get the free neighbors to the current cell
        const neighbors = getFreeNeighbors(grid, currPos.row, currPos.col);

        // If no free neighbors, backtrack
        if (neighbors.length === 0) {
            cellStack.pop();
            continue;
        }

        // Pick a random neighbor
        const randNeighborPos = neighbors[getRand(neighbors.length)];

        // Get the position of the cell between the neighbor and current cell
        const wallBetweenPos = {
            row: currPos.row + ((randNeighborPos.row - currPos.row) / 2),
            col: currPos.col + ((randNeighborPos.col - currPos.col) / 2)
        };

        // Get respective cell in the grid
        const wallBetweenCell = grid[wallBetweenPos.row][wallBetweenPos.col];

        // Animate intermediate wall removal
        setTimeout(
            wallBetweenCell.animateRemoveWall,
            animTime * counter++
        )

        // Update grid
        wallBetweenCell.isWall = false;

        // push random neighbor to the stack
        cellStack.push(randNeighborPos);
    }

    // Set cells back to not visited
    clearVisited(grid);

    // Return the time until end of animation
    return counter * animTime;
}

/* Gets a random number from 0 to max (not inclusive) */
function getRand(max) {
    return Math.floor(Math.random() * max);
}

/* Sets all cells as walls
Returns the time until the end of the animation */
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

/* Get the free neighbors of a cell.
Note that a neighbor in this context means a cell that is 1 cell away from the target.
i.e. not immediately after.
This is done due to the way the generation works. */
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


/* Sets all cells in the grid as not visited. */
function clearVisited(grid) {
    const rowCount = grid.length;
    const colCount = grid[0].length;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            grid[i][j].isVisited = false;
        }
    }
}