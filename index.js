const NotesClient = require("./notesClient");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

const model = new NotesModel();
const client = new NotesClient();
const view = new NotesView(model, client);

// console.log('The notes app is running');

// model.addNote('Hello');
// model.addNote('World!');

// view.displayNotes();

// console.log(model.getNotes());

view.displayNotesFromApi();