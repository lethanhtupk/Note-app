console.log("Starting app....")

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')

const titleOption = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const argv = yargs
.command('add', 'Add a new note', {
    title: titleOption,
    body: {
        describe: 'Body of note',
        demand: true,
        alias: 'b'
    }
})
.command('list', "Show all the note", {})
.command('read', "Read one note", {
    title: titleOption
})
.command('remove', "Remove a note", {
    title: titleOption
})
.help()
.argv;
var command = argv._[0];
if(command === "add"){
    var note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log("done!");
        notes.logNote(note);
    }
    else {
        console.log('Your title already in my brain');
    }
}else if(command === "list"){
    var listNotes = notes.getAll();
    listNotes.forEach((note) => {
        notes.logNote(note);
    })
}else if(command === "read"){
    var note = notes.readNote(argv.title);
    if(note){
        console.log("done!");
        notes.logNote(note);
    }
    else {
        console.log("note not found!");
    }

}else if(command === "remove"){
    var result = notes.removeNote(argv.title);
    if(result === 1){
        console.log("done!");
        console.log("--");
        console.log(`You was remove note with title: ${argv.title}`);
    }else {
        console.log("I dont have note with that title");
    }

}
else {
    console.log("Command not recognized");
}
