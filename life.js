// build grid
function make2dArray(cols, rows){
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

// for drawing the grid
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// global variables
let grid;
let resolution = 20;
canvas.width = 500;
canvas.height = 500;

let cols = canvas.width / resolution;
let rows = canvas.height / resolution;

grid = make2dArray(cols, rows);
// fill grid with 0's and 1's
for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
        // if math.random() = less than .5 it becomes a 1, otherwise it becomes a 0
        grid[i][j] = (Math.random() > 0.5) ? 1 : 0;
    }
}

// fill grid with user input 0's and 1's


console.log(grid);

// Click button to start game
function clickToStart(){
    // requestAnimationFrame(updateGrid);
    setTimeout(updateGrid, 50000 / 100);
}

// Reload the game
function reloadGame(){
    location = location;
}

// call this to display the end product
function updateGrid(){
    grid = nextGeneration(grid);
    render(grid);
    // requestAnimationFrame(updateGrid);
    setTimeout(updateGrid, 50000 / 100);
}
   
// draw the grid for user to see
function render(grid){
    for ( let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            let cell = grid[i][j];

            ctx.beginPath();
            ctx.rect(i * resolution, j * resolution, resolution, resolution);
            ctx.fillStyle = cell ? '#333333' : '#ffffff';
            ctx.fill();
            ctx.stroke();
        }
    }
}

// create new grid, update new grid compared to old grid, update old grid
function nextGeneration(grid){
    let newGrid = grid.map(arr => [...arr]);

    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            let cell = grid[i][j];
            let neighbors = 0;

            for (let col = -1; col < 2; col++){
                for (let row = -1; row < 2; row++){
                    
                    if (i === 0 && j === 0) {
                        continue;
                    }

                    // check to make sure we're working within the confines of the grid
                    const x = i + col;
                    const y = j + row;
                    if (x >= 0 && y >= 0 && x < cols && y < cols){
                        let currentNeighbor = grid[i + col][j + row];
                        neighbors += currentNeighbor;
                    }

                }
            }

            // Game Rules
            if (cell === 1 && neighbors < 2){
                newGrid[i][j] = 0;
            }
            else if (cell === 1 && neighbors > 3){
                newGrid[i][j] = 0;
            }
            else if (cell === 0 && neighbors === 3){
                newGrid[i][j] = 1;
            }

        }
    }
    return newGrid;
}