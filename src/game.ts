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
  scale: number;
  maxFrame: number;
  currentFrame: number;
  // to know how many frames i have elapsed
  elapsedFrame: number;
  //for how many frames i have to make the animation example: for every 5 frames i make the animation
  framesHold: number;
  offset: {
    x: number;
    y: number;
  };

  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrame = 1,
    offset = { x: 0, y: 0 },
  }: any) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrame = maxFrame;
    this.currentFrame = 0;
    this.elapsedFrame = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.maxFrame),
      0,
      this.image.width / this.maxFrame,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.maxFrame) * this.scale,
      this.image.height * this.scale,
    );
  }

  frameAnimation() {
    this.elapsedFrame++;
    if (this.elapsedFrame % this.framesHold === 0) {
      if (this.currentFrame < this.maxFrame - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.frameAnimation();
  }
}

export class Player extends Scene {
  width: number;
  height: number;
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
  //the sprites are the different image the player will have exapmle: running, attacking etc
  sprites: any;
  constructor({
    position,
    velocity,
    color,
    imageSrc,
    scale = 1,
    maxFrame = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }: any) {
    super({
      position,
      imageSrc,
      scale,
      maxFrame,
      offset,
    });
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
    this.currentFrame = 0;
    this.elapsedFrame = 0;
    this.framesHold = 5;
    this.maxFrame = maxFrame;
    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    this.frameAnimation();
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

  //the Sprites
  animationSwitcher(animation: string) {
    // the if statement is to set the value the firstime only
    switch (animation) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.maxFrame = this.sprites.idle.maxFrame;
        }
        break;
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.maxFrame = this.sprites.run.maxFrame;
        }
        break;
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.maxFrame = this.sprites.jump.maxFrame;
        }
        break;
    }
  }
}
