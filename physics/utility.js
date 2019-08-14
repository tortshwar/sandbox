function updateDiscs() {
  for(var i=0; i < discs.length; i++) {
    var d = discs[i];
    if(d.options.freeze !== true) {
      d.x += d.velocity.x;
      d.y += d.velocity.y;
      d.velocity.y += gravity;
    }
  }
}

function solveConstraints() {
  for(var i=0; i < discs.length; i++) {
    var d = discs[i];
    
    if(d.options.freeze !== true) {
      var radius = d.radius;
      
      //boundary collisions
      if(d.x+radius > width) {
        d.x = width - radius;
        d.velocity.x = -d.velocity.x * restitution;
      }
      if(d.x-radius < 0) {
        d.x = 0 + radius;
        d.velocity.x = -d.velocity.x * restitution;
      }
      if(d.y+radius > height) {
        d.y = height - radius;
        d.velocity.y = -d.velocity.y * restitution;
      }
      if(d.y-radius < 0) {
        d.y = 0 + radius;
        d.velocity.y = -d.velocity.y * restitution;
      }
    }
  }
}


function solveCollisions() {
  for(var i=0; i < discs.length; i++) {
    for(var j=i+1; j < discs.length; j++) {
      var d0 = discs[i];
      var d1 = discs[j];
      if(i == j) {
        continue;
      }
      var distance = Math.pow(d1.x-d0.x, 2)+Math.pow(d1.y-d0.y, 2);
      var dist = Math.sqrt(Math.pow(d1.x-d0.x, 2)+Math.pow(d1.y-d0.y, 2));
      
      if (distance <= (d0.radius+d1.radius)*(d0.radius+d1.radius)) {
        
        var cVX = (d1.x - d0.x)/dist;
        var cVY = (d1.y - d0.y)/dist;
        var overlapX = (dist - (d0.radius + d1.radius))*cVX;
        var overlapY = (dist - (d0.radius + d1.radius))*cVY;
        
        d0.x = d0.x + (overlapX/2);
        d0.y = d0.y + (overlapY/2);
        d1.x = d1.x - (overlapX/2);
        d1.y = d1.y - (overlapY/2);
        
        var m1 = d0.mass;
        var m2 = d1.mass;
        
        var nx = (d1.x - d0.x) / dist;
        var ny = (d1.y - d0.y) / dist;
        
        var p = 2 * (d0.velocity.x* nx + d0.velocity.y * ny - d1.velocity.x * nx + d1.velocity.y * ny) / (m1 + m2);
        
        d0.velocity.x = d0.velocity.x - p * m1 * nx;
        d0.velocity.y = d0.velocity.y - p * m1 * ny;
        d1.velocity.x = d1.velocity.x + p * m2 * nx;
        d1.velocity.y = d1.velocity.y + p * m2 * ny;
      }
    }
  }
}

function renderDiscs() {
  background(bg);
  for(var i=0; i < discs.length; i++) {
    var d = discs[i];
    fill(d.fill);
    ellipse(d.x, d.y, d.radius*2);
  }
}

function magnitude(v) {
  return Math.sqrt(Math.pow(v.x - v.oldx, 2)+Math.pow(v.y - v.oldy, 2));
}