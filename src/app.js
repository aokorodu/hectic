import { Ball } from './ball';
import { PVector } from './pvector';
import { allnotes } from './notes';
import { Note } from './note';

export class App {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.count = 0;
    this.particleSVG = document.getElementById("particles");
    this.totalParticles = 100;
    this.particles = [];
    this.zeroG = new PVector(0, 0);
    this.oneG = new PVector(0, 1);
    this.twoG = new PVector(0, 2);
    this.lowG = new PVector(0, .5);
    this.gravity = this.oneG;

    this.tracks = [];
    this.notes = [];    
  }

  init() {
    this.initTracks();
    this.initNotes();
    this.buildParticles();
    this.draw();
    this.launchParticles();

    
    // for (const button of this.navButtons) {
    //   button.addEventListener("click", (e) => {
    //     this.changeMode(button.getValue());
    //     this.activateSelectedButton(button);
    //   })
    // }
  }

  launchParticles(){
    for(let note of this.notes){
      const t = note.time;
      this.launchParticle(note);
    }
  }

  // activateSelectedButton(target) {
  //   for (const button of this.navButtons) {
  //     if (button == target) {
  //       console.log('clicked button is ', button.getValue())
  //       button.activate(true);
  //     } else {
  //       button.activate(false)
  //     }
  //   }
  // }

  // changeMode(newMode) {
  //   switch (newMode) {
  //     case "float":
  //       this.updateParticlesMode("float");
  //       this.gravity = this.zeroG;
  //       break;

  //     case "orbit":
  //       this.updateParticlesMode("orbit");
  //       this.gravity = this.zeroG;
  //       break;

  //     case "drop":
  //       this.updateParticlesMode("drop");
  //       this.gravity = this.oneG;
  //       break;

  //     case "flow":
  //       this.updateParticlesMode("flow");
  //       this.gravity = this.lowG;
  //       break;

  //     case "spin":
  //       this.updateParticlesMode("spin");
  //       this.gravity = this.zeroG;
  //       break;
  //   }
  // }

  // updateParticlesMode(newMode) {
  //   for (let i = 0; i < this.totalParticles; i++) {
  //     this.particles[i].changeMode(newMode);
  //   }
  // }

  initTracks(){
    this.tracks = allnotes.tracks;
  }

  initNotes(){
    for(const track of this.tracks){
      for(const note of track.notes){
        const n = new Note(track.instrument, track.instrumentNumber, note.name, note.midi, note.time, note.velocity, note.duration);
        if(n.duration > 136) console.log('duration', n.duration);
        this.notes.push(n);
      }
    }
  }

  buildParticles() {
    for (let i = 0; i < this.totalParticles; i++) {
      const x = this.w/2;
      const y = this.h;
      const b = new Ball(x, y, 10);
      b.init(this.particleSVG, this.w, this.h);
      this.particles.push(b);
    }
  }

  getParticle(){
    return this.particles.find((particle)=>{
      return !particle.active;
    })
  }

  launchParticle(note){
    const t = note.time;
    setTimeout(() => {
      const b = this.getParticle();
      b.repaint(note);
      b.move(new PVector(0, -40));
    }, t);
  }

  

  draw() {
    for (const particle of this.particles) {
      particle.move(this.gravity);
      particle.update();
    }
    window.requestAnimationFrame(() => { this.draw() }, 1);
  }
}