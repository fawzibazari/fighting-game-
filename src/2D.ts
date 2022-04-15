interface Characteristics {
  width: number;
  color: string;
  height: number;
  health: string;
  lastKey: string;
  isAttacking: string;
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  offset: {
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
}

export class canvas implements Characteristics {
  width!: number;
  height!: number;
  position: {
    x: number;
    y: number;
  };
  velocity: { x: number; y: number };
  lastKey!: string;
  color!: string;
  isAttacking!: string;
  health!: string;
  offset!: {
    x: number;
    y: number;
  };
  attackBox!: {
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

  constructor({ position, velocity, color = 'aqua', offset }: Characteristics) {
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
  }
}
const test = new canvas({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'hello',
  offset: {
    x: 0,
    y: 0,
  },
});
