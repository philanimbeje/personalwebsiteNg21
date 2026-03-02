import p5 from "p5";

export class StreamingBall {
    x: number;
    y: number;
    radius: number;
    xSpeed: number;
    ySpeed: number;
    color: p5.Color;

    constructor(sketch: p5, x: number, y: number, radius: number, xSpeed: number, ySpeed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.color = sketch.color(sketch.random(255), sketch.random(255), sketch.random(255)); // Random color
    }

    update(sketch: p5) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Bounce off the edges of the canvas
        if (this.x >= sketch.width - this.radius || this.x <= this.radius) {
            this.xSpeed *= -1;
        }

        if (this.y >= sketch.height - this.radius || this.y <= this.radius) {
            this.ySpeed *= -1;
        }
    }

    display(sketch: p5) {
        sketch.fill(this.color);
        sketch.noStroke();
        sketch.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        
        // Randomly change the ball's color over time
        if (sketch.frameCount % 60 === 0) {
            this.color = sketch.color(sketch.random(255), sketch.random(255), sketch.random(255));
        }
    }
}