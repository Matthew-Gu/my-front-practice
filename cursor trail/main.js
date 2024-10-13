const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let { innerWidth, innerHeight } = window;
const mPos = { x: innerWidth / 2, y: innerHeight / 2 };
const lines = [];

let length = 60,
  startColor = [53, 246, 158],
  endColor = [0, 158, 252],
  size = 5,
  speed = 0.45;

let animationFrame;
let initialized = false;

function initCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);

  window.addEventListener('resize', handleResize);
  document.body.addEventListener('mousemove', handleMouseMove);

  drawLine();
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function handleMouseMove({ clientX, clientY }) {
  mPos.x = clientX;
  mPos.y = clientY;

  if (!initialized) {
    initialized = true;
    for (let i = 0; i < length; i++) {
      let pos = { x: mPos.x, y: mPos.y };
      lines.push(pos);
    }
  }
}

function lerpColor(a, b, amount) {
  amount = Math.min(1, Math.max(0, amount));
  const result = [];
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(a[i] + amount * (b[i] - a[i]));
  }
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

function drawLine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let points = [];
  let x = mPos.x;
  let y = mPos.y;

  lines.forEach((line, index, arr) => {
    let nextLine = arr[index + 1] || arr[0];
    line.x = x;
    line.y = y;
    const colorIndex = index / lines.length;
    const color = lerpColor(startColor, endColor, colorIndex);
    points.push({ x, y, color });

    x += (nextLine.x - line.x) * speed;
    y += (nextLine.y - line.y) * speed;
  });

  ctx.lineCap = 'round';
  ctx.lineWidth = size;

  points.forEach((point, index) => {
    if (index > 0) {
      ctx.strokeStyle = point.color;
      ctx.beginPath();
      ctx.moveTo(points[index - 1].x, points[index - 1].y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  });

  animationFrame = requestAnimationFrame(drawLine);
}

initCanvas();
