export class Vector2
{
  constructor(arg1, arg2, isPolar = false)
  {
    if(!isPolar)
    {
      this.x = arg1;
      this.y = arg2;

      this.computePolarVector();
    }
    else
    {
      this.length = arg1;
      this.angle = arg2;

      this.computeCartesianVector();
    }

  }

  computePolarVector()
  {
    this.length = Math.sqrt(this.x*this.x + this.y*this.y);
    this.angle = Math.atan2(this.y, this.x)
  }

  computeCartesianVector()
  {
    this.x = this.length * Math.cos(this.angle);
    this.y = this.length * Math.sin(this.angle);
  }

  setX(x)
  {
    this.x = x;
    this.computePolarVector();
  }

  setY(y)
  {
    this.y = y;
    this.computePolarVector();
  }

  setAngle(angle)
  {
    this.angle = angle;
    this.computeCartesianVector();
  }

  setLength(length)
  {
    this.length = length;
    this.computeCartesianVector();
  }

  add(vect)
  {
    return new Vector2(this.x + vect.x, this.y + vect.y);
  }

  sub(vect)
  {
    vect = vect.multConstant(-1);
    return new Vector2(vect.x + this.x, vect.y + this.y);
  }

  multConstant(constant)
  {
    return new Vector2(this.x * constant, this.y * constant);
  }
}
