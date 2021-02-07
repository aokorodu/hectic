export class Note{
  constructor(instrument, instrumentNumber, name, midi, time, vel, duration){
    this.instrument = instrument;
    this.instrumentNumber = instrumentNumber;
    this.name = name;
    this.time = Math.round(time*1000);
    this.midi = midi;
    this.velocity = vel;
    this.duration = Math.round(duration*1000);;
  }
}