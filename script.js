const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;

let isDrawing = false,
    lastX = 0,
    lastY = 0,
    hue = 0,
    direction = true;

const draw = (e) => {
    if (!isDrawing) return;
    console.log(e);
    ctx.strokeStyle =  `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); //start
    ctx.lineTo(e.offsetX, e.offsetY); //finish
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else if (!direction) {
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => { 
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);