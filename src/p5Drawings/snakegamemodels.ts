import p5 from "p5";


export class SnakeGameObject {
    public cols = 30;
    public rows = 30;
    public cellSize = 20;

    public snake: { x: number; y: number }[] = [];
    public direction = { x: 1, y: 0 };
    public food = { x: 10, y: 10 };

    public score = 0;
    public gameOver = false;

    // Desert decoration
    private cacti: { x: number; y: number; h: number }[] = [];

    private p: p5;
    constructor(sketch: p5) {
        this.p = sketch;
        this.cols = this.p.windowWidth/20
        this.rows = this.p.windowHeight/20
    }

    public drawCacti(): void{
        for (let i = 0; i < 12; i++) {
        this.cacti.push({
            x: this.p.random(this.p.width),
            y: this.p.random(this.p.height),
            h: this.p.random(30, 70)
        });
        }
    }
    public  moveSnake(): void {
        const head = {
          x: this.snake[0].x + this.direction.x,
          y: this.snake[0].y + this.direction.y
        };

        const newHead = {
          x: this.snake[0].x ,
          y: this.snake[0].y
        };
        this.snake.unshift(head);

        if (Math.abs(head.x - this.food.x) < 1.3 && Math.abs(head.y - this.food.y) < 1.3) {
          this.score += 10;
          this.generateFood();
        } else {
          this.snake.pop();
        }
      }

      public checkCollisions(): void {
        const head = this.snake[0];

        // Wall collision
        if (
          head.x <= 0 ||
          head.x >= this.cols ||
          head.y <= 0 ||
          head.y >= this.rows
        ) {
          this.gameOver = true;
        }

        // Self collision
        for (let i = 1; i < this.snake.length; i++) {
          if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
            this.gameOver = true;
          }
        }
      }

      public generateFood(): void {
        this.food = {
          x: this.p.floor(this.p.random() * (this.cols -(5))) + 5 ,
          y: this.p.floor(this.p.random() * (this.rows -(10))) + 5
        };
      }

      public drawSnake(): void {
        for (let i = 0; i < this.snake.length; i++) {
          const s = this.snake[i];

          if (i === 0) {
            this.p.fill(34, 139, 34);
          } else {
            this.p.fill(50, 205, 50);
          }

          this.p.stroke(0);

          this.p.rect(
            s.x*this.cellSize,
            s.y*this.cellSize,
            this.cellSize,
            this.cellSize,
            4
          );
        }
      }

      public drawFood(): void {
        this.p.fill(220, 30, 30);
        this.p.noStroke();

        this.p.circle(
          this.food.x*this.cellSize,
          this.food.y*this.cellSize,
          this.cellSize
        );
      }

      public drawHUD(): void {
        this.p.fill(0);
        this.p.textSize(30);
        this.p.text(`Score: ${this.score}`, 50, 150);
      }

      public drawGameOver(): void {
        this.drawSnake()

        this.p.fill(0);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);

        this.p.textSize(42);
        this.p.text('GAME OVER', this.p.width / 2, this.p.height / 2 - 40);

        this.p.textSize(24);
        this.p.text(`Score: ${this.score}`, this.p.width / 2, this.p.height / 2 + 10);

        this.p.textSize(18);
        this.p.text(
          'Press R to Restart',
          this.p.width / 2,
          this.p.height / 2 + 50
        );
      }

      public restartGame(): void {
        this.snake = [{ x: 5, y: 5 }];
        this.direction = { x: 1, y: 0 };
        this.score = 0;
        this.gameOver = false;
        this.generateFood();
      }
  }

