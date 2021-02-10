import { Octave} from './octave';

export class Track {
  constructor(x, y, w, h, svg, data){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.group = null;
    this.svg = svg;
    this.outline = null;
    this.ns = "http://www.w3.org/2000/svg";

    this.octaves = [];
    this.totalOctaves = 6;

    this.data = data;
    console.log(this.data.notes)
  }

  init(){
    this.initGroup();
    this.drawOutline();
    this.initOctaves();
  }

  initGroup(){
    this.group = document.createElementNS(this.ns, "g");
    this.group.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    this.svg.appendChild(this.group);
  }

  drawOutline(){
    this.outline = document.createElementNS(this.ns, "rect");
    this.outline.setAttribute("x", 0);
    this.outline.setAttribute("y", 0);
    this.outline.setAttribute("width", this.w);
    this.outline.setAttribute("height", this.h);
    this.outline.setAttribute("stroke", '#ffffff');
    this.group.appendChild(this.outline);
  }

  initOctaves(){
    const incr = this.w/this.totalOctaves;
    for(let i = 0; i < this.totalOctaves; i++){
      console.log(i);
      const x = i * incr;
      const octave = new Octave(x, incr, this.h, this.group);
      octave.init();
      this.octaves.push(octave)
    }
  }
}