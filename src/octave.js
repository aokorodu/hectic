export class Octave{
  constructor(x, w, h, holder){
    this.x = x;
    this.w = w;
    this.h = h;
    this.group = null;
    this.holder = holder;
    this.outline = null;
    this.ns = "http://www.w3.org/2000/svg";
    this.totalNotes = 12;
    this.noteWidth = this.w/this.totalNotes;
    this.notes = [];
  }

  init(){
    this.initGroup();
    this.drawOutline();
    this.drawAllNotes();
  }

  initGroup(){
    this.group = document.createElementNS(this.ns, "g");
    this.group.setAttribute("transform", `translate(${this.x}, 0)`);
    this.holder.appendChild(this.group);
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

  drawAllNotes(){
    for(let i = 0; i < this.totalNotes; i++){
      const newNote = this.drawNote(i * this.noteWidth);
      this.notes.push(newNote);
    }
  }

  drawNote(x){
    const note = document.createElementNS(this.ns, "rect");
    note.setAttribute("x", 0);
    note.setAttribute("y", 0);
    note.setAttribute("width", this.noteWidth);
    note.setAttribute("height", this.h);
    note.setAttribute("stroke", '#ffffff');
    note.setAttribute("transform", `translate(${x}, 0)`);
    this.group.appendChild(note);
    return note;
  }
}