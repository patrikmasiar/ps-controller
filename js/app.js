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

function update() {
  const availableGamepadIndex = navigator.getGamepads().findIndex(gamepad => gamepad !== null)
  const gamepad = navigator.getGamepads()[availableGamepadIndex]
  const pressedButtonIndex = gamepad.buttons.findIndex(button => button.value === 1)

  moveElement(pressedButtonIndex)

  requestAnimationFrame(update);
}

function moveElement(index) {
  var movingElement = document.getElementById('car');
  var currentPosition = movingElement.getBoundingClientRect();

  switch (index) {
    case BUTTONS.TOP:
      movingElement.style.top = currentPosition.top - 50 + 'px';
      break;
    case BUTTONS.BOTTOM:
      movingElement.style.top = currentPosition.top + 10 + 'px';
      break;
    case BUTTONS.LEFT:
      movingElement.style.left = currentPosition.left - 50 + 'px';
      break;
    case BUTTONS.RIGHT:
      movingElement.style.left = currentPosition.left + 10 + 'px';
      break;
  }
}
