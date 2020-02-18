let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let helperTextVisible = true;
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', init);

// ==============================================================================

function draw(e) {
    if (isDrawing) {
        // drawBg();
        ctx.beginPath();
        ctx.moveTo(lastX, lastY); // start
        ctx.lineTo(e.x, e.y); // end
        ctx.stroke();
        [lastX, lastY] = [e.x, e.y];
        ctx.lineWidth++;
        ctx.strokeStyle = `hsl(${hue++}, 100%, 50%)`;
    }
}

function drawBg() {
    body.style['background-color'] = `hsl(${hue*1.6}, 100%, 50%)`;
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = '#21243d';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;

    setupCanvasDraw();
}

function setupCanvasDraw() {
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', e => {
        if (helperTextVisible) {
            clearInstructions();
        }

        isDrawing = true;
        [lastX, lastY] = [e.x, e.y];
        ctx.lineWidth = 10;
        draw(e)
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
}

function clearInstructions() {
    document.querySelector('h1').remove();
    helperTextVisible = false;
}