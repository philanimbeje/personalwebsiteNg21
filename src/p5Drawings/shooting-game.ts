import p5 from "p5";
import { Bullet, Particle, FallingBlock, ShootingGameObject} from "./models/shootinggamemodels";

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
    //private p: p5;

    // private blocks: FallingBlock[] = [];
    // private bullets: Bullet[] = [];
    // private particles: Particle[] = [];

    // private spawnTimer: number = 0;
    // private score: number = 0;

    // private readonly blockSize: number = 25;

    // private readonly tetrominoes: number[][][] = [
    //     [[1, 1, 1, 1]],

    //     [
    //         [1, 1],
    //         [1, 1]
    //     ],

    //     [
    //         [0, 1, 0],
    //         [1, 1, 1]
    //     ],

    //     [
    //         [1, 0, 0],
    //         [1, 1, 1]
    //     ],

    //     [
    //         [0, 0, 1],
    //         [1, 1, 1]
    //     ],

    //     [
    //         [0, 1, 1],
    //         [1, 1, 0]
    //     ],

    //     [
    //         [1, 1, 0],
    //         [0, 1, 1]
    //     ]
    // ];

    // constructor(containerId: string) {

    //     this.p = new p5((p: p5) => {

    //         p.setup = () => {
    //             p.createCanvas(
    //                 window.innerWidth,
    //                 window.innerHeight
    //             ).parent(containerId);
    //         };

    //         p.draw = () => {

    //             p.background(10);

    //             this.drawGround(p);
    //             this.drawHUD(p);

    //             this.spawnBlocks(p);

    //             this.updateBlocks(p);
    //             this.updateBullets(p);
    //             this.updateParticles(p);

    //             this.drawShooter(p);
    //         };

    //         p.mousePressed = () => {
    //             this.shoot(p);
    //         };

    //         p.windowResized = () => {
    //             p.resizeCanvas(
    //                 window.innerWidth,
    //                 window.innerHeight
    //             );
    //         };
    //     });
    // }

    // private drawGround(p: p5): void {

    //     p.fill(35);

    //     p.rect(
    //         0,
    //         p.height - 40,
    //         p.width,
    //         40
    //     );
    // }

    // private drawHUD(p: p5): void {

    //     p.fill(255);

    //     p.textSize(24);

    //     p.text(
    //         `Score: ${this.score}`,
    //         20,
    //         35
    //     );
    // }

    // private drawShooter(p: p5): void {

    //     const x = p.width / 2;
    //     const y = p.height - 60;

    //     const angle = p.atan2(
    //         p.mouseY - y,
    //         p.mouseX - x
    //     );

    //     p.push();

    //     p.translate(x, y);

    //     p.rotate(angle);

    //     p.fill(80, 220, 255);

    //     p.rect(-10, -10, 50, 20, 5);

    //     p.fill(255);

    //     p.circle(0, 0, 30);

    //     p.pop();
    // }

    // private shoot(p: p5): void {

    //     const x = p.width / 2;
    //     const y = p.height - 60;

    //     const angle = p.atan2(
    //         p.mouseY - y,
    //         p.mouseX - x
    //     );

    //     this.bullets.push({
    //         x,
    //         y,
    //         vx: p.cos(angle) * 10,
    //         vy: p.sin(angle) * 10,
    //         r: 6
    //     });
    // }

    // private spawnBlocks(p: p5): void {

    //     this.spawnTimer++;

    //     if (this.spawnTimer < 60) {
    //         return;
    //     }

    //     this.spawnTimer = 0;

    //     const shape = p.random(
    //         this.tetrominoes
    //     ) as number[][];

    //     this.blocks.push({
    //         shape,
    //         x: p.random(100, p.width - 100),
    //         y: -100,
    //         speed: p.random(1, 2.5),
    //         stopped: false,
    //         color: p.color(
    //             p.random(100, 255),
    //             p.random(100, 255),
    //             p.random(100, 255)
    //         )
    //     });
    // }

    // private updateBlocks(p: p5): void {

    //     for (
    //         let i = this.blocks.length - 1;
    //         i >= 0;
    //         i--
    //     ) {

    //         const block = this.blocks[i];

    //         if (!block.stopped) {

    //             block.y += block.speed;

    //             const blockHeight =
    //                 block.shape.length * this.blockSize;

    //             if (
    //                 block.y + blockHeight >= p.height - 40
    //             ) {
    //                 block.y =
    //                     p.height - 40 - blockHeight;

    //                 block.stopped = true;
    //             }
    //         }

    //         this.drawBlock(p, block);

    //         for (
    //             let j = this.bullets.length - 1;
    //             j >= 0;
    //             j--
    //         ) {

    //             const bullet = this.bullets[j];

    //             if (
    //                 this.isBlockHit(
    //                     block,
    //                     bullet
    //                 )
    //             ) {

    //                 this.createExplosion(
    //                     p,
    //                     bullet.x,
    //                     bullet.y,
    //                     block.color
    //                 );

    //                 this.blocks.splice(i, 1);

    //                 this.bullets.splice(j, 1);

    //                 this.score += 10;

    //                 break;
    //             }
    //         }
    //     }
    // }

    // private drawBlock(
    //     p: p5,
    //     block: FallingBlock
    // ): void {

    //     p.fill(block.color);

    //     p.stroke(0);

    //     for (
    //         let row = 0;
    //         row < block.shape.length;
    //         row++
    //     ) {

    //         for (
    //             let col = 0;
    //             col < block.shape[row].length;
    //             col++
    //         ) {

    //             if (!block.shape[row][col]) {
    //                 continue;
    //             }

    //             p.rect(
    //                 block.x + col * this.blockSize,
    //                 block.y + row * this.blockSize,
    //                 this.blockSize,
    //                 this.blockSize
    //             );
    //         }
    //     }
    // }

    // private isBlockHit(
    //     block: FallingBlock,
    //     bullet: Bullet
    // ): boolean {

    //     for (
    //         let row = 0;
    //         row < block.shape.length;
    //         row++
    //     ) {

    //         for (
    //             let col = 0;
    //             col < block.shape[row].length;
    //             col++
    //         ) {

    //             if (!block.shape[row][col]) {
    //                 continue;
    //             }

    //             const x =
    //                 block.x +
    //                 col * this.blockSize;

    //             const y =
    //                 block.y +
    //                 row * this.blockSize;

    //             if (
    //                 bullet.x > x &&
    //                 bullet.x < x + this.blockSize &&
    //                 bullet.y > y &&
    //                 bullet.y < y + this.blockSize
    //             ) {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }

    // private updateBullets(p: p5): void {

    //     for (
    //         let i = this.bullets.length - 1;
    //         i >= 0;
    //         i--
    //     ) {

    //         const bullet = this.bullets[i];

    //         bullet.x += bullet.vx;
    //         bullet.y += bullet.vy;

    //         p.noStroke();

    //         p.fill(255, 220, 0);

    //         p.circle(
    //             bullet.x,
    //             bullet.y,
    //             bullet.r * 2
    //         );

    //         if (
    //             bullet.x < 0 ||
    //             bullet.x > p.width ||
    //             bullet.y < 0 ||
    //             bullet.y > p.height
    //         ) {
    //             this.bullets.splice(i, 1);
    //         }
    //     }
    // }

    // private createExplosion(
    //     p: p5,
    //     x: number,
    //     y: number,
    //     color: p5.Color
    // ): void {

    //     for (let i = 0; i < 25; i++) {

    //         this.particles.push({
    //             x,
    //             y,
    //             vx: p.random(-4, 4),
    //             vy: p.random(-4, 4),
    //             alpha: 255,
    //             color
    //         });
    //     }
    // }

    // private updateParticles(p: p5): void {

    //     for (
    //         let i = this.particles.length - 1;
    //         i >= 0;
    //         i--
    //     ) {

    //         const particle = this.particles[i];

    //         particle.x += particle.vx;
    //         particle.y += particle.vy;

    //         particle.vy += 0.05;

    //         particle.alpha -= 5;

    //         p.noStroke();

    //         p.fill(
    //             p.red(particle.color),
    //             p.green(particle.color),
    //             p.blue(particle.color),
    //             particle.alpha
    //         );

    //         p.circle(
    //             particle.x,
    //             particle.y,
    //             6
    //         );

    //         if (particle.alpha <= 0) {
    //             this.particles.splice(i, 1);
    //         }
    //     }
    // }

    // public destroy(): void {
    //     this.p.remove();
    // }
}