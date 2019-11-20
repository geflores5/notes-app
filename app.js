const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Create add comman
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// List notes
yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler() {
        notes.listNotes()
    }
})

// Read notes
yargs.command({
    command: 'read',
    describe: 'Reads all notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()