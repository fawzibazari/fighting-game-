import { Player } from './game';

export const canvas = document.querySelector('canvas')!;
export const c = canvas.getContext('2d')!;

canvas.width = 1420;
canvas.height = 780;

c.fillRect(0, 0, canvas.width, canvas.height);
c.fillStyle = 'red';

const gravity = 0.7;

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
    x: 0,
    y: 0,
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
  color: 'blue',
  offset: {
    x: -50,
    y: 0,
  },
});

console.log(player);

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;
}

animate();
