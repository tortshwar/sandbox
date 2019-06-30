var bg = '#333';

var points = [],
  links = [],
  gravity = 0.5,
  restitution = 0.675;

points.push({
  x: 200,
  y: 100,
  oldx: 210,
  oldy: 100,
  r: 10,
  fill: '#fff',
  options: {
    
  }
});
points.push({
  x: 200,
  y: 200,
  oldx: 195,
  oldy: 210,
  r: 10,
  sim: 1,
  fill: '#fff',
  options: {
    
  }
});
points.push({
  x: 175,
  y: 600,
  oldx: 175,
  oldy: 600,
  r: 10,
  sim: 0,
  fill: 0,
  options: {
    freeze: 1
  }
});

links.push({
  p0: points[0],
  p1: points[1],
  length: distance(points[0], points[1])
});

function distance(p0, p1) {
  var dx = p1.x - p0.x,
    dy = p1.y - p0.y;
  return Math.sqrt(dx*dx + dy*dy);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  updatePoints();
  updateLinks();
  constrainPoints();
  renderLinks();
}

function updatePoints() {
  for(var i=0; i < points.length; i++) {
    var p = points[i];
    if(!p.options.hasOwnProperty('freeze')) {
      vx = p.x - p.oldx,
        vy = p.y - p.oldy;
      
      p.oldx = p.x;
      p.oldy = p.y;
      p.x += vx;
      p.y += vy;
      p.y += gravity;
    }
  }
}

function updateLinks() {
  for(var i=0; i < links.length; i++) {
    var l = links[i],
      dx = l.p1.x - l.p0.x,
      dy = l.p1.y - l.p0.y,
      distance = Math.sqrt(dx*dx + dy*dy),
      difference = l.length - distance,
      percent = difference / distance / 2,
      offsetX = dx * percent,
      offsetY = dy * percent;
    
    l.p0.x -= offsetX;
    l.p0.y -= offsetY;
    l.p1.x += offsetX;
    l.p1.y += offsetY;
  }
}

function constrainPoints() {
  for(var i=0; i < points.length; i++) {
    var p = points[i];
    
    if(!p.options.hasOwnProperty('freeze')) {
      vx = p.x - p.oldx,
        vy = p.y - p.oldy;
      
      //boundary collisions
      if(p.x > width) {
        p.x = width-p.r;
        p.oldx = p.x + vx * restitution;
      }
      if(p.x < 0) {
        p.x = p.r;
        p.oldx = p.x + vx * restitution;
      }
      if(p.y > height) {
        p.y = height-p.r;
        p.oldy = p.y + vy *  restitution;
      }
      if(p.y < 0) {
        p.y = p.r;
        p.oldy = p.y + vy * restitution;
      }
    }
  }
}

/*function renderPoints() {
  background(bg);
  for(var i=0; i < points.length; i++) {
    var p = points[i];
    fill(p.fill);
  }
}*/

function renderLinks() {
  background(bg);
  for(var i=0; i < links.length; i++) {
    var l = links[i];
    line();
  }
  stroke();
}