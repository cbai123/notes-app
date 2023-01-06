
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesClient = require('./NotesClient');
const NotesModel = require("./notesModel")
const NotesView = require('./notesView');

describe('NotesView class', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('displays correctly with no notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    view.displayNotes();
    expect(document.querySelectorAll("div.note").length).toBe(0);
  });

  it('displays correctly with one note', () => {
    const model = new NotesModel();
    const client = {
      emojify: (note, callback) => callback(note)
    }
    const view = new NotesView(model, client);

    model.addNote('Hello');

    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(1);
  });

  it('displays correctly with multiple notes', () => {
    const model = new NotesModel();
    const client = {
      emojify: (note, callback) => callback(note)
    }
    const view = new NotesView(model, client);

    model.addNote('Hello');
    model.addNote('World!');

    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(2);
  });

  it('correctly displays an inputted note using a click', () => {
    const model = new NotesModel();
    const client = {
      createNote: (note) => model.addNote(note),
      loadNotes: (callback) => callback(model.getNotes()),
      emojify: (note, callback) => callback(note)
    };
    const view = new NotesView(model, client);

    const input = document.querySelector('#note-input');
    const button = document.querySelector('#add-note-btn');
    
    input.value = 'hello notes';
    button.click();

    expect(document.querySelector('div.note').textContent).toEqual('hello notes');
  });

  it('displays the correct number of notes', () => {
    const model = new NotesModel();
    const client = {
      createNote: (note) => model.addNote(note),
      loadNotes: (callback) => callback(model.getNotes()),
      emojify: (note, callback) => callback(note)
    };
    const view = new NotesView(model, client);

    const input = document.querySelector('#note-input');
    const button = document.querySelector('#add-note-btn');
    
    input.value = 'hello notes';
    button.click();

    input.value = 'hey';
    button.click();

    input.value = 'there';
    button.click();

    expect(document.querySelectorAll('div.note').length).toBe(3);
  })

  it('gets notes from an api', (done) => {
    const model = new NotesModel();
    const client = {
      loadNotes: (callback) => callback(['this is a note']),
      emojify: (note, callback) => callback(note)
    };
    const view = new NotesView(model, client);

    view.displayNotesFromApi();
    expect(document.querySelector('div.note').textContent).toEqual('this is a note');
    done();
  });

  it('gets multiple notes from an api', () => {
    const model = new NotesModel();
    const client = {
      loadNotes: (callback) => callback(['this is a note', 'so is this']),
      emojify: (note, callback) => callback(note)
    };
    const view = new NotesView(model, client);

    view.displayNotesFromApi();

    expect(document.querySelectorAll('div.note').length).toBe(2);
  });

  it('displays an error when something goes wrong', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    view.displayError();

    expect(document.querySelector('div.error').textContent).toEqual('The server might not be running');
  });
})