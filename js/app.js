const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const MOVEMENT_SPEED = 5;
const planeImage = new Image();
planeImage.src = "https://c.ekstatic.net/ecl/aircraft-exterior/boeing-777/view-from-top-on-emirates-boeing-777-w1098x1098.png";

const BUTTONS = {
  TOP: 12,
  BOTTOM: 13,
  LEFT: 14,
  RIGHT: 15,
};

const KEYS = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let plane = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 100,
  height: 100,
  rotation: 0,
  dx: 0,
  dy: 0,
};

window.addEventListener("keydown", (e) => {
  if (KEYS.hasOwnProperty(e.key)) KEYS[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  if (KEYS.hasOwnProperty(e.key)) KEYS[e.key] = false;
});

window.addEventListener("gamepadconnected", () => {
  document.getElementById('status-label').innerHTML = 'Connected';
  document.getElementById('status-indicator').style.background = 'green';
  requestAnimationFrame(update);
});

window.addEventListener("gamepaddisconnected", () => {
  document.getElementById('status-label').innerHTML = 'Not Connected';
  document.getElementById('status-indicator').style.background = 'red';
});

function update() {
  handleInput();
  draw();
  requestAnimationFrame(update);
}

function handleInput() {
  plane.dx = 0;
  plane.dy = 0;

  if (KEYS.ArrowUp) {
    plane.dy = -MOVEMENT_SPEED;
    plane.rotation = 0;
  }
  if (KEYS.ArrowDown) {
    plane.dy = MOVEMENT_SPEED;
    plane.rotation = 180;
  }
  if (KEYS.ArrowLeft) {
    plane.dx = -MOVEMENT_SPEED;
    plane.rotation = -90;
  }
  if (KEYS.ArrowRight) {
    plane.dx = MOVEMENT_SPEED;
    plane.rotation = 90;
  }

  const gamepads = navigator.getGamepads();
  if (gamepads[0]) {
    const gamepad = gamepads[0];
    if (gamepad.buttons[BUTTONS.TOP]?.pressed) {
      plane.dy = -MOVEMENT_SPEED;
      plane.rotation = 0;
    }
    if (gamepad.buttons[BUTTONS.BOTTOM]?.pressed) {
      plane.dy = MOVEMENT_SPEED;
      plane.rotation = 180;
    }
    if (gamepad.buttons[BUTTONS.LEFT]?.pressed) {
      plane.dx = -MOVEMENT_SPEED;
      plane.rotation = -90;
    }
    if (gamepad.buttons[BUTTONS.RIGHT]?.pressed) {
      plane.dx = MOVEMENT_SPEED;
      plane.rotation = 90;
    }
  }

  plane.x = Math.max(0, Math.min(canvas.width - plane.width, plane.x + plane.dx));
  plane.y = Math.max(0, Math.min(canvas.height - plane.height, plane.y + plane.dy));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(plane.x + plane.width / 2, plane.y + plane.height / 2);
  ctx.rotate(plane.rotation * Math.PI / 180);
  ctx.drawImage(planeImage, -plane.width / 2, -plane.height / 2, plane.width, plane.height);
  ctx.restore();
}

planeImage.onload = () => {
  update();
};
