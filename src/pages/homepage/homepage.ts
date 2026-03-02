import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { BouncyBalls } from '../../p5Drawings/bouncy-balls';
import { ArrowDrag } from '../../p5Drawings/arrow-drag';
import { StreamingBouncyBalls } from '../../p5Drawings/streaming-bouncy-balls';
@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit{
  private canvas: any;
  private randomNumber: number = Math.floor(Math.random() * 3);
  
  ngOnInit(): void {
    const sketch = (sketch: p5) => {
      this.selectDrawing(sketch);
    };
    this.canvas = new p5(sketch);
  }

  selectDrawing(sketch:any)
  {
    switch (this.randomNumber) {
      case 0:
        console.log("BouncyBalls Selected");
        BouncyBalls.prototype.Draw(sketch);
        break;
      case 1:
        console.log("ArrowDrag Selected");
        ArrowDrag.prototype.Draw(sketch);
        break;
      case 2:
        console.log("ArrowDrag Selected");
        StreamingBouncyBalls.prototype.Draw(sketch);
        break;
      default:
        console.log("Unexpected value.");
    }
  }
}
