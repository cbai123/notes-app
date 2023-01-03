
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
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
    const view = new NotesView(model);

    model.addNote('Hello');

    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(1);
  });

  it('displays correctly with multiple notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('Hello');
    model.addNote('World!');

    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(2);
  })
})