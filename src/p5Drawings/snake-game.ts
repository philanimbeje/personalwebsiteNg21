import p5 from "p5";
import { SnakeGameObject} from "./models/snakegamemodels";

export class SnakeGame {
    Draw(sketch: p5) {
        var game = new SnakeGameObject(sketch);
        sketch.frameRate(10);
        sketch.setup = () => {

        game.snake = [{ x: 5, y: 5 }];
        game.generateFood();

        
        const canvas2 = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas2.parent('sketch-holder');
        sketch.background(255);
        };
        
        sketch.draw = () => {
        
        sketch.background(255);

        if (game.gameOver) {
          game.drawGameOver();
          return;
        }

        game.drawHUD();
        game.moveSnake();
        game.checkCollisions();

        game.drawFood();
        game.drawSnake();
      };

      sketch.keyPressed = () => {
        switch (sketch.key) {
          case sketch.UP_ARROW:
            if (game.direction.y !== 1) {
              game.direction = { x: 0, y: -1 };
            }
            break;

          case sketch.DOWN_ARROW:
            if (game.direction.y !== -1) {
              game.direction = { x: 0, y: 1 };
            }
            break;

          case sketch.LEFT_ARROW:
            if (game.direction.x !== 1) {
              game.direction = { x: -1, y: 0 };
            }
            break;

          case sketch.RIGHT_ARROW:
            if (game.direction.x !== -1) {
              game.direction = { x: 1, y: 0 };
            }
            break;

          case "R":
          case "r": // R key
            if (game.gameOver) {
              game.restartGame();
            }
            break;
        }
      };
    }
}