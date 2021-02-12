export class Note {
  constructor(instrument, instrumentNumber, name, midi, time, vel, duration) {
    this.instrument = instrument;
    this.instrumentNumber = instrumentNumber;
    this.instrumentPosition = this.getInstrumentPosition(instrument);
    this.name = name;
    this.time = Math.round(time * 1000);
    this.midi = midi;
    this.velocity = vel;
    this.duration = Math.round(duration * 1000);
    
    this.noteNumber = this.getNoteNumber(this.name.slice(0, -1));
    this.octave = parseInt(this.name.split("").pop());
  }

  getNoteNumber(str) {
    return {
      "A": 0,
      "A#": 1,
      "B": 2,
      "C": 3,
      "C#": 4,
      "D": 5,
      "D#": 6,
      "E": 7,
      "F": 8,
      "F#": 9,
      "G": 10,
      "G#": 11
    }[str]
  }

  getInstrumentPosition(selection) {
    return {
      "acoustic grand piano": 0,
      "lead 1 (square)": 1,
      "fx 4 (atmosphere)": 2,
      "lead 3 (calliope)": 3,
      "lead 2 (sawtooth)": 4,
      "lead 8 (bass + lead)": 5,
      "xylophone": 6,
      "undefined": 7,
      "standard kit": 8,
      "electric guitar (jazz)": 9
    }[selection]
  }
}

