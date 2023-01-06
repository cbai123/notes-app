class NotesView{
  constructor(model, client){
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector('#main-container');

    this.input = document.querySelector('#note-input')
    this.button = document.querySelector('#add-note-btn');

    this.button.addEventListener('click', () => {
      // console.log(this.input.value)
      this.client.createNote(this.input.value, () => {
        this.displayError()
      });
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
      this.displayNotes();
    }, () => {
      this.displayError();
    });
  }

  displayError() {
    const errorMessageEl = document.createElement('div');
    errorMessageEl.className = 'error';
    errorMessageEl.textContent = 'The server might not be running';
    this.mainContainerEl.append(errorMessageEl);
  }
}

module.exports = NotesView;