import { Player, Scene } from './game';

export const canvas = document.querySelector('canvas')!;
export const c = canvas.getContext('2d')!;

canvas.width = 1420;
canvas.height = 780;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Scene({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './images/background.png',
});

const blueFlame = new Scene({
  position: {
    x: 970,
    y: 380,
  },
  imageSrc: './images/burning_loop.png',
  scale: 5,
  maxFrame: 8,
});

const player = new Player({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 110,
    y: 133,
  },
  imageSrc: './images/wizard/Idle.png',
  maxFrame: 6,
  scale: 2,
  sprites: {
    idle: {
      imageSrc: './images/wizard/Idle.png',
      maxFrame: 6,
    },
    run: {
      imageSrc: './images/wizard/Run.png',
      maxFrame: 8,
    },
    jump: {
      imageSrc: './images/wizard/Jump.png',
      maxFrame: 2,
    },
    fall: {
      imageSrc: './images/wizard/Fall.png',
      maxFrame: 2,
    },
    attack1: {
      imageSrc: './images/wizard/Attack1.png',
      maxFrame: 8,
    },
    attack2: {
      imageSrc: './images/wizard/Attack2.png',
      maxFrame: 8,
    },
  },
});

const enemy = new Player({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'cadetblue',
  offset: {
    x: 130,
    y: 235,
  },
  imageSrc: './images/kenji/Idle.png',
  maxFrame: 4,
  scale: 3,
  sprites: {
    idle: {
      imageSrc: './images/kenji/Idle.png',
      maxFrame: 4,
    },
    run: {
      imageSrc: './images/kenji/Run.png',
      maxFrame: 8,
    },
    jump: {
      imageSrc: './images/kenji/Jump.png',
      maxFrame: 2,
    },
    fall: {
      imageSrc: './images/kenji/Fall.png',
      maxFrame: 2,
    },
    attack1: {
      imageSrc: './images/kenji/Attack1.png',
      maxFrame: 4,
    },
    attack2: {
      imageSrc: './images/kenji/Attack1.png',
      maxFrame: 4,
    },
  },
});

const keys = {
  a: {
    pressed: false,
  },
  z: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

//i check if the player is in the range of attack on the x and y axes
function rectangularCollision({ rectangle1, rectangle2 }: any | number) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy, timerId }: any) {
  clearTimeout(timerId);
  ((document.querySelector(
    '#displayText',
  ) as unknown) as HTMLElement).style.display = 'flex';
  if (player.health === enemy.health) {
    ((document.querySelector(
      '#displayText',
    ) as unknown) as HTMLElement).innerHTML = 'Tie';
  } else if (player.health > enemy.health) {
    ((document.querySelector(
      '#displayText',
    ) as unknown) as HTMLElement).innerHTML = 'Player 1 Wins';
  } else if (player.health < enemy.health) {
    ((document.querySelector(
      '#displayText',
    ) as unknown) as HTMLElement).innerHTML = 'Player 2 Wins';
  }
}

let timer = 120;
let timerId: number;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;

    ((document.querySelector(
      '#timer',
    ) as unknown) as HTMLElement).innerHTML = timer.toString();
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

decreaseTimer();

//animation loop
function animate() {
  window.requestAnimationFrame(animate);
  //background color
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  blueFlame.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    player.animationSwitcher('run');
  } else if (keys.z.pressed && player.lastKey === 'z') {
    player.velocity.x = 5;
    player.animationSwitcher('run');
  } else {
    player.animationSwitcher('idle');
  }

  //jump and fall
  if (player.velocity.y < 0) {
    player.animationSwitcher('jump');
  } else if (player.velocity.y > 0) {
    player.animationSwitcher('fall');
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
    enemy.animationSwitcher('run');
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
    enemy.animationSwitcher('run');
  } else {
    enemy.animationSwitcher('idle');
  }

  //enemy jump and fall
  if (enemy.velocity.y < 0) {
    enemy.animationSwitcher('jump');
  } else if (enemy.velocity.y > 0) {
    enemy.animationSwitcher('fall');
  }

  // detect for collision
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    ((document.querySelector(
      '#enemyHealth',
    ) as unknown) as HTMLElement).style.width = enemy.health + '%';
  }

  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    ((document.querySelector(
      '#playerHealth',
    ) as unknown) as HTMLElement).style.width = player.health + '%';
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'z':
      keys.z.pressed = true;
      player.lastKey = 'z';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'e':
      player.velocity.y = -30;
      break;
    case ' ':
      player.attack();
      break;
    case 's':
      keys.s.pressed = true;
      player.lastKey = 's';
      player.attack2();
      enemy.health -= 100;
      ((document.querySelector(
        '#enemyHealth',
      ) as unknown) as HTMLElement).style.width = enemy.health + '%';
      player.scale = 3;
      player.offset = {
        x: 110,
        y: 270,
      };
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20;
      break;
    case 'ArrowDown':
      enemy.attack();
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'z':
      keys.z.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
});
