var bg = '#fff';

var discs = [],
  gravity = 0.5,
  restitution = 0.675;

discs.push({
  x: 210,
  y: 245,
  oldx: 200,
  oldy: 240,
  r: 15,
  fill: 'rgb(0,0,255)',
  options: {
    
  }
});
discs.push({
  x: 200,
  y: 50,
  oldx: 215,
  oldy: 57,
  r: 10,
  fill: 'rgb(255,255,0)',
  options: {
    
  }
});
discs.push({
  x: 175,
  y: 10,
  oldx: 160,
  oldy: 10,
  r: 5,
  fill: 'rgb(255,0,0)',
  options: {
    
  }
});

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  updateDiscs();
  checkCircleCollision();
  constrainDiscs();
  renderDiscs();
}

function mouseReleased() {
  addDisc();
}

function addDisc() {
  discs.push({
    x: mouseX,
    y: mouseY,
    oldx: pmouseX,
    oldy: pmouseY,
    r: 10,
    fill: '#000',
    options: {
      
    }
  });
}

function updateDiscs() {
  for(var i=0; i < discs.length; i++) {
    var d = discs[i];
    if(d.options.freeze !== true) {
      vx = d.x - d.oldx,
        vy = d.y - d.oldy;
      
      d.oldx = d.x;
      d.oldy = d.y;
      d.x += vx;
      d.y += vy;
      d.y += gravity;
    }
  }
}

function constrainDiscs() {
  for(var i=0; i < discs.length; i++) {
    var d = discs[i];
    
    if(d.options.freeze !== true) {
      vx = d.x - d.oldx,
        vy = d.y - d.oldy;
      
      //boundary collisions
      if(d.x+d.r > width) {
        d.x = width-d.r;
        d.oldx = d.x + vx * restitution;
      }
      if(d.x-d.r < 0) {
        d.x = 0+d.r;
        d.oldx = d.x + vx * restitution;
      }
      if(d.y+d.r > height) {
        d.y = height-d.r;
        d.oldy = d.y + vy *  restitution;
      }
      if(d.y-d.r < 0) {
        d.y = 0+d.r;
        d.oldy = d.y + vy * restitution;
      }
    }
  }
}


/*function solveCollision(a, b) {
  var pointOfContactX = (a.r*a.x + b.r*b.x)/(a.r+b.r),
    pointOfContactY = (a.r*a.y + b.r*b.y)/(a.r+b.r);
  
  var n = 0;
  
  if(n === 0) {
    discs.push({
      x: pointOfContactX,
      y: pointOfContactY,
      oldx: pointOfContactX,
      oldy: pointOfContactY,
      r: 5,
      fill: 0,
      options: {
        freeze: 1
      }
    });
    n = 1;
  }
  
  ellipse(pointOfContactX, pointOfContactY, 100);
}*/

function checkCircleCollision() {
  for(var i=0; i < discs.length; i++) {
    for(var j=0; j < discs.length; j++) {
      var d0 = discs[i];
      var d1 = discs[j];
      if(i == j) {
        continue;
      }
      var distance = Math.pow(d1.x-d0.x, 2)+Math.pow(d1.y-d0.y, 2);
      if(distance <= Math.pow(d0.r+d1.r, 2)) {
        //solveCollision(d0, d1);
        d0.options.freeze = true;
        d1.options.freeze = true;
        
        var angle = -Math.atan2(d1.y - d0.y, d1.x - d0.x);
        
      }
    }
  }
}

function renderDiscs() {
  background(bg);
  for(var i=0; i < discs.length; i++) {
    var d = discs[i];
    fill(d.fill);
    ellipse(d.x, d.y, d.r*2);
  }
}

function magnitude(v) {
  return Math.sqrt(Math.pow(v.x - v.oldx, 2)+Math.pow(v.y - v.oldy, 2));
}