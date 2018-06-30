import { Vector2 } from './Vector2.js';
import { CelestialObject, GRAVITATIONAL } from './CelestialObject.js';

export class Simulation
{
  constructor(canvas, daysPerFrame, pixelsPerAU)
  {
    this.listObject = [];
    this.context = canvas.getContext('2d');
    this.frameRate = 1000/60;
    this.timestep = 86400 * daysPerFrame;
    this.isRunning = false;

    // https://www.google.com/search?channel=fs&q=gravitational+constant&ie=utf-8&oe=utf-8
    this.pixelsPerAU =  + parseInt(pixelsPerAU);
    this.AUinMeters = 1.49e11; //also distance earth -> sun
    this.scaleFactor = this.pixelsPerAU / this.AUinMeters;
    this.daysPassed = 0;

    let sunRadius = 695508;

    // informations : https://wikipedia.org and http://www.enchantedlearning.com/subjects/astronomy/planets/
    this.addObject(new CelestialObject('Sun', 10, 'yellow', this.scaleFactor, 1.989e30, new Vector2(0,0), new Vector2(0,0)));
    this.addObject(new CelestialObject('Mercury', 3, 'gray', this.scaleFactor, 3.3011e23, new Vector2(0,-47362), new Vector2(0.39*this.AUinMeters,0)));
    this.addObject(new CelestialObject('Venus', 6, 'brown', this.scaleFactor, 4.867e24, new Vector2(0,-35020), new Vector2(0.723*this.AUinMeters, 0)));
    this.addObject(new CelestialObject('Earth', 7, 'blue', this.scaleFactor, 5.972e24, new Vector2(0,-29783), new Vector2(1*this.AUinMeters,0)));
    this.addObject(new CelestialObject('Mars', 5, 'red', this.scaleFactor, 6.39e23, new Vector2(0,-24007), new Vector2(1.524*this.AUinMeters,0)));
    this.addObject(new CelestialObject('Jupiter', 20, '#FFE4C4', this.scaleFactor, 1.898e27, new Vector2(0,-13070), new Vector2(5.203*this.AUinMeters,0)));
    this.addObject(new CelestialObject('Saturn', 20, '#DEB887', this.scaleFactor, 5.6834e26, new Vector2(0,-9680), new Vector2(9.539*this.AUinMeters,0)));
    this.addObject(new CelestialObject('Uranus', 11, '#87CEEB', this.scaleFactor, 8.681e25, new Vector2(0,-6800), new Vector2(19.18*this.AUinMeters,0)));
    this.addObject(new CelestialObject('Neptune', 10, '#1e97ed', this.scaleFactor, 1.024e26, new Vector2(0,-5430), new Vector2(39.53*this.AUinMeters,0)));

    this.draw();
  }

  draw()
  {
    this.context.fillStyle = '#000';
    this.context.fillRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.context.translate(this.context.canvas.width / 2, this.context.canvas.height / 2);
    this.context.scale(1, -1);

    // draw all the planet
    for(let i = 0; i < this.listObject.length; i++)
    {
      this.listObject[i].draw(this.context);
    }

    this.context.resetTransform();

    this.drawInfos();
  }

  drawInfos()
  {
    const FONT_SIZE = 20;
    const POS_X = 50;
    let posY = 50;

    // draw days past
    this.context.font = `${FONT_SIZE}px Arial`;
    this.context.fillStyle = 'white';
    this.context.fillText(`${this.daysPassed} days passed`,POS_X, posY);

    // draw planet name
    for(let i = 0; i < this.listObject.length; i++)
    {
      posY += FONT_SIZE;
      this.context.fillStyle = this.listObject[i].color;
      this.context.fillText(this.listObject[i].name,POS_X, posY);
    }

    // draw the scale
    posY += FONT_SIZE;
    this.context.fillStyle = 'white';
    this.context.fillText("scale : ", POS_X, posY);

    posY += FONT_SIZE;
    this.context.fillText("1 AU", POS_X + this.pixelsPerAU + 10, posY);

    // draw the line for the scale
    this.context.strokeStyle = 'white';
    posY -= 5;

    this.context.beginPath();
    this.context.moveTo(POS_X, posY);
    this.context.lineTo(POS_X + this.pixelsPerAU, posY);
    this.context.lineWidth = 1;
    this.context.stroke();

    this.context.fillStyle = 'black';
  }

  step()
  {
    let totalForces = [];

    // calculate all the forces in the solar system
    for(let i = 0; i < this.listObject.length; i++)
    {
      let totalForce = new Vector2(0,0);
      let planet = this.listObject[i];

      // add a force for each other object in the system
      for(let j = 0; j < this.listObject.length; j++)
      {
        if(planet != this.listObject[j])
        {
          totalForce = totalForce.add(planet.attraction(this.listObject[j]));
        }
      }

      //totalForce of each planet must be in the same order as planet in the array
      totalForces.push(totalForce);
    }

    // makes the planets moves with the velocity and force
    for(let i = 0; i < totalForces.length; i++)
    {
      let vX = totalForces[i].x / this.listObject[i].mass * this.timestep;
      let vY = totalForces[i].y / this.listObject[i].mass * this.timestep;
      this.listObject[i].velocity = this.listObject[i].velocity.add(new Vector2(vX, vY));
      this.listObject[i].updatePosition(this.timestep);
    }

    this.daysPassed += (this.timestep/86400);
  }

  //start the simulation
  start()
  {
    if(!this.isRunning)
    {
      this.isRunning = true;
      this.timer = window.setInterval(
        () => {
          this.step();
          this.draw();
        }, this.frameRate);
    }
  }

  //stop the simulation
  stop()
  {
    if(this.timer !== undefined && this.isRunning)
    {
      this.isRunning = false;
      window.clearInterval(this.timer);
    }
  }

  addObject(planet)
  {
    this.listObject.push(planet);
  }
}
