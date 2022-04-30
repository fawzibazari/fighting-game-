export interface Characteristics {
  width?: number;
  color?: string;
  height?: number;
  health?: number;
  lastKey?: string;
  isAttacking?: string;
  position: {
    x: number;
    y: number;
  };
  velocity?: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
  attackBox?: {
    position?: {
      x: number;
      y: number;
    };
    offset?: {
      x: number;
      y: number;
    };
    width?: number;
    height?: number;
  };
  image: HTMLImageElement;
  framesMax: number;
  framesCurrent: number;
  framesElapsed: number;
  framesHold: number;
  scale: number;
}
