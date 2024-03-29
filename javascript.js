const board = document.querySelector(".board");
const body = document.querySelector("body");
const eraseAll = document.getElementById("eraseAll");
const grid = document.getElementById("grid");
const slider = document.getElementById('slider');
const gridValue = document.getElementById("gridValue");
const eraser = document.getElementById("eraser");
const painterBlack = document.getElementById('black');
const color = document.getElementById("colorChoose");
const buttons = document.querySelectorAll('.buttons');
const saveColor = document.getElementById('saveColor');

let tileSize = 0;
let down = false;
let boardArea = 288.7;
let cont = 0;
let tiles = [];
let backgroundColor = "white";
let paintingColor = "black";
var lastX = 0,
    lastY = 0;
let buttonPress = 'painting';


function pushButtons(e) {
    e.addEventListener('pointerover', function () {
        this.classList.add('mouseOver');
    });

    e.addEventListener('pointerout', function () {
        this.classList.remove('mouseOver');
    });

    e.addEventListener('pointerdown', function () {
        this.classList.add('clicked');
    });

    e.addEventListener('pointerup', function () {
        this.classList.remove('clicked');
    });

    e.addEventListener('pointerleave', function () {
        this.classList.remove('clicked');
    });
}

function paint(ex, ey) {
    if (buttonPress === 'painting') {
        document.elementFromPoint(ex, ey).style.backgroundColor = paintingColor;
    }
    if (buttonPress === 'erasing') {
        document.elementFromPoint(ex, ey).style.removeProperty('background-color');
    }
}

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
        div.setAttribute('oncontextmenu', "return false;");
        tiles.push(div);
        board.appendChild(div);
    }
    paintBlack();
}

function paintBlack() {
    paintingColor = 'black';
    buttonPress = 'painting';
    board.addEventListener('pointerdown', function (e) {
        document.elementFromPoint(e.pageX, e.pageY).style.backgroundColor = paintingColor;
        lastX = e.pageX;
        lastY = e.pageY;
        down = true;
    });
    board.addEventListener('pointerup', function () {
        down = false;

    });

    board.addEventListener('pointermove', function (e) {
        calculateCoordinates(e);
    });
    window.addEventListener('pointerup', function () {
        down = false;
    });
}

function paintColor() {
    paintingColor = color.value;
    saveColor.style.backgroundColor = paintingColor;
    buttonPress = 'painting';
    board.addEventListener('pointerown', function (e) {
        document.elementFromPoint(e.pageX, e.pageY).style.backgroundColor = paintingColor;
        lastX = e.pageX;
        lastY = e.pageY;
        down = true;
    });
    board.addEventListener('pointerup', function () {
        down = false;

    });

    board.addEventListener('pointermove', function (e) {
        calculateCoordinates(e);
    });
    window.addEventListener('pointerup', function () {
        down = false;
    });
}
function eraseColor() {
    buttonPress = 'erasing';
    board.addEventListener('pointerdown', function (e) {
        document.elementFromPoint(e.pageX, e.pageY).style.removeProperty('background-color');
        lastX = e.pageX;
        lastY = e.pageY;
        down = true;
    });
    board.addEventListener('pointerup', function () {
        down = false;

    });
    board.addEventListener('pointermove', function (e) {
        calculateCoordinates(e);
    });
    window.addEventListener('pointerup', function () {
        down = false;
    });
}

function sliderChange() {
    slider.addEventListener('pointerup', function () {
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

function paintBlackButton() {
    painterBlack.addEventListener('pointerdown', paintBlack);
    pushButtons(painterBlack);
}

function paintColorButton() {
    color.addEventListener('input', paintColor);
    pushButtons(color);
}

function eraserButton() {
    eraser.addEventListener('pointerdown', eraseColor);
    pushButtons(eraser);
}

function saveColorButton() {
    saveColor.style.backgroundColor = paintingColor;
    saveColor.addEventListener('pointerdown', paintColor)
    pushButtons(saveColor);
}

function gridToggleButton() {
    grid.addEventListener('pointerdown', function () {
        tiles.forEach(function (e) {
            e.classList.toggle('grid');
        });
    });
    pushButtons(grid);
}

function eraseAllColorButton() {
    eraseAll.addEventListener('pointerdown', function () {
        tiles.forEach(function (e) {
            e.style.removeProperty('background-color');
        })
    });
    pushButtons(eraseAll);
}

function calculateCoordinates(e) {
    if (down) {
        var mouseX = e.pageX;
        var mouseY = e.pageY;

        var x0 = mouseX,
            y0 = mouseY,
            x1 = lastX,
            y1 = lastY;

        var steep = (Math.abs(y1 - y0) > Math.abs(x1 - x0));
        if (steep) {
            var x = x0;
            x0 = y0;
            y0 = x;

            var y = y1;
            y1 = x1;
            x1 = y;
        }
        if (x0 > x1) {
            var x = x0;
            x0 = x1;
            x1 = x;

            var y = y0;
            y0 = y1;
            y1 = y;
        }
        var dx = x1 - x0,
            dy = Math.abs(y1 - y0),
            error = 0,
            de = dy / dx,
            yStep = -1,
            y = y0;
    }
    if (y0 < y1) {
        yStep = 1;
    }
    for (var x = x0; x < x1; x++) {
        if (steep) {
            paint(y, x);
        } else {
            paint(x, y);
        }

        error += de;
        if (error >= 0.5) {
            y += yStep;
            error -= 1.0;
        }
    }
    lastX = mouseX;
    lastY = mouseY;
}

function start() {
    createBoard(17);
    paintBlackButton();
    paintColorButton();
    saveColorButton();
    eraserButton();
    eraseAllColorButton();
    gridToggleButton();
    sliderChange();
}

start();