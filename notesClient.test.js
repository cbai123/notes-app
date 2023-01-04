const NotesClient = require('./notesClient');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  
  it('calls fetch and loads data', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify({
      notes: ['this is a note']
    }));

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((note) => {
      expect(note.notes).toEqual(['this is a note'])

      // 4. Tell Jest our test can now end.
      done();
    });
  });

  it('posts a new note to the server', (done) => {
    const client = new NotesClient();

    client.createNote('note');

    expect(fetch.mock.calls.length).toEqual(1)

    // client.loadNotes(note => {
    //   expect(note.notes).toEqual(['this is a note', 'note'])
    // })

    done();
  })
});