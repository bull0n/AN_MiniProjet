import { Vector2 } from './Vector2.js';
import { Star, GRAVITATIONAL } from './Star.js';

export class Planet extends Star
{
  constructor(name, size, mass, distanceFromStar, initialAngularSpeed, initialAngle, star, color, scaleFactor)
  {
    super(name, size, mass, color, scaleFactor);
    this.color = color;

    //star related
    this.star = star;

    //planet data
    this.angularSpeed = initialAngularSpeed;
    this.speed = 0;
    this.realPosition = new Vector2(distanceFromStar, initialAngle, true)

    this.computeDrawingPosition();
  }

  step(delta)
  {
    this.calculateNewPosition(delta);

    this.computeDrawingPosition();
  }

  computeDrawingPosition()
  {
    this.position = new Vector2(this.realPosition.length * this.scaleFactor, this.realPosition.angle, true);
  }

  calculateStarPlanetAcceleration()
  {
    // [acceleration of distance] = [distance][angular velocity]^2 - G * M / [distance]^2
    let result = this.realPosition.length * this.angularSpeed*this.angularSpeed - (GRAVITATIONAL * this.star.mass) / (this.realPosition.length * this.realPosition.length);

    return result;
  }

  calculateAngularAcceleration()
  {
    // [acceleration of angle] = - 2[speed][angular velocity] / [distance]

    return -2.0 * this.speed * this.angularSpeed / this.realPosition.length;
  }

  // Calculates a new value based on the time change and its derivative
  // For example, it calculates the new distance based on the distance derivative (velocity)
  // and the elapsed time interval.
  newValue(currentValue, delta, derivative)
  {
    return currentValue + delta * derivative;
  }

  // Calculates position of the Earth
  calculateNewPosition(delta)
  {
    // Calculate new distance
    let starPlanetAcceleration = this.calculateStarPlanetAcceleration();
    this.speed = this.newValue(this.speed, delta, starPlanetAcceleration);
    this.realPosition.setLength(this.newValue(this.realPosition.length, delta, this.speed));

    // Calculate new angle
    let angleAcceleration = this.calculateAngularAcceleration();
    this.angularSpeed = this.newValue(this.angularSpeed, delta, angleAcceleration);
    this.realPosition.setAngle(this.newValue(this.realPosition.angle, delta, this.angularSpeed));

    if(this.name == 'earth')
    {
      console.log(this.position);
      console.log(this.realPosition);
    }
  }
}
