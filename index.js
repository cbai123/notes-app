const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

console.log('The notes app is running');

const model = new NotesModel();
model.addNote('Hello');
model.addNote('World!');

const view = new NotesView(model);
view.displayNotes();

console.log(model.getNotes());