import { Vector2 } from './Vector2.js';
import { Star } from './Star.js';

export class Planet extends Star
{
  constructor(name, size, weight, position, color)
  {
    super(name, size, weight);
    this.position = position;
    this.color = color
  }

  step(delta)
  {

  }
}
