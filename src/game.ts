import { c, canvas } from './index';

const gravity = 0.7;

export class Scene {
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
  image: HTMLImageElement;

  constructor({ position, imageSrc }: any) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    console.log(this.image);

    this.draw();
  }
}

export class Player {
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
  velocity: { x: number; y: number };
  lastKey!: string;
  color: string;
  isAttacking!: boolean;
  health: number;
  offset!: {
    x: number;
    y: number;
  };
  attackBox: {
    position: {
      x: number;
      y: number;
    };
    offset: {
      x: number;
      y: number;
    };
    width: number;
    height: number;
  };
  constructor({ position, velocity, color, offset }: any) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    offset;
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box
    if (this.isAttacking) {
      c.fillStyle = 'white';
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height,
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
