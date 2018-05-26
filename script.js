import { Simulation } from './Simulation.js';

document.addEventListener('DOMContentLoaded', function(event) {
  let canvas = document.getElementById('Simulation');
  let simulation = new Simulation(canvas);
  simulation.start();
  simulation.stop();
});
