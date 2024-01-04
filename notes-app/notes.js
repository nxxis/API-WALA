const fs = require('fs');

const getNotes = () => 'your notes...';

const addNote = (title, body) => {
  const notes = loadNote();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes == 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log('new note added');
  } else {
    console.log('title already taken');
  }
};

const removeNote = (title) => {
  const notes = loadNote();
  const noteToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > noteToKeep.length) {
    saveNotes(noteToKeep);
    console.log('note removed');
  } else {
    console.log('no matching note to remove');
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNote = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
};
