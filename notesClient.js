class NotesClient {
  loadNotes(callback, callbackError) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data)
      })
      .catch(callbackError);
  }

  createNote(note, callbackError) {
      fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: note}),
      })
      .catch(callbackError);
    };

    emojify(note, callback) {
      fetch('https://makers-emojify.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: note}),
      })
      .then(response => response.json())
      .then(data => callback(data.emojified_text))
    }

    resetNotes() {
      fetch('http://localhost:3000/notes', {
        method: 'DELETE'
      })
    }
  }
  
module.exports = NotesClient;