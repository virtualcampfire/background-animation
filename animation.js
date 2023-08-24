const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];

for (let i = 0; i < 500; i++) {
    const r = Math.floor(Math.random() * 56) + 200;
    const g = Math.floor(Math.random() * 56) + 200;
    const b = r;
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        color: `rgb(${r}, ${g}, ${b})`,
        lines: []
    });
}

let mouseDot = null;

canvas.addEventListener('mousemove', (event) => {
    const r = Math.floor(Math.random() * 56) + 200;
    const g = r;
    const b = r;
    if (mouseDot) {
        mouseDot.x = event.clientX;
        mouseDot.y = event.clientY;
    } else {
        mouseDot = {
            x: event.clientX,
            y: event.clientY,
            vx: 0,
            vy: 0,
            color: `rgb(${r}, ${g}, ${b})`,
            lines: []
        };
    }
});

function drawRandomDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) {
            dot.vx = -dot.vx;
        }
        if (dot.y < 0 || dot.y > canvas.height) {
            dot.vy = -dot.vy;
        }
        ctx.fillStyle = dot.color;
        ctx.fillRect(dot.x, dot.y, 2, 2);
        for (let j = i + 1; j < dots.length; j++) {
            const otherDot = dots[j];
            const dx = otherDot.x - dot.x;
            const dy = otherDot.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                let lineColor = null;
                for (let k = 0; k < dot.lines.length; k++) {
                    const line = dot.lines[k];
                    if (line.dot === otherDot) {
                        lineColor = line.color;
                        break;
                    }
                }
                if (!lineColor) {
                    const r = Math.floor(Math.random() * 56) + 200;
                    const g = r;
                    const b = r;
                    lineColor = `rgb(${r}, ${g}, ${b})`;
                    dot.lines.push({
                        dot: otherDot,
                        color: lineColor
                    });
                }
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(otherDot.x, otherDot.y);
                ctx.strokeStyle = lineColor;
                ctx.stroke();
            }
        }
    }
    if (mouseDot) {
        ctx.fillStyle = mouseDot.color;
        ctx.fillRect(mouseDot.x, mouseDot.y, 2, 2);
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            const dx = mouseDot.x - dot.x;
            const dy = mouseDot.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                let lineColor = null;
                for (let k = 0; k < mouseDot.lines.length; k++) {
                    const line = mouseDot.lines[k];
                    if (line.dot === dot) {
                        lineColor = line.color;
                        break;
                    }
                }
                if (!lineColor) {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    lineColor = `rgb(${r}, ${g}, ${b})`;
                    mouseDot.lines.push({
                        dot: dot,
                        color: lineColor
                    });
                }
                ctx.beginPath();
                ctx.moveTo(mouseDot.x, mouseDot.y);
                ctx.lineTo(dot.x, dot.y);
                ctx.strokeStyle = lineColor;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawRandomDots);
}

drawRandomDots();