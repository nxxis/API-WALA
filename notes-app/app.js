const yourNotes = require('./notes');
const yargs = require('yargs');
// const chalk = require('chalk');

// const command = process.argv[2];

// switch (command) {
//     case "add":
//     console.log("note added");
//     break;

//     case "remove":
//         console.log('note removed');
//         break;

//     default:
//         break
// }

// add note command
yargs.command({
    command : 'add',
    describe : 'adds a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('Title: ' +  argv.title)
    }
});

// remove note command
yargs.command({
    command : 'remove',
    describe : 'removes a existing note',
    handler: function () {
        console.log('removing note')
    }
});

// list note command
yargs.command({
    command : 'list',
    describe : 'lists all existing notes',
    handler: function () {
        console.log('listing note')
    }
});

// read note command
yargs.command({
    command : 'read',
    describe : 'reads all existing notes',
    handler: function () {
        console.log('reading note')
    }
});

yargs.parse();