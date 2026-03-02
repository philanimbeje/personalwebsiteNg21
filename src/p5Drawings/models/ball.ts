import p5 from "p5";

export class Ball {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;

  constructor(x: number, y: number, radius: number, speedX: number, speedY: number) {
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x - radius;
    this.y = y - radius;
  }

  update(sketch: p5) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off the edges
    if (this.x - this.radius <= 0 || this.x + this.radius >= sketch.width) {
      this.speedX *= -1;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= sketch.height) {
      this.speedY *= -1;
    }
  }

  display(sketch: p5) {
    sketch.fill(0, 0, 255);
    sketch.noStroke();
    sketch.ellipse(this.x, this.y, this.radius * 2);
  }
}