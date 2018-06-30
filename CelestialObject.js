import { Vector2 } from './Vector2.js';

export const GRAVITATIONAL =  6.67428e-11;

export class CelestialObject
{
  constructor(name, radius, color, scaleFactor, mass, velocity, position)
  {
    this.name = name;
    this.radius = radius;
    this.scaleFactor = scaleFactor;
    this.color = color;
    this.mass = mass;
    this.velocity = velocity
    this.position = position;
  }

  //use newton universal law of gravitation
  //https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation
  attraction(star)
  {
    let distance = star.position.sub(this.position);
    let scalarDistance = distance.length;

    if(scalarDistance == 0)
    {
      console.log("Collision, error");
    }

    let scalarForce = GRAVITATIONAL * this.mass * star.mass / (scalarDistance*scalarDistance);

    return new Vector2(scalarForce, distance.angle, true);
  }

  draw(context)
  {
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.position.x*this.scaleFactor, this.position.y*this.scaleFactor, this.radius , 0, 2 * Math.PI); // x, y, radius, angle start, angle end
    context.fillStyle = this.color;
    context.fill();

    context.fillStyle = this.color;
  }

  updatePosition(timestep)
  {
    this.position = this.position.add(new Vector2(this.velocity.x*timestep, this.velocity.y*timestep));
  }
}
