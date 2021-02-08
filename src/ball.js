import { PVector } from "./pvector";

export class Ball {
  constructor(x, y, r) {
    this.origin = new PVector(x, y);
    this.location = new PVector(x, y);
    this.velocity = new PVector(Math.random() * 4 - 2, Math.random() * 2 - 1);
    this.accel = new PVector(0, 0);
    this.maxX;
    this.maxY
    this.cx = this.location.x;
    this.cy = this.location.y;
    this.r = 10 + Math.ceil(Math.random() * 10);
    this.defaultR = this.r;
    this.opacity = this.r / this.r/2;
    this.circle;
    this.fill = "#ffffff";
    this.stroke = "#ffffff";
    this.strokeWidth = 2;
    this.ns = "http://www.w3.org/2000/svg";
    this.mode = "flow";
    this.friction = .95 + Math.random() * .045;
    this.orbitTarget = new PVector(250, 125);
    this.spinAngle = 0;
    this.spinning = false;
    this.spinDx = 0;
    this.spinSpeed = 0.03; //Math.random() * .03 + 0.01;
    this.spinRadius = 0;

    this.active = false;
  }

  init(svg, maxX, maxY) {
    this.setBounds(maxX, maxY)
    this.buildCircle(svg);
  }

  setBounds(maxX, maxY) {
    this.maxX = maxX - this.r
    this.maxY = maxY + this.r;
  }

  buildCircle(svg) {
    const randColor = `rgb(${this.randomColor()}, ${this.randomColor()}, ${this.randomColor()})`;
    this.circle = document.createElementNS(this.ns, "circle");
    this.circle.setAttribute("cx", this.cx);
    this.circle.setAttribute("cy", this.cy);
    this.circle.setAttribute("r", this.r);
    this.circle.setAttribute("fill", '#ffffff');
    this.circle.setAttribute("fill-opacity", this.opacity);
    //this.circle.setAttribute("stroke", this.stroke);
    //this.circle.setAttribute("stroke-width", this.strokeWidth);
    svg.appendChild(this.circle);
  }

  randomColor() {
    return Math.round(Math.random() * 255)
  }

  repaint(n){
    const duration = n.duration;
    const num = n.midi; // 1-100;
    const instrNum = n.instrumentNumber
    this.location.x = 400 + instrNum*2;
    
    this.circle.setAttribute("fill", `hsl(${num}, 100%, 59%)`);
    this.r = duration/2727 * 100;
    if(this.r < 10) this.r = 10;
    this.circle.setAttribute("r", this.r);
  }

  move(newForce) {
    this.active = true;

    this.accel.add(newForce);
    this.velocity.add(this.accel);
    this.location.add(this.velocity);
    this.accel = new PVector(0, 0);
  }

  draw() {
    this.circle.setAttribute("cx", this.location.x);
    this.circle.setAttribute("cy", this.location.y);
  }

  changeMode(newMode) {
    if (newMode == this.mode) return;

    this.mode = newMode;
    if (this.mode == "float") {
      this.velocity = new PVector(Math.random() * 1 - .5, Math.random() * 2);
    } else if (this.mode == "bounce") {
      this.velocity = new PVector(this.velocity.x, Math.random() * 4 - 2);
    } else if (this.mode == "flow") {
      this.velocity = new PVector(this.velocity.x, Math.random() * 4 - 2);
    } else if(this.mode == "spin") {
      this.spinDx = this.location.x - 250;
      this.spinRadius = Math.abs(this.spinDx) + Math.abs(Math.random() * this.spinDx);
      this.spinAngle = Math.random() > .5 ? Math.acos(this.spinDx/this.spinRadius) : Math.PI*2 - Math.acos(this.spinDx/this.spinRadius);
      this.velocity = new PVector(0, 0);
    }
  }

  bounce() {
    if (this.location.x < this.r) {
      this.location.x = this.r;
      this.velocity.x *= -1;
    } else if (this.location.x > this.maxX) {
      this.location.x = this.maxX;
      this.velocity.x *= -1;
    }

    if (this.location.y > this.maxY) {
      this.location.y = this.maxY;
      this.velocity.y *= -1;
    } else if (this.location.y < this.r) {
      this.location.y = this.r;
      this.velocity.y *= -1;
    }

    if (this.mode != "drop") return;

    this.velocity.multiply(this.friction);
  }

  float() {
    if (this.velocity.y > 0) this.velocity.y *= -1;
    if (this.location.x < 0) {
      this.location.x = this.maxX;
    } else if (this.location.x > this.maxX) {
      this.location.x = 0;
    }

    if (this.location.y < 0) {
      this.location.y = this.maxY;
    } else if (this.location.y > 250) {
      this.location.y = this.maxY;
    }
  }

  flow() {
    if (this.location.y > this.maxY + this.r) {
      this.location.y = this.maxY + this.r;
      //this.location.x = this.maxX / 2;
      this.velocity = new PVector(0, 0);

      this.active = false;
    }
  }

  orbit() {
    const targetV = new PVector(250, 125);
    targetV.sub(this.location);
    targetV.normalize();
    targetV.multiply(.1);
    this.move(targetV);
    this.velocity.multiply(.999);
  }

  spin() {
    this.spinAngle += this.spinSpeed;
    if(this.spinAngle > 2*Math.PI) this.spinAngle -= (Math.PI * 2);
    const spinCos = Math.cos(this.spinAngle);
    this.location.x = 250 + spinCos * this.spinRadius;
    const newR = this.defaultR + this.defaultR/4 * Math.sin(this.spinAngle);
    this.circle.setAttribute("r", newR);
  }

  update() {
    if(!this.active) return;
    if (this.mode == "float") {
      this.float()
    } else if (this.mode == "orbit") {
      this.orbit()
    } else if (this.mode == "drop") {
      this.bounce()
    } else if (this.mode == "spin") {
      this.spin()
    }else {
      this.flow();
    }
    this.draw();
  }
}