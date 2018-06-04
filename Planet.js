import { Vector2 } from './Vector2.js';
import { Star } from './Star.js';

export class Planet extends Star
{
  constructor(name, size, weight, distanceFromStar, initialAngularSpeed, initialAngle, color)
  {
    super(name, size, weight);
    this.distanceFromStar = distanceFromStar;
    this.color = color
    this.gravityConstant = 6.7e-11;
    this.tangentialSpeed = 0
    this.velocity = new Vector2(2, 0);
  }

  step(delta)
  {
    this.movement = this.velocity.multConstant(delta);

    this.position = this.position.add(this.movement);

    console.log(this.position);
  }
}
