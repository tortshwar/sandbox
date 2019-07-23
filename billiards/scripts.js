var bg = '#000';

var points = [],
  restitution = 1,
  gravity = 0.1;


points.push({
  x: -9,
  y: -60,
  oldx: -10,
  oldy: -61,
  r: 2.5,
  fill: '#ffa500'
});
points.push({
  x: -9,
  y: -60,
  oldx: -10,
  oldy: -60.999,
  r: 2.5,
  fill: '#ff2500'
});
points.push({
  x: -9,
  y: -60,
  oldx: -10,
  oldy: -60.998,
  r: 2.5,
  fill: '#005faa'
});
points.push({
  x: -9,
  y: -60,
  oldx: -10,
  oldy: -60.997,
  r: 2.5,
  fill: '#00ff5a'
});

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bg);
  translate(windowWidth/2, windowHeight/2);
  
  updatePoints();
  solveConstraints();
  renderBoundaries();
  renderPoints();
}

function updatePoints() {
  for(var i=0; i < points.length; i++) {
    var p = points[i],
      vx = p.x - p.oldx;
    vy = p.y - p.oldy;
    
    p.oldx = p.x;
    p.oldy = p.y;
    p.x += vx;
    p.y += vy;
    
    // gravity
    //p.y += gravity;
    
    stroke('#eee');
    
    // velocity vector visualization
    line(p.x, p.y, p.x+(20*vx), p.y+(20*vy));
  }
}

function solveConstraints() {
  for(var i=0; i < points.length; i++) {
    var r = 75;
    var h = 75;
    
    var p = points[i];
    vx = p.x - p.oldx;
    vy = p.y - p.oldy;
    
    var c1, c2, c3, c4, c5, c6;
    
    if(p.x < h + r) {
      c1 = 1;
    }
    else {
      c1 = 0;
    }
    if(Math.pow(p.x - h, 2) + Math.pow(p.y, 2) < Math.pow(r, 2)) {
      c2 = 1;
    }
    else {
      c2 = 0;
    }
    if(p.y > -r && p.y < r) {
      c3 = 1;
    }
    else {
      c3 = 0;
    }
    if(p.x > -h && p.x < h) {
      c4 = 1;
    }
    else {
      c4 = 0;
    }
    if(p.x > -h-r) {
      c5 = 1;
    }
    else {
      c5 = 0;
    }
    if(Math.pow(p.x + h, 2) + Math.pow(p.y, 2) < Math.pow(r, 2)) {
      c6 = 1;
    }
    else {
      c6 = 0;
    }
    
    if(c1*c2 + c3*c4 + c5*c6 === 0) {
      vx = p.x - p.oldx,
        vy = p.y - p.oldy;
      var vMag = Math.sqrt(Math.pow(p.x-vx,2)+Math.pow(p.y-vy,2));
      //console.log(vMag);
      
      var unitVx = vx/vMag;
      var unitVy = vy/vMag;
      
      var theta;
      
      if(theta < 0) {
        theta += 2*PI;
      }
      
      if(p.x > 0) {
        theta = Math.atan2(p.y, p.x - h);
      }
      else {
        theta = Math.atan2(p.y, p.x + h);
      }
      
      var unitNx, unitNy;
      
      if(p.x < 0) {
        unitNx = (r * Math.cos(theta))/(Math.sqrt(Math.pow(p.x + h, 2) + Math.pow(p.y, 2)));
        unitNy = (r * Math.sin(theta))/(Math.sqrt(Math.pow(p.x + h, 2) + Math.pow(p.y, 2)));
      }
      else {
        unitNx = (r * Math.cos(theta))/(Math.sqrt(Math.pow(p.x - h, 2) + Math.pow(p.y, 2)));
        unitNy = (r * Math.sin(theta))/(Math.sqrt(Math.pow(p.x - h, 2) + Math.pow(p.y, 2)));
      }
      
      //normal vector visualization
      //line(p.x, p.y, p.x-(20*unitNx), p.y-(20*unitNy));
      
      var d = unitNx*unitVx + unitNy*unitVy;
      
      var unitRx = 2*d*unitNx - unitVx;
      var unitRy = 2*d*unitNy - unitVy;
      
      if(p.y < -r) {
        p.y = -r;
        p.oldy = p.y + vy*restitution;
      }
      else if(p.y > r) {
        p.y = r;
        p.oldy = p.y + vy*restitution;
      }
      
      if(p.x < -h) {
        p.x = (r * Math.cos(theta)) - h;
        p.y = r * Math.sin(theta);
        p.oldx = p.x + (unitRx*vMag*restitution);
        p.oldy = p.y + (unitRy*vMag*restitution);
      }
      else if(p.x > h) {
        p.x = (r * Math.cos(theta)) + h;
        p.y = r * Math.sin(theta);
        p.oldx = p.x + (unitRx*vMag*restitution);
        p.oldy = p.y + (unitRy*vMag*restitution);
      }
    }
  }
}

function renderBoundaries() {
  noFill();
  stroke('#eee');
  var r = 75;
  var h = r;
  arc(h, 0, r*2, r*2, PI + PI/2, PI/2, OPEN);
  line(-h, r, h, r);
  line(-h, -r, h, -r);
  arc(-h, 0, r*2, r*2, PI/2, PI + PI/2, OPEN);
}

function renderPoints() {
  for(var i=0; i < points.length; i++) {
    var p = points[i];
    noStroke();
    fill(p.fill);
    ellipse(p.x, p.y, p.r*2);
  }
}