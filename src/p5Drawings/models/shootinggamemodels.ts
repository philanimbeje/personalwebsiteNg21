import p5 from "p5";

export interface Bullet {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: p5.Color;
}

export interface FallingBlock {
    shape: number[][];
    x: number;
    y: number;
    speed: number;
    stopped: boolean;
    color: p5.Color;
}

export class ShootingGameObject {
    private blocks: FallingBlock[] = [];
    private bullets: Bullet[] = [];
    private particles: Particle[] = [];
    private p: p5;
    private spawnTimer: number = 0;
    private score: number = 0;
    private droppedBlocks = 0;
    private gameOver = false;

    private readonly blockSize: number = 25;

    private readonly tetrominoes: number[][][] = [
        [[1, 1, 1, 1]],

        [
            [1, 1],
            [1, 1]
        ],

        [
            [0, 1, 0],
            [1, 1, 1]
        ],

        [
            [1, 0, 0],
            [1, 1, 1]
        ],

        [
            [0, 0, 1],
            [1, 1, 1]
        ],

        [
            [0, 1, 1],
            [1, 1, 0]
        ],

        [
            [1, 1, 0],
            [0, 1, 1]
        ]
    ];

    constructor(sketch: p5) {
        this.p = sketch;
    }
    public drawGround(): void {

        this.p.fill(35);

        this.p.rect(
            0,
            this.p.height - 40,
            this.p.width,
            40
        );
    }

    public drawHUD(): void {

        this.p.fill(0);

        this.p.textSize(24);

        this.p.text("Score: " + this.score, 20, 100);
        this.p.text("Dropped: " + this.droppedBlocks + "/15", 20, 125);

        if (this.gameOver) {
            this.p.textAlign(this.p.CENTER);
            this.p.textSize(48);
            this.p.fill(255, 80, 80);
            this.p.text("GAME OVER", this.p.width / 2, this.p.height / 2);

            this.p.textSize(24);
            this.p.fill(90);
            this.p.text("Refresh to Restart", this.p.width / 2, this.p.height / 2 + 50);
            this.p.textAlign(this.p.LEFT);
        }
    }

    public drawShooter(): void {

        const x = this.p.width / 2;
        const y = this.p.height - 60;

        const angle = this.p.atan2(
            this.p.mouseY - y,
            this.p.mouseX - x
        );

        this.p.push();

        this.p.translate(x, y);

        this.p.rotate(angle);

        this.p.fill(80, 220, 255);

        this.p.rect(-10, -10, 50, 20, 5);

        this.p.fill(0);

        this.p.circle(0, 0, 30);

        this.p.pop();
    }

    public shoot(): void {

        if (this.gameOver) return;
        
        const x = this.p.width / 2;
        const y = this.p.height - 60;

        const angle = this.p.atan2(
            this.p.mouseY - y,
            this.p.mouseX - x
        );

        this.bullets.push({
            x,
            y,
            vx: this.p.cos(angle) * 10,
            vy: this.p.sin(angle) * 10,
            r: 6
        });
    }

    public spawnBlocks(): void {

        if (this.gameOver) return;
        this.spawnTimer++;

        if (this.spawnTimer < 60) {
            return;
        }

        this.spawnTimer = 0;

        const shape = this.p.random(
            this.tetrominoes
        ) as number[][];

        this.blocks.push({
            shape,
            x: this.p.random(100, this.p.width - 100),
            y: -100,
            speed: this.p.random(1, 2.5),
            stopped: false,
            color: this.p.color(
                this.p.random(100, 255),
                this.p.random(100, 255),
                this.p.random(100, 255)
            )
        });
    }

    public updateBlocks(): void {
        
        if (this.gameOver) return;
        for (
            let i = this.blocks.length - 1;
            i >= 0;
            i--
        ) {

            const block = this.blocks[i];

            if (!block.stopped) {

                block.y += block.speed;

                const blockHeight =
                    block.shape.length * this.blockSize;

                if (
                    block.y + blockHeight >= this.p.height - 40
                ) {
                    block.y =
                        this.p.height - 40 - blockHeight;

                    block.stopped = true;
                }
            }

            this.drawBlock(block);

            for (
                let j = this.bullets.length - 1;
                j >= 0;
                j--
            ) {

                const bullet = this.bullets[j];

                if (
                    this.isBlockHit(
                        block,
                        bullet
                    )
                ) {

                    this.createExplosion(
                        bullet.x,
                        bullet.y,
                        block.color
                    );

                    this.blocks.splice(i, 1);

                    this.bullets.splice(j, 1);

                    this.score += 10;

                    break;
                }
            }
        }
    }

    public drawBlock(
        block: FallingBlock
    ): void {

        this.p.fill(block.color);

        this.p.stroke(0);

        for (
            let row = 0;
            row < block.shape.length;
            row++
        ) {

            for (
                let col = 0;
                col < block.shape[row].length;
                col++
            ) {

                if (!block.shape[row][col]) {
                    continue;
                }

                this.p.rect(
                    block.x + col * this.blockSize,
                    block.y + row * this.blockSize,
                    this.blockSize,
                    this.blockSize
                );
            }
        }
    }

    public isBlockHit(
        block: FallingBlock,
        bullet: Bullet
    ): boolean {

        for (
            let row = 0;
            row < block.shape.length;
            row++
        ) {

            for (
                let col = 0;
                col < block.shape[row].length;
                col++
            ) {

                if (!block.shape[row][col]) {
                    continue;
                }

                const x =
                    block.x +
                    col * this.blockSize;

                const y =
                    block.y +
                    row * this.blockSize;

                if (
                    bullet.x > x &&
                    bullet.x < x + this.blockSize &&
                    bullet.y > y &&
                    bullet.y < y + this.blockSize
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    public updateBullets(): void {

        for (
            let i = this.bullets.length - 1;
            i >= 0;
            i--
        ) {

            const bullet = this.bullets[i];

            bullet.x += bullet.vx;
            bullet.y += bullet.vy;

            this.p.noStroke();

            this.p.fill(255, 220, 0);

            this.p.circle(
                bullet.x,
                bullet.y,
                bullet.r * 2
            );

            if (
                bullet.x < 0 ||
                bullet.x > this.p.width ||
                bullet.y < 0 ||
                bullet.y > this.p.height
            ) {
                this.bullets.splice(i, 1);
            }
        }
    }

    public createExplosion(
        x: number,
        y: number,
        color: p5.Color
    ): void {

        for (let i = 0; i < 25; i++) {

            this.particles.push({
                x,
                y,
                vx: this.p.random(-4, 4),
                vy: this.p.random(-4, 4),
                alpha: 255,
                color
            });
        }
    }

    public updateParticles(): void {

        for (
            let i = this.particles.length - 1;
            i >= 0;
            i--
        ) {

            const particle = this.particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.vy += 0.05;

            particle.alpha -= 5;

            this.p.noStroke();

            this.p.fill(
                this.p.red(particle.color),
                this.p.green(particle.color),
                this.p.blue(particle.color),
                particle.alpha
            );

            this.p.circle(
                particle.x,
                particle.y,
                6
            );

            if (particle.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    public checkGameOver(): void {

        let stacked = 0;
        for (let b of this.blocks) {
            if (b.stopped) stacked++;
        }

        this.droppedBlocks = stacked;

        if (this.droppedBlocks >= 15) {
            this.gameOver = true;
        }
    }
}