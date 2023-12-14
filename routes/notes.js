const api = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');

api.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, data) => res.json(JSON.parse(data)))
})

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
                err ? console.error(err) : res.end() //
            )
        })
    } else {
        console.log("there was an error processing this request")
    }

}
)

module.exports = api;