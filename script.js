import { Simulation } from './Simulation.js';

var simulation = undefined;

function startSimulation()
{
  if(simulation !== undefined)
  {
    simulation.start();
  }
}

function stopSimulation()
{
  if(simulation !== undefined)
  {
    simulation.stop();
  }
}

function resetSimulation()
{
  setCanvasSize();
  if(simulation !== undefined)
  {
    simulation.stop();
  }
  simulation = new Simulation(document.getElementById('Simulation'), document.getElementById('daysFrame').value, document.getElementById('pixelsPerAU').value);
}

function setCanvasSize()
{
  document.getElementById('Simulation').width = document.getElementById('widthCanvas').value;
  document.getElementById('Simulation').height = document.getElementById('heightCanvas').value;
}

document.addEventListener('DOMContentLoaded', function(event) {
  document.getElementById("btnStart").addEventListener('click', startSimulation, false);
  document.getElementById("btnStop").addEventListener('click', stopSimulation, false);
  document.getElementById("btnReset").addEventListener('click', resetSimulation, false);
  document.getElementById("btnConfigure").addEventListener('click', resetSimulation, false);

  setCanvasSize();

  resetSimulation();
});
