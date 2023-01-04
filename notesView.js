class NotesView{
  constructor(model){
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    this.input = document.querySelector('#note-input')
    this.button = document.querySelector('#add-note-btn');

    this.button.addEventListener('click', () => {
      this.model.addNote(this.input.value);
      this.displayNotes();
      this.input.value = '';
    });
  }
  displayNotes() {
    document.querySelectorAll('.note').forEach( note => {
      note.remove();
    });

    this.model.getNotes().forEach(note => {
      const newNote = document.createElement('div');
      newNote.className = 'note';
      newNote.textContent = note;
      this.mainContainerEl.append(newNote);
  });
  }
}

module.exports = NotesView;