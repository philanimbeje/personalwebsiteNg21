import p5 from "p5";
import {ShootingGameObject} from "./models/shootinggamemodels";

export class ShootingGame {
    Draw(sketch: p5) {
        var game = new ShootingGameObject(sketch);
         sketch.setup = () => {
            const canvas2 = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
            canvas2.parent('sketch-holder');
            sketch.background(255);
            };

        sketch.draw = () => {

            sketch.background(255);

            game.drawGround();
            game.drawHUD();

            game.spawnBlocks();

            game.updateBlocks();
            game.updateBullets();
            game.updateParticles();

            game.drawShooter();
            game.checkGameOver();
        };

        sketch.mousePressed = () => {
            game.shoot();
        };

        sketch.windowResized = () => {
            sketch.resizeCanvas(
                window.innerWidth,
                window.innerHeight
            );
        };
    }
}
