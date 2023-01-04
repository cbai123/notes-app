class NotesView{
  constructor(model, client){
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector('#main-container');

    this.input = document.querySelector('#note-input')
    this.button = document.querySelector('#add-note-btn');

    this.button.addEventListener('click', () => {
      this.client.createNote(this.input.value);
      this.displayNotesFromApi();
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

  displayNotesFromApi() {
    this.client.loadNotes(data => {
      this.model.setNotes(data);
      console.log(this.model.getNotes())
      this.displayNotes();
    });
  }
}

module.exports = NotesView;