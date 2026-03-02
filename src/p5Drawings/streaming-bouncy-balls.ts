import p5 from "p5";
import { StreamingBall } from "./models/streamingball";

export class StreamingBouncyBalls {
    Draw(sketch: p5) {
        let balls: StreamingBall[] = [];
        
        sketch.setup = () => {
            const canvas2 = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
            canvas2.parent('sketch-holder');
            sketch.background(255);
            
            // Initialize balls with random properties
            for (let i = 0; i < 8; i++) {
                balls.push(new StreamingBall(
                    sketch,
                    sketch.random(20, sketch.width - 20), 
                    sketch.random(20, sketch.height - 20), 
                    sketch.random(20, 40), 
                    sketch.random(2, 4), 
                    sketch.random(2, 4)
                ));
            }
                console.log(balls)
        };
        
        sketch.draw = () => {
            sketch.background(255, 10); // Slight transparency for a trailing effect
            
            for (let ball of balls) {
                ball.update(sketch);
                ball.display(sketch);
            }
        };
        
        sketch.keyPressed = () => {
            if (sketch.key === 'c') {
                sketch.clear();
                sketch.background(255);
            }
        };
    }
}