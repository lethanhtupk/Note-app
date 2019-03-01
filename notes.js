const fs = require('fs');

var fetchNotes = () => {
    try{
        noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }catch(e){
        return [];
    }
};

// function for adding note
var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}
var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    // check for new title already have before??
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    })
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNote(notes);
        return note;
    }
}
// function for get all note
var getAll = () => {
    return allNotes = fetchNotes();
}

// function for reading a note
var readNote = (title) => {
    var notes = fetchNotes();
    notefilter = notes.filter((note) => {
        return note.title === title;
    });
    if(notefilter.length > 0){
        var note = notefilter[0];
        return note;
    }
}

// function for delete a note
var removeNote = (title) => {
    var notes = fetchNotes();
    var len = notes.length;
    notes = notes.filter((note) => {
        return note.title !== title;
    });
    if(notes.length !== len){
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
        return 1;
    }else {
        return 0;
    }

};
function logNote(note){
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};
module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
}
