window.addEventListener("gamepadconnected", (e) => {
  document.getElementById('status-label').innerHTML = 'Connected';
  document.getElementById('status-indicator').style.background = 'green';

  requestAnimationFrame(update);
});

window.addEventListener("gamepaddisconnected", (e) => {
  document.getElementById('status-label').innerHTML = 'Not Connected';
  document.getElementById('status-indicator').style.background = 'red';

  cancelAnimationFrame(update);
});


const BUTTONS = {
  TOP: 12,
  BOTTOM: 13,
  LEFT: 14,
  RIGHT: 15,
}


const KEYS = {
  ArrowUp: BUTTONS.TOP,
  ArrowDown: BUTTONS.BOTTOM,
  ArrowLeft: BUTTONS.LEFT,
  ArrowRight: BUTTONS.RIGHT
};

window.addEventListener("keydown", (e) => {
  if (KEYS[e.key] !== undefined) {
    moveElement(KEYS[e.key]);
  }
});

const MOVEMENT_SPEED = 10;

function update() {
  const availableGamepadIndex = navigator.getGamepads().findIndex(gamepad => gamepad !== null)
  const gamepad = navigator.getGamepads()[availableGamepadIndex]
  const pressedButtonIndex = gamepad.buttons.findIndex(button => button.value === 1)

  moveElement(pressedButtonIndex)

  requestAnimationFrame(update);
}


function moveElement(index) {
  let left = plane.offsetLeft;
  let top = plane.offsetTop;
  let rotation = 0;

  switch (index) {
    case BUTTONS.TOP:
      top -= MOVEMENT_SPEED;
      rotation = 0;
      break;
    case BUTTONS.BOTTOM:
      top += MOVEMENT_SPEED;
      rotation = 180;
      break;
    case BUTTONS.LEFT:
      left -= MOVEMENT_SPEED;
      rotation = -90;
      break;
    case BUTTONS.RIGHT:
      left += MOVEMENT_SPEED;
      rotation = 90;
      break;
  }

  plane.style.left = left + 'px';
  plane.style.top = top + 'px';

  plane.style.transform = `rotate(${rotation}deg)`;
}