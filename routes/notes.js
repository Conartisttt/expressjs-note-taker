const api = require('express').Router();
const uuid = require('../');
const fs = require('fs');

api.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, data) => res.json(JSON.parse(data)))
})

api.post('/', (req, res) => {

})

module.exports = api;