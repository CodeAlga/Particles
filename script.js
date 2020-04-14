const particles = [];

function setup() {
  // This function is called only once

  createCanvas(window.innerWidth, window.innerHeight);

  // Define the lenght of the particle array depending on the viewport size
  const particlesLenght = Math.floor(window.innerWidth / 5);
  arrayLength = particlesLenght;

  for (let i = 0, len = particlesLenght; i < len; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // This function is called permanently unless specified
  background(23, 63, 90);
  particles.forEach((p, i) => {
    p.update();
    p.drawParticle();
    p.checkParticles(particles.slice(i));
  });

  // console.log(connected);
}

class Particle {
  constructor() {
    // Position
    // Vector -> entity with X & Y positons,
    // in this case width & height of the window taken automatically
    this.pos = createVector(random(width), random(height));

    // Size
    this.size = random(1, 8);

    // Velocity
    this.slowVel = createVector(random(-1, 1), random(-1, 1));
    this.fastVel = createVector(random(-10, 10), random(-10, 10));
  }

  // Updated movement by adding velocity to it
  update() {
    if (mouseIsPressed) {
      this.pos.add(this.fastVel);
    } else {
      this.pos.add(this.slowVel);
    }
    this.edges();

    //console.log(connected);
  }

  // Drawing each particle
  drawParticle() {
    noStroke();
    if (mouseIsPressed) {
      fill("rgba(150,50,50,0.9)");
    } else {
      fill("rgba(200,200,200,0.7)");
    }
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Dectecting the end of the canvas
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.fastVel.x *= -1;
      this.slowVel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.fastVel.y *= -1;
      this.slowVel.y *= -1;
    }
  }

  // Connecting particles
  checkParticles(particles) {
    particles.forEach((p) => {
      const d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);

      if (d < 100) {
        stroke("rgba(255, 255, 255, 0.1)");
        line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      }
    });
  }
}
