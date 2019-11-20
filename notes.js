const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const isDuplicate = notes.find(note => note.title === title)
    debugger
    if (!isDuplicate) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added.'))
    } else {
        console.log(chalk.red.inverse('Duplicate title. Note not added.'))
    }  
}

const removeNote = (title) => {
    const notes = loadNotes()

    const filteredNotes = notes.filter((note) => note.title !== title)

    if (notes.length === filteredNotes.length) {
        console.log(chalk.red.inverse('Note not found!'))
    } else {
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse('Note removed!'))
    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes:'))
    notes.forEach((note) => {
        console.log(`${note.title}: ${note.body}.`)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const validNote = notes.find(note => note.title === title)

    if (validNote) {
        console.log(chalk.blue.inverse(validNote.title))
        console.log(validNote.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}