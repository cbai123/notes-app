class NotesView{
  constructor(model){
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    this.input = document.querySelector('#note-input')
    this.button = document.querySelector('#add-note-btn');

    this.button.addEventListener('click', () => {
      this.model.addNote(this.input.value);
      this.updateNotes();
    });
  }
  displayNotes() {
    this.mainContainerEl.innerHTML = '';

    this.model.getNotes().forEach(note => {
      const newNote = document.createElement('div');
      newNote.className = 'note';
      newNote.textContent = note;
      this.mainContainerEl.append(newNote);
  });
  }

  updateNotes() {
    const note = this.model.getNotes().at(-1);
    console.log(note)
    const newNote = document.createElement('div');
    newNote.className = 'note';
    newNote.textContent = note;
    this.mainContainerEl.append(newNote);
  }
}

module.exports = NotesView;