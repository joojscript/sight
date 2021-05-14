import { Point } from '@types';
// import math from 'mathjs';

class LinearRegressionEngine {
  private angularCoeficient = 1;

  private linearCoeficient = 0;

  private learningRate = 0.00001;

  private baseFunction = (x: number) => this.angularCoeficient * x + this.linearCoeficient;

  lastResults = [] as number[];

  setAngularCoeficient = (value: number) => {
    this.angularCoeficient = value;
  }

  setLinearCoeficient = (value: number) => {
    this.linearCoeficient = value;
  }

  setLearningRate = (value: number) => {
    this.learningRate = value;
  }

  runBaseFunction = (xValues: number[]) => {
    this.lastResults = xValues.map((xValue: number) => this.baseFunction(xValue));
  }

  costFunction = (points: Point[]) => {
    if (this.lastResults.length !== points.length) return;

    let accumulator = 0;

    points.forEach((point: Point, index: number) => {
      accumulator += (point.y - this.lastResults[index]) ** 2;
    });

    // this.computeResults();

    // eslint-disable-next-line consistent-return
    return accumulator;
  }

  computeResults = (points: Point[]) => {
    points.forEach((point: Point) => {
      const y = this.baseFunction(point.x);
      const angularDerivative = 2 * point.x * (point.y - y);
      const linearDerivative = 2 * (point.y - y);
      this.angularCoeficient += (angularDerivative * this.learningRate);
      this.linearCoeficient += (linearDerivative * this.learningRate);
    });

    points.forEach((point: Point) => this.baseFunction(point.x));
  }
}

export default new LinearRegressionEngine();
