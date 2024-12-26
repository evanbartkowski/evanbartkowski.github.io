export class GameLoop {
    constructor(update, render) {
      this.lastFrameTime = 0;
      this.accumulatedTime = 0;
      this.timeStep = 1000 / 60; // 60 frames per second
  
      this.update = update;
      this.render = render;
  
      this.rafId = null;
      this.isRunning = false;
    }
  
    mainLoop = (timestamp) => {
      if (!this.isRunning) return;
  
      const deltaTime = timestamp - this.lastFrameTime;
      this.lastFrameTime = timestamp;
  
      // Accumulate all the time since the last frame
      this.accumulatedTime += deltaTime;
  
      // Fixed time step updates
      while (this.accumulatedTime >= this.timeStep) {
        this.update(this.timeStep); // Pass fixed time step size to update
        this.accumulatedTime -= this.timeStep;
      }
  
      // Render the current state
      this.render();
  
      // Request the next frame
      this.rafId = requestAnimationFrame(this.mainLoop);
    };
  
    start() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.rafId = requestAnimationFrame(this.mainLoop);
      }
    }
  
    stop() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      this.isRunning = false;
    }
  }
  