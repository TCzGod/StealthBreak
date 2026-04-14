import { Point, MousePath } from '../types';

export class PathGenerator {
  private random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private bezierCurve(points: Point[], t: number): Point {
    if (points.length === 1) {
      return points[0];
    }

    const newPoints: Point[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      newPoints.push({
        x: points[i].x + (points[i + 1].x - points[i].x) * t,
        y: points[i].y + (points[i + 1].y - points[i].y) * t
      });
    }

    return this.bezierCurve(newPoints, t);
  }

  generateMousePath(start: Point, end: Point, steps: number = 100): MousePath {
    const controlPoints: Point[] = [];
    
    controlPoints.push(start);
    
    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
    
    const controlCount = Math.floor(this.random(1, 3));
    for (let i = 0; i < controlCount; i++) {
      const factor = (i + 1) / (controlCount + 1);
      controlPoints.push({
        x: start.x + (end.x - start.x) * factor + this.random(-distance * 0.2, distance * 0.2),
        y: start.y + (end.y - start.y) * factor + this.random(-distance * 0.2, distance * 0.2)
      });
    }
    
    controlPoints.push(end);
    
    const points: Point[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points.push(this.bezierCurve(controlPoints, t));
    }
    
    const duration = distance / this.random(5, 15);
    
    return {
      points,
      duration
    };
  }

  generateRandomPoint(screenWidth: number, screenHeight: number): Point {
    return {
      x: this.random(0, screenWidth),
      y: this.random(0, screenHeight)
    };
  }
}