import p5 from "p5";

export class ArrowDrag {
    Draw(sketch: p5) {
        let lightPosX: number = 0;
        let lightPosY: number = 0;
        let lightSize: number = 80;
        let targetLightSize: number = lightSize;
        let lightColor: p5.Color;
        const noiseFactor: number = 0.05;
        const fogOpacity: number = 30;
        const noiseSpeed: number = 0.01;
        const noiseOffset: number[] = [0, 0];
        
        let fogGraphics: p5.Graphics; // Graphics buffer for the fog effect
    
        sketch.setup = () => {
          const canvas2 = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
          canvas2.parent('sketch-holder');
          sketch.noStroke();
    
          // Create a graphics buffer to hold the fog texture
          fogGraphics = sketch.createGraphics(sketch.width, sketch.height);
        };
    
        sketch.draw = () => {
          // Generate static foggy noise background once per frame using the graphics buffer
         
          fogGraphics.updatePixels();
    
          // Draw the fog texture onto the main canvas
          sketch.image(fogGraphics, 0, 0);
    
          // Move the noise background over time
          noiseOffset[0] += noiseSpeed;
          noiseOffset[1] += noiseSpeed;
    
          // Smoothly move light towards the mouse
          const targetX = sketch.mouseX;
          const targetY = sketch.mouseY;
    
          // Using easing for smoother motion
          lightPosX += (targetX - lightPosX) * 0.07;
          lightPosY += (targetY - lightPosY) * 0.07;
    
          // Calculate distance to the mouse pointer to change the light size and color
          const distance = sketch.dist(lightPosX, lightPosY, targetX, targetY);
    
          // Gradually change the light's color to red when near the mouse point
          const maxDistance = 150;
          const redIntensity = sketch.map(distance, 0, maxDistance, 255, 50);
          lightColor = sketch.color(redIntensity, 50, 50);
    
          // Light size changes with proximity to the mouse
          targetLightSize = sketch.map(distance, 0, maxDistance, 150, lightSize);
    
          // Draw the light
          sketch.fill(lightColor);
          sketch.noStroke();
          sketch.circle(lightPosX, lightPosY, targetLightSize);
        };
    
        sketch.keyPressed = () => {
          if (sketch.key === 'c') {
            sketch.clear();
            sketch.background(255);
          }
        };
      }
  }