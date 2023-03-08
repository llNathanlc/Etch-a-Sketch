const board = document.querySelector(".board");
const body = document.querySelector("body");
let tileSize = 0;
const eraseAll = document.getElementById("eraseAll");
const grid = document.getElementById("grid");
const slider = document.getElementById('slider');
const gridValue = document.getElementById("gridValue");
const eraser = document.getElementById("eraser");
const painterBlack = document.getElementById('black');
const color = document.getElementById("colorChoose");

let tiles = [];
let down = false;
let boardArea = 255;
let cont = 0;
let replaceTiles = [];
let backgroundColor = "white";
let paintingColor = "black";

function createBoard(size) {
    area = size * size;
    tileSize = Math.sqrt(boardArea / area);
    for (let i = 1; i <= area; i++) {
        const div = document.createElement("div");
        div.setAttribute(
            'class',
            'tile; grid'
        )
        div.setAttribute(
            'style',
            ` 
        width: ${tileSize}cm; 
        height:${tileSize}cm;      
        `
        );
        div.setAttribute('oncontextmenu', "return false;")
        tiles.push(div);
        board.appendChild(div)
    }
    paintBlack();
}

board.addEventListener('mouseover', printMousePos);
function printMousePos(e) {
    xPos.setAttribute('pos', `${e.pageX}`);
    yPos.setAttribute('pos', `${e.pageY}`);
}
function paintColor() {
    paintingColor = color.value;
     
    tiles.forEach(function (e) {

        e.addEventListener('mousedown', function () {

            this.style.backgroundColor = paintingColor;
            down = true;

        });
        e.addEventListener('mouseup', function () {
            down = false;

        });
        e.addEventListener('mouseout', function () {

            if (down &&
                ((xPos.getAttribute('pos') >= this.getBoundingClientRect().left) ||
                    (xPos.getAttribute('pos') <= this.getBoundingClientRect().right) ||
                    (yPos.getAttribute('pos') >= this.getBoundingClientRect().top) ||
                    (yPos.getAttribute('pos') <= this.getBoundingClientRect().bottom))) {

                this.style.backgroundColor = paintingColor;
            }

            else { return; }
        });
        e.addEventListener('mouseover', function () {
            if (down &&
                ((xPos.getAttribute('pos') >= this.getBoundingClientRect().left) ||
                    (xPos.getAttribute('pos') <= this.getBoundingClientRect().right) ||
                    (yPos.getAttribute('pos') >= this.getBoundingClientRect().top) ||
                    (yPos.getAttribute('pos') <= this.getBoundingClientRect().bottom))) {

                this.style.backgroundColor = paintingColor;
            }

            else { return; }
        });
        e.addEventListener('contextmenu', function () {
            down = false;
            this.style.removeProperty('background-color');


        });
    });
    window.addEventListener('mouseup', function () {
        down = false;
    });
}
function paintBlack() {

    tiles.forEach(function (e) {

        e.addEventListener('mousedown', function () {
            this.style.backgroundColor = 'black';
            down = true;

        });
        e.addEventListener('mouseup', function () {
            down = false;

        });
        e.addEventListener('mouseout', function () {

            if (down &&
                ((xPos.getAttribute('pos') >= this.getBoundingClientRect().left) ||
                    (xPos.getAttribute('pos') <= this.getBoundingClientRect().right) ||
                    (yPos.getAttribute('pos') >= this.getBoundingClientRect().top) ||
                    (yPos.getAttribute('pos') <= this.getBoundingClientRect().bottom))) {
                this.style.backgroundColor = 'black';
            }

            else { return; }
        });
        e.addEventListener('mouseover', function () {
            if (down &&
                ((xPos.getAttribute('pos') >= this.getBoundingClientRect().left) ||
                    (xPos.getAttribute('pos') <= this.getBoundingClientRect().right) ||
                    (yPos.getAttribute('pos') >= this.getBoundingClientRect().top) ||
                    (yPos.getAttribute('pos') <= this.getBoundingClientRect().bottom))) {
                this.style.backgroundColor = 'black';
            }

            else { return; }
        });
        e.addEventListener('contextmenu', function () {
            down = false;
            this.style.removeProperty('background-color');

        });
    });
    window.addEventListener('mouseup', function () {
        down = false;
    });
}
function paintBlackButton() {
    painterBlack.addEventListener('click', paintBlack);
}
function paintColorButton() {
    color.addEventListener('input', paintColor);
}
function eraserButton() {
    eraser.addEventListener('click', function () {
        tiles.forEach(function (e) {
            e.addEventListener('mousedown', function () {
                this.style.removeProperty('background-color');
                down = true;

            });
            e.addEventListener('mouseup', function () {
                down = false;

            });
            e.addEventListener('mouseout', function () {

                if (down &&
                    ((xPos.getAttribute('pos') >= this.getBoundingClientRect().left) ||
                        (xPos.getAttribute('pos') <= this.getBoundingClientRect().right) ||
                        (yPos.getAttribute('pos') >= this.getBoundingClientRect().top) ||
                        (yPos.getAttribute('pos') <= this.getBoundingClientRect().bottom))) {
                    this.style.removeProperty('background-color');
                }

                else { return; }
            });
            e.addEventListener('mouseover', function () {
                if (down &&
                    ((xPos.getAttribute('pos') >= this.getBoundingClientRect().left) ||
                        (xPos.getAttribute('pos') <= this.getBoundingClientRect().right) ||
                        (yPos.getAttribute('pos') >= this.getBoundingClientRect().top) ||
                        (yPos.getAttribute('pos') <= this.getBoundingClientRect().bottom))) {
                    this.style.removeProperty('background-color');
                }

                else { return; }
            });
        });
        window.addEventListener('mouseup', function () {
            down = false;
        });
    });
}
function gridToggle() {
    grid.addEventListener('click', function () {
        tiles.forEach(function (e) {
            e.classList.toggle('grid');
            down = false;
        })
    })
}
function eraseAllTiles() {
    eraseAll.addEventListener('click', function () {
        tiles.forEach(function (e) {
            e.style.removeProperty('background-color');
            down = false;
        })

    })
}
function sliderChange() {
    slider.addEventListener('mouseup', function () {
        removeTiles();
        let sliderInt = slider.value;
        createBoard(sliderInt);
    });

    slider.addEventListener('keydown', function (e) {
        if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
            removeTiles();
            let sliderInt = slider.value;
            createBoard(sliderInt);
        }
        else { return; }
    });


    slider.addEventListener('input', function () {
        gridValue.textContent = slider.value + " x " + slider.value;
    });

}
function removeTiles() {
    while (board.childElementCount != 0) {
        board.removeChild(board.lastElementChild);
        tiles.pop();
    }
}

function start() {
    createBoard(16);
    paintBlackButton();
    paintColorButton();
    eraserButton();
    eraseAllTiles();
    gridToggle();
    sliderChange();
}
start();


/*
function getCoordinates(){
    tiles.forEach(function(e){
        e.addEventListener('mousedown', function(){
            x0.setAttribute('pos',`${this.getBoundingClientRect().left}`);
            y0.setAttribute('pos',`${this.getBoundingClientRect().top}`);
            width.setAttribute('width',`${this.getBoundingClientRect().width}`)
        });
        e.addEventListener('mouseover', function(){
            x1.setAttribute('pos',`${this.getBoundingClientRect().left}`);
            y1.setAttribute('pos',`${this.getBoundingClientRect().top}`);
            plotLine(x0.getAttribute('pos'),y0.getAttribute('pos'),x1.getAttribute('pos'),y1.getAttribute('pos'),);
        });
    });
}
function paint(x,y){
    tiles.forEach(function(e){
        e.addEventListener('mousedown',function(){
            if(document.elementFromPoint(x,y) == html||document.elementFromPoint(x,y) == body || document.elementFromPoint(x,y) == eraser){return;}
            else{
            document.elementFromPoint(x,y).classList.add('black');}
        })
    })
}
function plotLineLow(x0, y0, x1, y1) {
    dx = x1 - x0;
    dy = y1 - y0;
    let yi = 1;
    if (dy < 0) {
        yi = -1;
        dy = -dy;
    }
    let D = (2 * dy) - dx;
    let y = y0;

    for (let x = 0; x0 <= x1; x0+=width.getAttribute('width')) {
        paint(x, y);
        if (D > 0) {
            y = y + yi;
            D = D + (2 * (dy - dx));
        }
        else { D = D + 2 * dy; }
    }
}
function plotLineHigh(x0, y0, x1, y1) {
    dx = x1 - x0;
    dy = y1 - y0;
    let xi = 1;
    if (dx < 0) {
        xi = -1;
        dx = -dx;
    }
    let D = (2 * dx) - dy;
    let x = x0;

    for (let y = 0; y0 <= y1; y0+=width.getAttribute('width')) {
        paint(x, y);
        if (D > 0) {
            x = x + xi;
            D = D + (2 * (dx - dy));
        }
        else { D = D + 2 * dx; }
    }
}
function plotLine(x0, y0, x1, y1) {
    if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
        if (x0 > x1) { plotLineLow(x1, y1, x0, y0); }
        else { plotLineLow(x0, y0, x1, y1); }
    }
    else {
        if (y0 > y1) { plotLineHigh(x1, y1, x0, y0); }
        else { plotLineHigh(x0, y0, x1, y1); }
    }
}*/
