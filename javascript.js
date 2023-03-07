const board = document.querySelector(".board");
let tileSize = 0;
const eraser = document.getElementById("eraser");
let tiles = [];
let down = false;
let boardArea= 256;
function createBoard(width, height) {
    area = width * height;
    tileSize = Math.sqrt((boardArea-1)/ area);
    for (let i = 1; i <= area; i++) {
        const div = document.createElement("div");
        tiles.push(div);
        //div.textContent=`${i}`;
        board.appendChild(div)
            .setAttribute(
                'style',
                ` 
            width: ${tileSize}cm; 
            height:${tileSize}cm;
            outline: 2px solid black;       
            `
            );
    }
}
function paintBlack() {
    tiles.forEach(function (e) {
        e.addEventListener('mousedown', function () {
            this.classList.toggle('black');
            down = true;
        });
        e.addEventListener('mouseup', function () {
            down = false;
        })
        e.addEventListener('mouseover', function () {
            if (down) this.classList.add('black');
            else { return; }
        });
    });
    window.addEventListener('mouseup', function () {
        down = false;
    });
}
function erase() {
    eraser.addEventListener('click', function () {
        tiles.forEach(function (e) {
            e.classList.remove("black");
            down = false;
        })
    })
}
function start() {
    createBoard(30, 30);
    paintBlack();
    erase();
    console.log(tiles);
}
start();