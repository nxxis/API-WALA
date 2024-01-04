const notes = require('./notes');
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
  command: 'add',
  describe: 'adds a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// remove note command
yargs.command({
  command: 'remove',
  describe: 'removes a existing note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// list note command
yargs.command({
  command: 'list',
  describe: 'lists all existing notes',
  handler() {
    console.log('listing note');
  },
});

// read note command
yargs.command({
  command: 'read',
  describe: 'reads all existing notes',
  handler() {
    console.log('reading note');
  },
});

yargs.parse();
