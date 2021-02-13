import { Octave} from './octave';
import { Note } from './note';

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
    this.totalOctaves = 7;

    this.data = data;
    this.instrument = null;
    this.trackNumber = null;
    this.notes = [];
  }

  init(){
    this.initProps();
    this.initGroup();
    //this.drawOutline();
    this.initNotes();
    this.initOctaves();
  }

  initProps(){
    console.log('this.instrument: ', this.data.instrument)
    this.instrument = this.data.instrument;
    this.trackNumber = this.data.channelNumber;
  }

  initNotes() {
      for (const note of this.data.notes) {
        const n = new Note(this.instrument, this.trackNumber, note.name, note.midi, note.time, note.velocity, note.duration);
        this.notes.push(n);
      }
      console.log(`total notes for ${this.instrument}: ${this.notes.length}`)
  }

  addNotes(data){
    for (const note of data.notes) {
      const n = new Note(this.instrument, this.trackNumber, note.name, note.midi, note.time, note.velocity, note.duration);
      this.notes.push(n);
    }
  }

  initGroup(){
    this.group = document.createElementNS(this.ns, "g");
    this.group.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    this.svg.appendChild(this.group);
  }

  positionTrack(x, y){
    this.x = x;
    this.y = y;
    this.group.setAttribute("transform", `translate(${this.x}, ${this.y})`);
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
      const x = i * this.h;
      const octave = new Octave(x, this.h, this.h, this.group);
      octave.init();
      this.octaves.push(octave)
    }
  }

  playNote(octave, noteNum, noteDuration){
    this.octaves[octave].playNote(noteNum, noteDuration)
  }

  playNotes(){
    console.log('PLAY NOTES')
    for(let [index, note] of this.notes.entries()){
      
      const t = note.time;
      const octave = note.octave;
      const noteNumber = note.noteNumber;
      const duration = note.duration/100;
      setTimeout(() => {
        if(note.instrument == "standard kit") console.log('standard kit');
        this.playNote(octave, noteNumber, duration)
      }, t);
    }
    
  }
}