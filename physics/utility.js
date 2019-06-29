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
    for(var j=0; j < discs.length; j++) {
      var d0 = discs[i];
      var d1 = discs[j];
      if(i == j) {
        continue;
      }
      var distance = Math.pow(d1.x-d0.x, 2)+Math.pow(d1.y-d0.y, 2);
      
      if (distance <= (d0.radius+d1.radius)*(d0.radius+d1.radius)) {
        
        var theta1 = Math.atan2(d0.y - d0.velocity.y, d0.x - d0.velocity.x);
        var theta2 = Math.atan2(d1.y - d1.velocity.y, d1.x - d1.velocity.x);
        var phi = Math.atan2(d1.y - d0.y, d1.x - d0.x);
        
        var m1 = d0.mass;
        var m2 = d1.mass;
        
        var v1 = Math.sqrt(Math.pow(d0.x-d0.velocity.x, 2)+Math.pow(d0.y - d0.velocity.y, 2));
        var v2 = Math.sqrt(Math.pow(d1.x-d1.velocity.x, 2)+Math.pow(d1.y - d1.velocity.y, 2));
        
        v1PrimeX = ((v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi))/(m1 + m2))*(Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + (Math.PI / 2)));
        v1PrimeY = ((v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi))/(m1 + m2))*(Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + (Math.PI / 2)));
        v2PrimeX = ((v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi))/(m1 + m2))*(Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + (Math.PI / 2)));
        v2PrimeY = ((v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi))/(m1 + m2))*(Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + (Math.PI / 2)));
        
        d0.velocity.x = v1PrimeX;
        d0.velocity.y = v1PrimeY;
        
        d1.velocity.x = v2PrimeX;
        d1.velocity.y = v2PrimeY;
      }
    }
  }
}

function renderDiscs() {
  //background(bg);
  for(var i=0; i < discs.length; i++) {
    var d = discs[i];
    fill(d.fill);
    ellipse(d.x, d.y, d.radius*2);
  }
}

function magnitude(v) {
  return Math.sqrt(Math.pow(v.x - v.oldx, 2)+Math.pow(v.y - v.oldy, 2));
}