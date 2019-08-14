var bg = '#fff';

var discs = [],
  gravity = 0.5,
  restitution = 0.8;

/*for(var i=0; i < 10; i++) {
  var mass = Math.random()*10;
  
  discs.push({
    x: 400*Math.random(),
    y: 500*Math.random(),
    velocity: {
      x: Math.random(),
      y: Math.random()
    },
    mass: 1,
    radius: 10,
    fill: '#000000',
    options: {
      
    }
  });
}*/

discs.push({
  x: 50,
  y: 200,
  velocity: {
    x: 1,
    y: 0
  },
  mass: 1,
  radius: 10,
  fill: '#f00000',
  options: {
    
  }
});
discs.push({
  x: 300,
  y: 200,
  velocity: {
    x: -0.5,
    y: 0
  },
  mass: 1,
  radius: 10,
  fill: '#f00000',
  options: {
    
  }
});

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  solveCollisions();
  updateDiscs();
  solveConstraints();
  
  renderDiscs();
}