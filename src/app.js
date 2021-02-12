import { Ball } from './ball';
import { PVector } from './pvector';
import { allnotes } from './notes';
import { Note } from './note';
import { Track } from './track';
import { Howl, Howler } from 'howler';


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
    this.lowG = new PVector(0, .1);
    this.gravity = this.lowG;

    this.trackData = [];
    this.tracks = [];
    this.notes = [];

    this.startButton = document.querySelector("#start-button");
  }

  init() {
    this.initTracks();
    this.initNotes();
    this.buildParticles();




    //
    this.draw();
    this.initHowler();


    // for (const button of this.navButtons) {
    //   button.addEventListener("click", (e) => {
    //     this.changeMode(button.getValue());
    //     this.activateSelectedButton(button);
    //   })
    // }
  }

  initTracks() {
    this.trackData = allnotes.tracks;
    console.log('tracks length: ', this.trackData.length)
    const num = this.trackData.length;
    for (let [i, trackData] of this.trackData.entries()) {
      const incr = this.h / num;
      const track = new Track(0, i * incr, this.w, this.h / num, this.particleSVG, trackData)
      track.init();
      this.tracks.push(track);
    }

  }

  initHowler() {
    const sound = new Howl({
      src: ['./audio/HECTIC_KAI_SONG.MP3'],
      onplay: () => {
        console.log('song playing')
        this.launchParticles();
      }
    });

    this.startButton.addEventListener("click", () => {
      sound.play();

    })


  }

  launchParticles() {
    for (let note of this.notes) {
      const t = note.time;
      //this.launchParticle(note);
    }

    for(let track of this.tracks){
      track.playNotes();
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



  initNotes() {
    const instruments = [];
    for (const track of this.trackData) {
      for (const note of track.notes) {
        instruments.push(track.instrument);
        const n = new Note(track.instrument, track.instrumentNumber, note.name, note.midi, note.time, note.velocity, note.duration);
        this.notes.push(n);
      }
    }
    const set = new Set(instruments)
    console.log('instruments: ', set);
  }

  buildParticles() {
    for (let i = 0; i < this.totalParticles; i++) {
      const x = this.w / 2;
      const y = this.h;
      const b = new Ball(x, y, 10);
      b.init(this.particleSVG, this.w, this.h);
      this.particles.push(b);
    }
  }

  getParticle() {
    return this.particles.find((particle) => {
      return !particle.active;
    })
  }

  launchParticle(note) {
    const t = note.time;
    setTimeout(() => {
      const b = this.getParticle();
      if (b == undefined) return;
      b.repaint(note);
      b.move(new PVector(0, -10));
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