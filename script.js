const canvas = document.getElementById('canvas');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const eraserBtn = document.getElementById('eraser');
const saveBtn = document.getElementById('save');
const circleBtn = document.getElementById('circle');
const squareBtn = document.getElementById('square');
const starBtn = document.getElementById('star'); // Added star button
const backBtn = document.getElementById('back'); // Added back button

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let eraser = false;
let color = colorEl.value;
let x;
let y;
let history = [];
let shape = 'line'; // Default shape

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

document.addEventListener('mouseup', (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        if (eraser) {
            ctx.clearRect(x2 - size / 2, y2 - size / 2, size, size);
        } else {
            ctx.strokeStyle = color;
            ctx.lineWidth = size * 2;
            ctx.beginPath();

            switch (shape) {
                case 'line':
                    ctx.moveTo(x, y);
                    ctx.lineTo(x2, y2);
                    break;
                case 'circle':
                    ctx.arc(x2, y2, size, 0, 2 * Math.PI);
                    break;
                case 'square':
                    ctx.rect(x2 - size / 2, y2 - size / 2, size, size);
                    break;
                case 'star': // Added star shape
                    drawStar(x2, y2, size, 5); // 5 points for a star
                    break;
            }

            ctx.stroke();
        }

        x = x2;
        y = y2;

        // Save the drawing to history
        history.push({
            x1: x,
            y1: y,
            x2: x2,
            y2: y2,
            color: color,
            size: size,
            eraser: eraser,
            shape: shape
        });
    }
});

function updateSizeOnScreen() {
    sizeEL.innerText = size;
}

decreaseBtn.addEventListener('click', () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

increaseBtn.addEventListener('click', () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => color = e.target.value);

clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history = []; // Clear the drawing history
});

eraserBtn.addEventListener('click', () => {
    eraser = !eraser; // Toggle eraser state
});

saveBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

circleBtn.addEventListener('click', () => {
    shape = 'circle';
});

squareBtn.addEventListener('click', () => {
    shape = 'square';
});

starBtn.addEventListener('click', () => {
    shape = 'star';
});

backBtn.addEventListener('click', () => {
    if (history.length > 0) {
        history.pop(); // Remove the last drawing from history
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        history.forEach((item) => {
            ctx.strokeStyle = item.color;
            ctx.lineWidth = item.size * 2;
            ctx.beginPath();

            switch (item.shape) {
                case 'line':
                    ctx.moveTo(item.x1, item.y1);
                    ctx.lineTo(item.x2, item.y2);
                    break;
                case 'circle':
                    ctx.arc(item.x2, item.y2, item.size, 0, 2 * Math.PI);
                    break;
                case 'square':
                    ctx.rect(item.x2 - item.size / 2, item.y2 - item.size / 2, item.size, item.size);
                    break;
                case 'star':
                    drawStar(item.x2, item.y2, item.size, 5); // 5 points for a star
                    break;
            }

            ctx.stroke();
        });
    }
});
// Function to draw a star
function drawStar(x, y, size, points) {
    const angle = Math.PI / points;
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    for (let i = 1; i <= points; i++) {
        ctx.lineTo(x + size * Math.cos(i * angle), y + size * Math.sin(i * angle));
    }
    ctx.closePath();
}

// JavaScript to control the loader visibility with increased loading time
window.addEventListener('load', function() {
    setTimeout(function() {
        // Hide the loader and show the content after a delay
        document.getElementById('pre-loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 3000); // Delay of 3 seconds
});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    "#ffb56b",
    "#fdaf69",
    "#f89d63",
    "#f59761",
    "#ef865e",
    "#ec805d",
    "#e36e5c",
    "#df685c",
    "#d5585c",
    "#d1525c",
    "#c5415d",
    "#c03b5d",
    "#b22c5e",
    "#ac265e",
    "#9c155f",
    "#950f5f",
    "#830060",
    "#7c0060",
    "#680060",
    "#60005f",
    "#48005f",
    "#3d005e"
];

circles.forEach(function(circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;

});

function animateCircles() {

    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();