import { PathGenerator } from './pathGenerator';
import { SimulationConfig } from '../types';

export class BehaviorEngine {
  private pathGenerator: PathGenerator;
  private config: SimulationConfig;
  private isRunning: boolean = false;

  constructor(config: SimulationConfig) {
    this.pathGenerator = new PathGenerator();
    this.config = config;
  }

  setConfig(config: SimulationConfig): void {
    this.config = config;
  }

  start(): void {
    this.isRunning = true;
    this.simulateBehavior();
  }

  stop(): void {
    this.isRunning = false;
  }

  private async simulateBehavior(): Promise<void> {
    while (this.isRunning) {
      await this.simulateMouseMovement();
      
      if (Math.random() < 0.3) {
        await this.simulateKeyboardInput();
      }
      
      const waitTime = this.random(this.config.pauseDuration[0], this.config.pauseDuration[1]);
      await this.sleep(waitTime);
    }
  }

  private async simulateMouseMovement(): Promise<void> {
    const screenWidth = 1920;
    const screenHeight = 1080;
    
    const start = this.pathGenerator.generateRandomPoint(screenWidth, screenHeight);
    const end = this.pathGenerator.generateRandomPoint(screenWidth, screenHeight);
    
    const path = this.pathGenerator.generateMousePath(start, end);
    
    for (const point of path.points) {
      if (!this.isRunning) break;
      
      this.moveMouse(point.x, point.y);
      
      await this.sleep(path.duration / path.points.length);
      
      if (Math.random() < this.config.pauseProbability) {
        const pauseTime = this.random(this.config.pauseDuration[0], this.config.pauseDuration[1]);
        await this.sleep(pauseTime);
      }
    }
  }

  private async simulateKeyboardInput(): Promise<void> {
    const keys = 'abcdefghijklmnopqrstuvwxyz1234567890 ';
    const keyCount = Math.floor(this.random(1, 10));
    
    for (let i = 0; i < keyCount; i++) {
      if (!this.isRunning) break;
      
      const key = keys[Math.floor(Math.random() * keys.length)];
      this.pressKey(key);
      
      const delay = this.random(this.config.keyboardDelay[0], this.config.keyboardDelay[1]);
      await this.sleep(delay);
    }
  }

  private moveMouse(x: number, y: number): void {
    console.log(`Moving mouse to: ${x}, ${y}`);
  }

  private pressKey(key: string): void {
    console.log(`Pressing key: ${key}`);
  }

  private random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}