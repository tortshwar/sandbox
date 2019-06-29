var bg = '#fff';

var discs = [],
  gravity = 0.5,
  restitution = 0.675;

discs.push({
  x: 300,
  y: 100,
  velocity: {
    x: 0,
    y: 0
  },
  mass: 1,
  radius: 15,
  fill: 'rgb(0,0,255)',
  options: {
    
  }
});
discs.push({
  x: 100,
  y: 100,
  velocity: {
    x: 2,
    y: 0
  },
  mass: 2,
  radius: 30,
  fill: 'rgb(255,255,0)',
  options: {
    
  }
});

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  updateDiscs();
  solveConstraints();
  solveCollisions();
  renderDiscs();
}