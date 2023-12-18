const api = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
let database = require("../db/db.json")

//API route is a GET route to retrieve all notes from db.json file
api.get('/', (req, res, err) => {
    fs.readFile('./db/db.json', 'utf8', (error, data) => res.json(JSON.parse(data)))
})

//API route is a POST route to add a note to the db.json file
api.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body && title && text) {

        const newNote = {
            title,
            text,
            id: uuid()
        }

        fs.readFile('./db/db.json', 'utf8', (error, data) => {
            const oldDataArr = JSON.parse(data);
            console.log(oldDataArr);
            oldDataArr.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(oldDataArr, null, '\t'), (err) =>
                err ? res.status(500).json('Error in posting note') : res.end()
            )
        })
    } else {
        console.log("there was an error processing this request")
    }

}
)

//API route is a DELETE route to update the db.json file less the note we deleted
api.delete('/:id', (req, res) => {
    let notesToKeep = [];
    for (let i = 0; i < database.length; i++) {
        if (database[i].id != req.params.id) {
            notesToKeep.push(database[i]);
        }
    }
    database = notesToKeep;
    fs.writeFileSync('./db/db.json', JSON.stringify(database, null, '\t'), (err) => {
        err ? res.status(500).json('Error in deleting note') : res.end()
    })
    res.json(database);
})
module.exports = api;