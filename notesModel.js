class NotesModel {
  constructor() {
    this.list = [];
  }

  getNotes() {
    return this.list;
  }

  addNote(note) {
    this.list.push(note);
  }

  reset() {
    this.list = [];
  }

  setNotes(notes) {
    this.list = notes;
  }
}

module.exports = NotesModel;